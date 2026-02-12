const config = window.VALENTINE_CONFIG;

let noClickCount = 0;
let voiceAudio = null;

// ================= INIT =================
window.addEventListener("DOMContentLoaded", () => {
    setupPageContent();
    createFloatingElements();
    setupMusicPlayer();
    createNoModal();
    setupVoice();
    setupLoveMeter();
});

// ================= PAGE CONTENT =================
function setupPageContent() {
    document.title = config.pageTitle;

    document.getElementById("valentineTitle").textContent =
        `${config.valentineName}, my love...`;

    document.getElementById("question1Text").textContent =
        config.questions.first.text;
    document.getElementById("yesBtn1").textContent =
        config.questions.first.yesBtn;
    document.getElementById("noBtn1").textContent =
        config.questions.first.noBtn;
    document.getElementById("secretAnswerBtn").textContent =
        config.questions.first.secretAnswer;

    document.getElementById("question2Text").textContent =
        config.questions.second.text;
    document.getElementById("startText").textContent =
        config.questions.second.startText;
    document.getElementById("nextBtn").textContent =
        config.questions.second.nextBtn;

    document.getElementById("question3Text").textContent =
        config.questions.third.text;
    document.getElementById("yesBtn3").textContent =
        config.questions.third.yesBtn;
    document.getElementById("noBtn3").textContent =
        config.questions.third.noBtn;
}

// ================= FLOATING EMOJIS =================
function createFloatingElements() {
    const container = document.querySelector(".floating-elements");

    [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears]
        .forEach(emoji => {
            const div = document.createElement("div");
            div.className = "heart";
            div.innerHTML = emoji;
            div.style.left = Math.random() * 100 + "vw";
            div.style.animationDelay = Math.random() * 5 + "s";
            div.style.animationDuration = 10 + Math.random() * 15 + "s";
            container.appendChild(div);
        });
}

// ================= QUESTION NAV =================
function showNextQuestion(num) {
    document.querySelectorAll(".question-section")
        .forEach(q => q.classList.add("hidden"));
    document.getElementById(`question${num}`)
        .classList.remove("hidden");
}

// ================= EMOTIONAL MODE =================
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
    modal.className = "modal hidden";

    modal.innerHTML = `
        <div class="modal-content">
            <p id="noModalText"></p>
            <button id="closeModalBtn" class="cute-btn">Okay...</button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("closeModalBtn")
        .addEventListener("click", () => {
            modal.classList.add("hidden");
        });

    modal.addEventListener("click", (e) => {
        if (e.target.id === "noModal") {
            modal.classList.add("hidden");
        }
    });
}

// ================= NO BUTTON LOGIC =================
function moveButton(button) {
    if (!button.id.includes("no")) return;

    noClickCount++;
    playVoice();

    if (noClickCount <= 3) {
        showNoModal(noMessages[noClickCount - 1]);
        updateEmotionalUI();
        return;
    }

    // Run away mode
    button.style.position = "fixed";
    button.style.left =
        Math.random() * (window.innerWidth - button.offsetWidth) + "px";
    button.style.top =
        Math.random() * (window.innerHeight - button.offsetHeight) + "px";
}

function showNoModal(text) {
    document.getElementById("noModalText").textContent = text;
    document.getElementById("noModal").classList.remove("hidden");
}

function updateEmotionalUI() {
    let textDiv = document.getElementById("emotionalText");
    let progressDiv = document.getElementById("fakeProgress");

    if (!textDiv) {
        textDiv = document.createElement("div");
        textDiv.id = "emotionalText";
        textDiv.style.marginTop = "20px";
        textDiv.style.fontWeight = "bold";
        textDiv.style.color = "#ff4757";
        document.querySelector(".container").appendChild(textDiv);
    }

    textDiv.textContent =
        bgTexts[Math.min(noClickCount - 1, bgTexts.length - 1)];

    if (!progressDiv) {
        progressDiv = document.createElement("div");
        progressDiv.id = "fakeProgress";
        progressDiv.style.height = "10px";
        progressDiv.style.background = "#ffdede";
        progressDiv.style.borderRadius = "10px";
        progressDiv.style.marginTop = "10px";
        progressDiv.innerHTML =
            `<div id="progressFill"
                style="height:100%; width:0%;
                background:#ff6b6b;
                border-radius:10px;
                transition: width 0.4s;"></div>`;
        document.querySelector(".container").appendChild(progressDiv);
    }

    document.getElementById("progressFill")
        .style.width = Math.min(noClickCount * 25, 100) + "%";
}

// ================= VOICE =================
function setupVoice() {
    voiceAudio = new Audio("assets/voice.mp3");
    voiceAudio.volume = 0.7;
}

function playVoice() {
    if (!voiceAudio) return;
    voiceAudio.currentTime = 0;
    voiceAudio.play().catch(() => {});
}

// ================= LOVE METER =================
function setupLoveMeter() {
    const loveMeter = document.getElementById("loveMeter");
    const loveValue = document.getElementById("loveValue");
    const extraLove = document.getElementById("extraLove");

    if (!loveMeter) return;

    loveMeter.value = 100;
    loveValue.textContent = 100;

    loveMeter.addEventListener("input", () => {
        const value = parseInt(loveMeter.value);
        loveValue.textContent = value;

        if (value > 100) {
            extraLove.classList.remove("hidden");

            if (value >= 5000) {
                extraLove.textContent = config.loveMessages.extreme;
            } else if (value > 1000) {
                extraLove.textContent = config.loveMessages.high;
            } else {
                extraLove.textContent = config.loveMessages.normal;
            }
        } else {
            extraLove.classList.add("hidden");
        }
    });
}

// ================= CELEBRATION =================
function celebrate() {
    document.querySelectorAll(".question-section")
        .forEach(q => q.classList.add("hidden"));

    const celebration = document.getElementById("celebration");
    celebration.classList.remove("hidden");

    document.getElementById("celebrationTitle").textContent =
        config.celebration.title;
    document.getElementById("celebrationMessage").textContent =
        config.celebration.message;
    document.getElementById("celebrationEmojis").textContent =
        config.celebration.emojis;

    for (let i = 0; i < 40; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML =
            config.floatingEmojis.hearts[
                Math.floor(Math.random() *
                config.floatingEmojis.hearts.length)
            ];
        document.querySelector(".floating-elements").appendChild(heart);
    }
}

// ================= MUSIC =================
function setupMusicPlayer() {
    const musicControls = document.getElementById("musicControls");
    const musicToggle = document.getElementById("musicToggle");
    const bgMusic = document.getElementById("bgMusic");
    const musicSource = document.getElementById("musicSource");

    if (!config.music.enabled) {
        musicControls.style.display = "none";
        return;
    }

    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    musicToggle.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}
