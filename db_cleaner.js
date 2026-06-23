const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const fs = require("fs");
const path = require("path");

const CREDENTIALS_PATH = path.join(__dirname, "Backend/MathGo.Api/firebase-credentials.json");

if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(`Error: Credentials file not found at ${CREDENTIALS_PATH}`);
    process.exit(1);
}

const serviceAccount = require(CREDENTIALS_PATH);

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const cleanMode = process.argv.includes("--clean");
console.log(`Mode: ${cleanMode ? 'CLEANUP & RESTRUCTURING (Write)' : 'ANALYSIS (Read-Only)'}`);
console.log("-".repeat(50));

async function run() {
    try {
        // 1. users collection
        console.log("\n--- Collection: users ---");
        const usersSnapshot = await db.collection("users").get();
        const obsoleteFields = ["totalXp", "totalXP", "gems", "streak", "gamification", "level", "updatedAt"];
        
        let totalUsers = 0;
        let usersWithObsolete = 0;
        let cleanUsers = 0;
        
        const usersReport = [];
        
        for (const doc of usersSnapshot.docs) {
            totalUsers++;
            const data = doc.data();
            const uid = doc.id;
            const email = data.email || "No Email";
            const name = data.name || "No Name";
            
            const foundObsolete = obsoleteFields.filter(f => f in data);
            
            if (foundObsolete.length > 0) {
                usersWithObsolete++;
                usersReport.push({
                    uid,
                    email,
                    name,
                    fields: Object.keys(data),
                    obsolete: foundObsolete
                });
                
                if (cleanMode) {
                    const updateDict = {};
                    foundObsolete.forEach(f => {
                        updateDict[f] = FieldValue.delete();
                    });
                    await db.collection("users").doc(uid).update(updateDict);
                    console.log(`🧹 Cleaned user ${uid} (${email}): Removed [${foundObsolete.join(", ")}]`);
                }
            } else {
                cleanUsers++;
                usersReport.push({
                    uid,
                    email,
                    name,
                    fields: Object.keys(data),
                    obsolete: []
                });
            }
        }
        
        // 2. mathgo_progress collection
        console.log("\n--- Collection: mathgo_progress ---");
        const progressSnapshot = await db.collection("mathgo_progress").get();
        
        let totalProgress = 0;
        let progressMissingWeekly = 0;
        const progressReport = [];
        
        for (const doc of progressSnapshot.docs) {
            totalProgress++;
            const data = doc.data();
            const uid = doc.id;
            
            const hasWeekly = "weeklyActivity" in data;
            const hasWeeklyXp = "weeklyXp" in data;
            
            let weeklyActivity = data.weeklyActivity;
            let currentHasWeekly = hasWeekly;
            if (!weeklyActivity || !Array.isArray(weeklyActivity) || weeklyActivity.length !== 7) {
                weeklyActivity = [0, 0, 0, 0, 0, 0, 0];
                currentHasWeekly = false;
            }
            
            const calculatedWeeklyXp = weeklyActivity.reduce((a, b) => a + b, 0);
            const currentWeeklyXp = data.weeklyXp;
            
            const needsUpdate = !currentHasWeekly || !hasWeeklyXp || currentWeeklyXp !== calculatedWeeklyXp;
            
            if (needsUpdate) {
                progressMissingWeekly++;
                progressReport.push({
                    uid,
                    hasWeekly: currentHasWeekly,
                    hasWeeklyXp,
                    calculatedWeeklyXp
                });
                
                if (cleanMode) {
                    await db.collection("mathgo_progress").doc(uid).update({
                        weeklyActivity,
                        weeklyXp: calculatedWeeklyXp
                    });
                    console.log(`📈 Restructured progress ${uid}: Set weeklyActivity and weeklyXp=${calculatedWeeklyXp}`);
                }
            } else {
                progressReport.push({
                    uid,
                    hasWeekly: true,
                    hasWeeklyXp: true,
                    calculatedWeeklyXp
                });
            }
        }
        
        console.log("\n" + "=".repeat(50));
        console.log("RESTRUCTURING SUMMARY REPORT");
        console.log("=".repeat(50));
        console.log("Collection 'users':");
        console.log(`  Total user documents: ${totalUsers}`);
        console.log(`  Documents with obsolete fields: ${usersWithObsolete}`);
        console.log(`  Clean documents: ${cleanUsers}`);
        console.log("\nCollection 'mathgo_progress':");
        console.log(`  Total progress documents: ${totalProgress}`);
        console.log(`  Documents missing/outdated 'weeklyActivity' or 'weeklyXp': ${progressMissingWeekly}`);
        console.log("=".repeat(50));
        
        console.log("\nDetailed Users Report:");
        for (const item of usersReport) {
            const statusIcon = item.obsolete.length === 0 ? "✅" : "❌";
            console.log(`${statusIcon} User ${item.uid} (${item.name} - ${item.email})`);
            console.log(`   All Fields: ${item.fields.join(", ")}`);
            if (item.obsolete.length > 0) {
                console.log(`   Obsolete fields detected: ${item.obsolete.join(", ")}`);
            }
        }
        
        console.log("\nDetailed Progress Report:");
        for (const item of progressReport) {
            const statusIcon = (item.hasWeekly && item.hasWeeklyXp) ? "✅" : "⚠️ (Needs update)";
            console.log(`${statusIcon} Progress for UID: ${item.uid} (Calculated weeklyXp=${item.calculatedWeeklyXp})`);
        }
        
        if (!cleanMode) {
            if (usersWithObsolete > 0 || progressMissingWeekly > 0) {
                console.log("\n👉 To run the database restructuring and clean obsolete fields, run:");
                console.log("   node db_cleaner.js --clean");
            } else {
                console.log("\n🎉 Database is fully clean and restructured!");
            }
        }
        
    } catch (err) {
        console.error("Error during run:", err);
    }
}

run();
