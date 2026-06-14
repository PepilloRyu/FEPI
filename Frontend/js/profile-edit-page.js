import { app } from './firebaseConfig.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-storage.js";
import { getProfile, updateProfile } from './services/api.js';
import { requireAuth, getInitials, showToast, sendPasswordReset } from './services/auth.js';
import { initSidebar } from './components/sidebar.js';

const storage = getStorage(app);
let currentUser = null;
let currentAvatarUrl = "";

async function load(user) {
  currentUser = user;
  
  // Iniciar sidebar dinámico
  await initSidebar('profile');

  // Obtener datos del perfil actual desde el backend
  const { data: profile, error } = await getProfile();
  if (error) {
    showToast(error, 'error');
    return;
  }

  if (profile) {
    document.getElementById('name').value = profile.name || '';
    document.getElementById('email').value = profile.email || '';
    currentAvatarUrl = profile.avatarUrl || '';

    const initials = getInitials(profile.name || profile.email);
    const avatarPreview = document.getElementById('avatar-preview');
    if (avatarPreview) {
      if (profile.avatarUrl) {
        avatarPreview.innerHTML = `<img src="${profile.avatarUrl}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" />`;
      } else {
        avatarPreview.textContent = initials;
      }
    }
  }
}

// Escuchar cambios en el input de imagen
document.getElementById('choose-file-input').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const fileNameSpan = document.getElementById('selected-file-name');
  const avatarPreview = document.getElementById('avatar-preview');

  if (file) {
    fileNameSpan.textContent = file.name;
    
    // Crear preview local
    const reader = new FileReader();
    reader.onload = (event) => {
      avatarPreview.innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" />`;
    };
    reader.readAsDataURL(file);
  } else {
    fileNameSpan.textContent = 'Ningún archivo seleccionado';
  }
});

// Guardar cambios
document.getElementById('edit-profile-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('choose-file-input');
  const file = fileInput.files[0];
  const nameVal = document.getElementById('name').value.trim();

  if (!nameVal) {
    showToast('El nombre es obligatorio', 'error');
    return;
  }

  // Activar spinner y desactivar botones
  document.getElementById('save-changes-span').style.display = 'none';
  document.getElementById('save-spinner').style.display = 'block';
  document.getElementById('save-changes').disabled = true;
  document.getElementById('go-back').disabled = true;

  try {
    let finalAvatarUrl = currentAvatarUrl;

    if (file) {
      // Subir archivo a Firebase Storage
      const storageRef = ref(storage, `profile_images/${currentUser.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      finalAvatarUrl = await getDownloadURL(storageRef);
    }

    // Actualizar perfil a través del backend C#
    const { data: updated, error } = await updateProfile({
      name: nameVal,
      avatarUrl: finalAvatarUrl
    });

    if (error) {
      showToast(error, 'error');
    } else {
      showToast('Perfil actualizado correctamente', 'success');
      setTimeout(() => {
        window.location.href = './profile-page.html';
      }, 1000);
      return;
    }
  } catch (err) {
    console.error(err);
    showToast('Error al actualizar el perfil.', 'error');
  }

  // Restaurar estado de los botones si falló
  document.getElementById('save-changes-span').style.display = 'inline';
  document.getElementById('save-spinner').style.display = 'none';
  document.getElementById('save-changes').disabled = false;
  document.getElementById('go-back').disabled = false;
});

// Botón Volver
document.getElementById('go-back').addEventListener('click', () => {
  window.location.href = './profile-page.html';
});

// Enviar correo de restablecimiento de contraseña
document.getElementById('send-reset-btn').addEventListener('click', async () => {
  if (!currentUser?.email) return;

  document.getElementById('reset-btn-label').style.display = 'none';
  document.getElementById('reset-spinner').style.display = 'block';
  document.getElementById('send-reset-btn').disabled = true;

  const { error } = await sendPasswordReset(currentUser.email);

  document.getElementById('reset-btn-label').style.display = 'inline';
  document.getElementById('reset-spinner').style.display = 'none';
  document.getElementById('send-reset-btn').disabled = false;

  if (error) {
    showToast('No se pudo enviar el correo. Inténtalo más tarde.', 'error');
  } else {
    showToast('Correo enviado. Revisa tu bandeja de entrada.', 'success');
  }
});

// Arrancar validando sesión
requireAuth(false).then(user => load(user));