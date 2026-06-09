using Google.Cloud.Firestore;

namespace MathGo.Domain.Entities;

[FirestoreData]
public class World
{
    [FirestoreDocumentId]
    public string Id { get; set; } = string.Empty; // Firebase ID

    [FirestoreProperty("worldId")]
    public int WorldId { get; set; } // Numerical ID from frontend (1, 2, 3...)

    [FirestoreProperty("title")]
    public string Title { get; set; } = string.Empty;

    [FirestoreProperty("subtitle")]
    public string Subtitle { get; set; } = string.Empty;

    [FirestoreProperty("levels")]
    public List<Level> Levels { get; set; } = new();
}

[FirestoreData]
public class Level
{
    [FirestoreProperty("id")]
    public int Id { get; set; }

    [FirestoreProperty("icon")]
    public string Icon { get; set; } = string.Empty;

    [FirestoreProperty("node")]
    public string Node { get; set; } = string.Empty;

    [FirestoreProperty("title")]
    public string Title { get; set; } = string.Empty;

    [FirestoreProperty("subtitle")]
    public string Subtitle { get; set; } = string.Empty;

    [FirestoreProperty("theory")]
    public List<Theory> Theory { get; set; } = new();

    [FirestoreProperty("challenges")]
    public List<Challenge> Challenges { get; set; } = new();
}

[FirestoreData]
public class Theory
{
    [FirestoreProperty("icon")]
    public string Icon { get; set; } = string.Empty;

    [FirestoreProperty("tag")]
    public string Tag { get; set; } = string.Empty;

    [FirestoreProperty("title")]
    public string Title { get; set; } = string.Empty;

    [FirestoreProperty("body")]
    public string Body { get; set; } = string.Empty;

    [FirestoreProperty("visual")]
    public string Visual { get; set; } = string.Empty;

    [FirestoreProperty("key")]
    public string Key { get; set; } = string.Empty;
}

[FirestoreData]
public class Challenge
{
    [FirestoreProperty("id")]
    public string Id { get; set; } = string.Empty; // Guid generated

    [FirestoreProperty("type")]
    public string Type { get; set; } = string.Empty; // "mc", "build", "match", "slots", "vf", "buildSeq"

    [FirestoreProperty("tag")]
    public string Tag { get; set; } = string.Empty;

    [FirestoreProperty("prompt")]
    public string Prompt { get; set; } = string.Empty;

    [FirestoreProperty("hint")]
    public string Hint { get; set; } = string.Empty;

    // Challenge Specific Properties
    [FirestoreProperty("options")]
    public List<ChallengeOption>? Options { get; set; } // For "mc", "vf"

    [FirestoreProperty("bank")]
    public List<string>? Bank { get; set; } // For "build", "slots", "buildSeq"

    [FirestoreProperty("operands")]
    public List<string>? Operands { get; set; } // For "build"

    [FirestoreProperty("pairs")]
    public List<ChallengePair>? Pairs { get; set; } // For "match"

    [FirestoreProperty("symOrder")]
    public List<string>? SymOrder { get; set; } // For "match"

    [FirestoreProperty("slots")]
    public int? Slots { get; set; } // For "slots"

    [FirestoreProperty("answer")]
    public List<string>? Answer { get; set; } // For "slots" Correct Answer

    [FirestoreProperty("answers")]
    public List<List<string>>? Answers { get; set; } // For "buildSeq" multiple correct answers

    [FirestoreProperty("prefix")]
    public string? Prefix { get; set; } // For "slots"
}

[FirestoreData]
public class ChallengeOption
{
    [FirestoreProperty("label")]
    public string Label { get; set; } = string.Empty;

    [FirestoreProperty("correct")]
    public bool Correct { get; set; }
}

[FirestoreData]
public class ChallengePair
{
    [FirestoreProperty("desc")]
    public string Desc { get; set; } = string.Empty;

    [FirestoreProperty("sym")]
    public string Sym { get; set; } = string.Empty;
}
