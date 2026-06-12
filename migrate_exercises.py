#!/usr/bin/env python3
"""
migrate_exercises.py — Migra ejercicios de world-N-data.js a Firestore
y guarda las respuestas correctas en answers.json (nunca sube a Firestore).

Uso:
    python migrate_exercises.py

Requisitos:
    pip install firebase-admin
    node >= 14 disponible en PATH (se usa para parsear los archivos .js ES-module)

Coloca serviceAccountKey.json en el directorio raíz del proyecto antes de ejecutar.
"""

import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

import firebase_admin
from firebase_admin import credentials, firestore

# ─── Configuración ────────────────────────────────────────────────────────────
SERVICE_ACCOUNT_PATH = "./serviceAccountKey.json"   # ajusta si está en otro lugar
WORLDS_DIR  = Path(__file__).parent / "Frontend/js/worlds"
ANSWERS_OUT = Path(__file__).parent / "answers.json"
NUM_WORLDS  = 6


# ─── Parser JS → dict ─────────────────────────────────────────────────────────

def _path_to_file_url(p: Path) -> str:
    """Convierte un Path absoluto a file:// URL que Node.js entiende (Windows/Unix)."""
    s = str(p.resolve()).replace("\\", "/")
    return f"file:///{s}" if s[1:2] == ":" else f"file://{s}"


def extract_world_data(js_path: Path) -> dict:
    """
    Lanza un proceso Node.js temporal que importa el archivo como ES-module
    y serializa el objeto WORLD a stdout como JSON.
    """
    content = js_path.read_text(encoding="utf-8")
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".mjs", delete=False, encoding="utf-8"
    ) as tmp_data:
        tmp_data.write(content)
        tmp_data_path = tmp_data.name

    node_src = (
        f"import {{ WORLD }} from '{_path_to_file_url(Path(tmp_data_path))}';\n"
        "process.stdout.write(JSON.stringify(WORLD));\n"
    )
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".mjs", delete=False, encoding="utf-8"
    ) as tmp:
        tmp.write(node_src)
        tmp_path = tmp.name

    try:
        result = subprocess.run(
            [r"C:\Program Files\dotnet\packs\Microsoft.NET.Runtime.Emscripten.3.1.56.Node.win-x64\10.0.3\tools\bin\node.exe", tmp_path],
            capture_output=True,
            text=True,
            check=True,
            encoding="utf-8",
        )
        return json.loads(result.stdout)
    except subprocess.CalledProcessError as exc:
        raise RuntimeError(exc.stderr.strip()) from exc
    finally:
        os.unlink(tmp_path)
        os.unlink(tmp_data_path)


# ─── Construcción del documento Firestore (sin respuestas) ────────────────────

def build_firestore_doc(ex: dict) -> dict:
    """
    Devuelve el documento que se sube a Firestore.
    Campos de respuesta correcta se omiten según el tipo:
      mc / vf   → options[] solo con { label }
      build     → bank[], sin operands[]
      slots     → bank[] + slots count (+ prefix si existe), sin answer[]
      buildSeq  → bank[], sin answers[][]
      match     → pairs[] completo + symOrder[] (la respuesta es implícita en el emparejamiento)
    """
    doc: dict = {
        "type":   ex["type"],
        "tag":    ex.get("tag", ""),
        "prompt": ex.get("prompt", ""),
    }
    if "hint" in ex:
        doc["hint"] = ex["hint"]

    t = ex["type"]

    if t in ("mc", "vf"):
        doc["options"] = [{"label": o["label"]} for o in ex["options"]]

    elif t == "build":
        doc["bank"] = ex["bank"]

    elif t == "slots":
        doc["bank"]  = ex["bank"]
        doc["slots"] = ex["slots"]
        if "prefix" in ex:           # ej: "Grado ="
            doc["prefix"] = ex["prefix"]

    elif t == "buildSeq":
        doc["bank"] = ex["bank"]

    elif t == "match":
        doc["pairs"]    = ex["pairs"]     # [{desc, sym}, ...] — completo
        doc["symOrder"] = ex["symOrder"]  # orden visual de los símbolos

    return doc


# ─── Extracción de respuestas correctas para answers.json ─────────────────────

def extract_answer(ex: dict):
    """
    Devuelve la respuesta correcta en el formato apropiado para cada tipo:
      mc / vf   → string con el label correcto
      build     → list[str]  (operands)
      slots     → list[str]  (answer)
      buildSeq  → list[list[str]]  (answers — todas las variantes aceptadas)
      match     → dict {sym: desc}  (mapa símbolo → descripción)
    """
    t = ex["type"]

    if t in ("mc", "vf"):
        for opt in ex["options"]:
            if opt.get("correct"):
                return opt["label"]
        return None

    if t == "build":
        return ex.get("operands", [])

    if t == "slots":
        return ex.get("answer", [])

    if t == "buildSeq":
        return ex.get("answers", [])

    if t == "match":
        return {p["sym"]: p["desc"] for p in ex["pairs"]}

    return None


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    # Verificar archivo de credenciales
    sa_path = Path(SERVICE_ACCOUNT_PATH)
    if not sa_path.exists():
        print(
            f"ERROR: credenciales no encontradas en {sa_path.resolve()}\n"
            "       Descarga serviceAccountKey.json desde Firebase Console "
            "→ Configuración del proyecto → Cuentas de servicio.",
            file=sys.stderr,
        )
        sys.exit(1)

    # Inicializar Firebase Admin
    cred = credentials.Certificate(str(sa_path))
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    answers: dict = {}
    total   = 0
    errors  = 0

    for world_num in range(1, NUM_WORLDS + 1):
        js_file = WORLDS_DIR / f"world-{world_num}-data.js"

        if not js_file.exists():
            print(f"[SKIP] {js_file.name} no encontrado")
            continue

        print(f"\n── Mundo {world_num} ──────────────────────────────────────")

        try:
            world = extract_world_data(js_file)
        except RuntimeError as exc:
            print(f"  [ERROR] no se pudo parsear {js_file.name}:\n  {exc}")
            errors += 1
            continue

        # Asegurar que el documento de la unidad (world) existe
        unit_ref = db.collection("subjects").document("algebra").collection("units").document(str(world_num))
        unit_ref.set({"title": world.get("title", f"Mundo {world_num}")}, merge=True)

        for level_idx, level in enumerate(world.get("levels", [])):
            level_title = level.get("title", f"nivel-{level_idx}")
            
            # Asegurar que el documento del nivel existe
            level_ref = unit_ref.collection("levels").document(str(level_idx))
            level_ref.set({"title": level_title, "id": level.get("id", level_idx + 1)}, merge=True)

            for ex_idx, ex in enumerate(level.get("challenges", [])):
                key = f"{world_num}_{level_idx}_{ex_idx}"

                # ── Subir documento a Firestore (idempotente: set sin merge) ──
                doc = build_firestore_doc(ex)
                ref = level_ref.collection("exercises").document(str(ex_idx))
                try:
                    ref.set(doc)
                    tag_str = ex.get("tag", "sin tag")
                    print(f"  ✔ {key}  [{ex['type']:8s}]  {tag_str}")
                    total += 1
                except Exception as exc:
                    print(f"  ✘ {key}: {exc}")
                    errors += 1
                    continue

                # ── Guardar respuesta localmente (NO a Firestore) ──────────
                answers[key] = {
                    "type":   ex["type"],
                    "answer": extract_answer(ex),
                }

    # ── Escribir answers.json ──────────────────────────────────────────────
    with open(ANSWERS_OUT, "w", encoding="utf-8") as f:
        json.dump(answers, f, ensure_ascii=False, indent=2)

    print(f"\n{'═' * 54}")
    print(f"  Ejercicios migrados : {total}")
    print(f"  Errores             : {errors}")
    print(f"  answers.json        → {ANSWERS_OUT.resolve()}")
    print(f"{'═' * 54}")

    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
