import { db } from './firebaseConfig.js';
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

let userInfo = JSON.parse(localStorage.getItem('mathgo_user')) || JSON.parse(sessionStorage.getItem('user-info')) || { uid: "temp" };
const userId = userInfo.uid || userInfo.userId;

const userDocRef = doc(db, 'users', userId);

const profileImage = document.getElementById('profile-image');
const profileImageBottom = document.getElementById('profile-bottom');
const leftProfileImage = document.getElementById('left-profile-image');

document.addEventListener('DOMContentLoaded', function() {

    if (userInfo) {

        document.getElementById('first-and-last-name').innerHTML = userInfo.name;
        document.getElementById('email').innerHTML = userInfo.email;

        document.getElementById('xp-value').innerHTML = userInfo.xp;
        
        // Check if creationDate is available and is a valid timestamp object
        if (userInfo.creationDate && typeof userInfo.creationDate === 'object') {
            const milliseconds = userInfo.creationDate.seconds * 1000 + userInfo.creationDate.nanoseconds / 1000000;
            const formattedCreationDate = new Date(milliseconds).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        
            document.getElementById('join-date').innerHTML = formattedCreationDate;

        } else {
            document.getElementById('join-date').innerHTML = "Unknown Date";
        }

        profileImage.src = userInfo.profileImage;
        profileImageBottom.src = userInfo.profileImage;
        leftProfileImage.src = userInfo.profileImage;
    }
});
