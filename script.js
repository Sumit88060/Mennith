// Initialize configuration
const config = window.VALENTINE_CONFIG;

let noClickCount = 0;
let voiceAudio;

// ===== Validate Config =====
function validateConfig() {
    const warnings = [];

    if (!config.valentineName) {
        warnings.push("Valentine's name not set.");
        config.valentineName = "My Love";
    }

    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            config.colors[key] = getDefaultColor(key);
        }
    });

    if (warnings.length > 0) {
        console.warn("Config Warnings:", warnings);
    }
}

function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    };
    return defaults[key];
}

document.title = config.pageTitle;

// ===== DOM INIT =====
window.addEventListener('DOMContentLoaded', () => {
    validateConfig();

    document.getElementById('valentineTitle').textContent = `${config.valentineName}, my love...`;

    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;

    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;

    document.getElementById('question3Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent = config.questions.third.noBtn;

    createFloatingElements();
    setupMusicPlayer();
    createNoModal();

    voiceAudio = new Audio("assets/voice.mp3"); // put your voice file here
    voiceAudio.volume = 0.7;
});

// ===== Floating Elements =====
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');

    config.floatingEmojis.hearts.forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });

    config.floatingEmojis.bears.forEach(bear => {
        const div = document.createElement('div');
        div.className = 'bear';
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

// ===== Question Navigation =====
function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${questionNumber}`).classList.remove('hidden');
}

// ===== Emotional Manipulation Mode =====
const noMessages = [
    "Are you sure? You smiled yesterday.",
    "System thinks you're lying.",
    "Okay wow, red flag 🚩"
];

const bgTexts = [
    "He made this at 2AM 🥺",
    "He skipped sleep for this 😴",
    "He could’ve been gaming 🎮",
    "He chose YOU over bugs 🐞❤️"
];

function createNoModal() {
    const modal = document.createElement("div");
    modal.id = "noModal";
    modal.className = "hidden modal";
    modal.innerHTML = `
        <div class="modal-content">
            <p id="noModalText"></p>
            <button class="cute-btn" onclick="closeNoModal()">Okay...</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeNoModal() {
    document.getElementById("noModal").classList.add("hidden");
}

function updateEmotionalUI() {
    let container = document.getElementById("emotionalText");

    if (!container) {
        container = document.createElement("div");
        container.id = "emotionalText";
        container.style.marginTop = "20px";
        container.style.fontWeight = "bold";
        container.style.color = "#ff4757";
        document.querySelector(".container").appendChild(container);
    }

    container.textContent = bgTexts[Math.min(noClickCount - 1, bgTexts.length - 1)];
    updateFakeProgress();
}

function updateFakeProgress() {
    let bar = document.getElementById("fakeProgress");

    if (!bar) {
        bar = document.createElement("div");
        bar.id = "fakeProgress";
        bar.style.height = "10px";
        bar.style.background = "#ffdede";
        bar.style.borderRadius = "10px";
        bar.style.marginTop = "10px";
        bar.innerHTML = `<div id="progressFill" style="height:100%; width:0%; background:#ff6b6b; border-radius:10px; transition: width 0.4s;"></div>`;
        document.querySelector(".container").appendChild(bar);
    }

    const fill = document.getElementById("progressFill");
    fill.style.width = Math.min(noClickCount * 25, 100) + "%";
}

// ===== Modified Move Button =====
function moveButton(button) {
    if (!button.id.includes("no")) return;

    noClickCount++;
    playVoiceNote();

    if (noClickCount <= 3) {
        document.getElementById("noModalText").textContent = noMessages[noClickCount - 1];
        document.getElementById("noModal").classList.remove("hidden");
        updateEmotionalUI();
        return;
    }

    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = "fixed";
    button.style.left = x + "px";
    button.style.top = y + "px";
}

// ===== Voice Note =====
function playVoiceNote() {
    if (!voiceAudio) return;
    voiceAudio.currentTime = 0;
    voiceAudio.play().catch(() => {});
}

// ===== Love Meter =====
const loveMeter = document.getElementById('loveMeter');
const loveValue = document.getElementById('loveValue');
const extraLove = document.getElementById('extraLove');

function setInitialPosition() {
    if (!loveMeter) return;
    loveMeter.value = 100;
    loveValue.textContent = 100;
}

if (loveMeter) {
    loveMeter.addEventListener('input', () => {
        const value = parseInt(loveMeter.value);
        loveValue.textContent = value;

        if (value > 100) {
            extraLove.classList.remove('hidden');

            if (value >= 5000) {
                extraLove.textContent = config.loveMessages.extreme;
            } else if (value > 1000) {
                extraLove.textContent = config.loveMessages.high;
            } else {
                extraLove.textContent = config.loveMessages.normal;
            }
        } else {
            extraLove.classList.add('hidden');
        }
    });
}

window.addEventListener('load', setInitialPosition);

// ===== Celebration =====
function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');

    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;

    createHeartExplosion();
}

function createHeartExplosion() {
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        const randomHeart = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        heart.innerHTML = randomHeart;
        heart.className = 'heart';
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);
    }
}

// ===== Music =====
function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    if (!config.music.enabled) {
        musicControls.style.display = 'none';
        return;
    }

    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}
