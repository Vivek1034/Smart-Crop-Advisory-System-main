// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzgNpV6aFyjtDX6Ig9rgP8x2w647jWN5M",
    authDomain: "smart-crop-advisory-f3913.firebaseapp.com",
    projectId: "smart-crop-advisory-f3913",
    storageBucket: "smart-crop-advisory-f3913.firebasestorage.app",
    messagingSenderId: "231721730375",
    appId: "1:231721730375:web:a07c0b372e8b99ed27cc62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// inputs


// button
const register = document.getElementById('registerButton');
register.addEventListener("click", function (event) {
    event.preventDefault();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    
    // Show loading animation
    Swal.fire({
        title: '🌱 Creating Your Account...',
        html: '<p style="font-size: 16px; color: #6b7280;">Setting up your KrishiVaani profile</p>',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        customClass: 'enhanced-pulse',
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            
            // Enhanced success alert
            Swal.fire({
                title: '🎊 Account Created Successfully!',
                html: '<p style="font-size: 16px; color: #6b7280; margin: 15px 0;">Welcome to KrishiVaani family! 🌾<br>Your account is ready. Let\'s get you logged in!</p>',
                icon: 'success',
                confirmButtonText: '🚀 Login Now',
                confirmButtonColor: '#22c55e',
                allowOutsideClick: false,
                customClass: 'enhanced-bounce',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                color: '#166534',
                iconColor: '#22c55e',
                focusConfirm: true
            }).then(() => {
                window.location.href = "login.html";
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            // Modern error alert with friendly messages
            let friendlyMessage = "Registration failed. Please try again.";
            
            if (errorCode === 'auth/email-already-in-use') {
                friendlyMessage = "An account with this email already exists. Please try logging in instead.";
            } else if (errorCode === 'auth/weak-password') {
                friendlyMessage = "Password is too weak. Please use at least 6 characters.";
            } else if (errorCode === 'auth/invalid-email') {
                friendlyMessage = "Please enter a valid email address.";
            }
            
            Swal.fire({
                title: '⚠️ Registration Failed',
                html: `<p style="font-size: 16px; color: #6b7280; margin: 15px 0;">${friendlyMessage}</p>`,
                icon: 'error',
                confirmButtonText: '🔄 Try Again',
                confirmButtonColor: '#ef4444',
                customClass: 'enhanced-shake',
                background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                color: '#991b1b',
                iconColor: '#ef4444',
                focusConfirm: true
            });
        });
})