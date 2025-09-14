// Voice Assistance for KrishiVaani App
// Uses Web Speech API for speech recognition and synthesis

function speak(text) {
    if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'en-IN';
        utter.rate = 0.9;
        utter.pitch = 1.0;
        window.speechSynthesis.speak(utter);
    }
}

function startRecognition(targetInput, promptText) {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        speak('Sorry, your browser does not support voice input.');
        return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    speak(promptText);
    recognition.start();
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript.trim();
        targetInput.value = transcript;
        speak('You said: ' + transcript);
    };
    recognition.onerror = function(event) {
        speak('Voice input error: ' + event.error);
    };
}

// Voice Navigation for Main App
function handleVoiceCommand(command) {
    const cmd = command.toLowerCase().trim();
    const currentPage = window.location.pathname.split('/').pop();
    
    // Dashboard-specific commands
    if (currentPage === 'dashboard.html') {
        if (cmd.includes('crop recommendation') || cmd.includes('recommend crop')) {
            speak('Opening crop recommendation system');
            window.location.href = 'Crop Recommendation/templates/index.html';
        } else if (cmd.includes('yield prediction') || cmd.includes('predict yield')) {
            speak('Opening crop yield prediction');
            window.location.href = 'Crop Yield Prediction/templates/index.html';
        } else if (cmd.includes('crop planning') || cmd.includes('plan crop')) {
            speak('Opening crop planning tool');
            window.location.href = 'Crop_Planning/templates/cropplan.html';
        } else if (cmd.includes('price tracker') || cmd.includes('crop price')) {
            speak('Opening crop price tracker');
            window.location.href = 'Crop_Prices_Tracker/templates/crop_price_tracker.html';
        } else if (cmd.includes('disease prediction') || cmd.includes('detect disease')) {
            speak('Opening disease prediction system');
            window.location.href = 'Decises_Prediction/template/index.html';
        } else if (cmd.includes('forum') || cmd.includes('community')) {
            speak('Opening community forum');
            window.location.href = 'Forum/forum.html';
        } else if (cmd.includes('labour alerts') || cmd.includes('labor alert')) {
            speak('Opening labour alerts');
            window.location.href = 'Labour_Alerts/tamplates/labour-alerts.html';
        } else if (cmd.includes('calendar') || cmd.includes('crop calendar')) {
            speak('Opening crop calendar');
            window.location.href = 'cropCalendar.html';
        } else if (cmd.includes('chat') || cmd.includes('ai chat')) {
            speak('Opening AI chat assistant');
            window.location.href = 'chat.html';
        }
        // Continue with general navigation commands
        else if (cmd.includes('weather')) {
            speak('Navigating to weather information');
            window.location.href = 'weather.html';
        } else if (cmd.includes('disease guide') || cmd.includes('plant disease guide')) {
            speak('Navigating to disease guide');
            window.location.href = 'disease.html';
        } else if (cmd.includes('organic') || cmd.includes('organic farming')) {
            speak('Navigating to organic farming guide');
            window.location.href = 'organic.html';
        } else if (cmd.includes('plantation') || cmd.includes('plant guide')) {
            speak('Navigating to plantation guide');
            window.location.href = 'plantation.html';
        } else if (cmd.includes('farmer portal') || cmd.includes('farmers')) {
            speak('Navigating to farmer portal');
            window.location.href = 'farmer.html';
        } else if (cmd.includes('shopkeeper') || cmd.includes('shop keeper')) {
            speak('Navigating to shopkeeper portal');
            window.location.href = 'shopkeeper.html';
        } else if (cmd.includes('help') || cmd.includes('what can you do')) {
            speak('I can help you with dashboard features like crop recommendation, yield prediction, crop planning, price tracker, disease prediction, forum, labour alerts, crop calendar, AI chat, weather, disease guide, organic farming, plantation guide, farmer portal, or shopkeeper portal.');
        } else {
            speak('I did not understand that command. Try saying crop recommendation, yield prediction, crop planning, price tracker, disease prediction, forum, weather, or help for available options.');
        }
    }
    // General navigation commands for all pages
    else {
        if (cmd.includes('dashboard') || cmd.includes('dash board')) {
            speak('Navigating to dashboard');
            window.location.href = 'dashboard.html';
        } else if (cmd.includes('login') || cmd.includes('log in')) {
            speak('Navigating to login page');
            window.location.href = 'login.html';
        } else if (cmd.includes('about') || cmd.includes('about us')) {
            speak('Navigating to about page');
            window.location.href = 'about.html';
        } else if (cmd.includes('contact') || cmd.includes('feedback')) {
            speak('Navigating to contact page');
            window.location.href = 'feed-back.html';
        } else if (cmd.includes('weather')) {
            speak('Navigating to weather information');
            window.location.href = 'weather.html';
        } else if (cmd.includes('disease') || cmd.includes('plant disease')) {
            speak('Navigating to disease detection');
            window.location.href = 'disease.html';
        } else if (cmd.includes('organic') || cmd.includes('organic farming')) {
            speak('Navigating to organic farming guide');
            window.location.href = 'organic.html';
        } else if (cmd.includes('plantation') || cmd.includes('plant')) {
            speak('Navigating to plantation guide');
            window.location.href = 'plantation.html';
        } else if (cmd.includes('farmer') || cmd.includes('farmers')) {
            speak('Navigating to farmer portal');
            window.location.href = 'farmer.html';
        } else if (cmd.includes('shopkeeper') || cmd.includes('shop keeper')) {
            speak('Navigating to shopkeeper portal');
            window.location.href = 'shopkeeper.html';
        } else if (cmd.includes('home') || cmd.includes('homepage')) {
            speak('Navigating to homepage');
            window.location.href = 'index.html';
        } else if (cmd.includes('help') || cmd.includes('what can you do')) {
            speak('I can help you navigate to different pages. Try saying: dashboard, login, about, contact, weather, disease detection, organic farming, plantation guide, farmer portal, or shopkeeper portal.');
        } else {
            speak('I did not understand that command. Try saying dashboard, login, about, contact, or help for available options.');
        }
    }
}

function updateVoiceStatus(status, text) {
    const voiceStatus = document.getElementById('voiceStatus');
    const statusText = voiceStatus?.querySelector('.status-text');
    
    if (voiceStatus && statusText) {
        voiceStatus.className = `voice-status ${status} show`;
        statusText.textContent = text;
        
        if (status === 'listening' || status === 'processing') {
            setTimeout(() => {
                voiceStatus.classList.remove('show');
            }, status === 'listening' ? 5000 : 3000);
        } else {
            setTimeout(() => {
                voiceStatus.classList.remove('show');
            }, 2000);
        }
    }
}

function startVoiceAssistant() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        speak('Sorry, your browser does not support voice recognition.');
        updateVoiceStatus('error', 'Browser not supported');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    const voiceIcon = document.getElementById('voiceIcon');
    const voiceBtn = document.getElementById('voiceAssistant');
    
    // Update button state to listening
    if (voiceIcon && voiceBtn) {
        voiceIcon.className = 'fas fa-microphone-slash';
        voiceBtn.classList.remove('processing');
        voiceBtn.classList.add('listening');
    }
    
    updateVoiceStatus('listening', '🎤 Listening...');
    speak('Hello! I am your KrishiVaani voice assistant. Where would you like to go?');
    
    recognition.start();
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript.trim();
        console.log('Voice command:', transcript);
        
        // Update to processing state
        if (voiceBtn) {
            voiceBtn.classList.remove('listening');
            voiceBtn.classList.add('processing');
        }
        
        updateVoiceStatus('processing', '⚡ Processing...');
        
        setTimeout(() => {
            handleVoiceCommand(transcript);
            resetVoiceButton();
        }, 1000);
    };
    
    recognition.onerror = function(event) {
        speak('Voice recognition error: ' + event.error);
        updateVoiceStatus('error', '❌ Error occurred');
        resetVoiceButton();
    };
    
    recognition.onend = function() {
        if (voiceBtn && voiceBtn.classList.contains('listening')) {
            resetVoiceButton();
            updateVoiceStatus('', '👂 Click to speak');
        }
    };
}

function resetVoiceButton() {
    const voiceIcon = document.getElementById('voiceIcon');
    const voiceBtn = document.getElementById('voiceAssistant');
    
    if (voiceIcon && voiceBtn) {
        voiceIcon.className = 'fas fa-microphone';
        voiceBtn.classList.remove('listening', 'processing');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Login page functionality
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const voiceEmailBtn = document.getElementById('voiceEmailBtn');
    const voicePasswordBtn = document.getElementById('voicePasswordBtn');

    if (voiceEmailBtn) {
        voiceEmailBtn.addEventListener('click', function() {
            startRecognition(emailInput, 'Please say your email address.');
        });
    }
    if (voicePasswordBtn) {
        voicePasswordBtn.addEventListener('click', function() {
            startRecognition(passwordInput, 'Please say your password.');
        });
    }
    
    // Main app voice assistant
    const voiceAssistant = document.getElementById('voiceAssistant');
    if (voiceAssistant) {
        voiceAssistant.addEventListener('click', startVoiceAssistant);
    }
});