const config = window.VALENTINE_CONFIG;

let bgMusic, musicToggle;
let loveMeter, loveValue, extraLove;

window.addEventListener("DOMContentLoaded", () => {

    document.title = config.pageTitle;

    // TEXT
    document.getElementById("valentineTitle").textContent = `${config.valentineName}, my love...`;

    document.getElementById("question1Text").textContent = config.questions.first.text;
    document.getElementById("yesBtn1").textContent = config.questions.first.yesBtn;
    document.getElementById("noBtn1").textContent = config.questions.first.noBtn;
    document.getElementById("secretAnswerBtn").textContent = config.questions.first.secretAnswer;

    document.getElementById("question2Text").textContent = config.questions.second.text;
    document.getElementById("startText").textContent = config.questions.second.startText;
    document.getElementById("nextBtn").textContent = config.questions.second.nextBtn;

    document.getElementById("question3Text").textContent = config.questions.third.text;
    document.getElementById("yesBtn3").textContent = config.questions.third.yesBtn;
    document.getElementById("noBtn3").textContent = config.questions.third.noBtn;

    bgMusic = document.getElementById("bgMusic");
    musicToggle = document.getElementById("musicToggle");

    loveMeter = document.getElementById("loveMeter");
    loveValue = document.getElementById("loveValue");
    extraLove = document.getElementById("extraLove");

    setupMusic();
    setupLoveMeter();
    createFloating();
});

function setupMusic() {
    document.getElementById("musicSource").src = config.music.musicUrl;
    bgMusic.volume = config.music.volume;

    document.addEventListener("click", function start() {
        bgMusic.play().catch(()=>{});
        musicToggle.textContent = config.music.stopText;
        document.removeEventListener("click", start);
    });

    musicToggle.onclick = () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    };
}

function setupMusic() {
    if (!config.music.enabled) return;

    const source = document.getElementById("musicSource");
    source.src = config.music.musicUrl;

    bgMusic.volume = config.music.volume;

    // 🔥 FORCE RELOAD AFTER SETTING SRC
    bgMusic.load();

    musicToggle.textContent = config.music.startText;

    musicToggle.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play()
                .then(() => {
                    musicToggle.textContent = config.music.stopText;
                })
                .catch((err) => {
                    console.error("Audio error:", err);
                    alert("Click again to play music 🎵");
                });
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}


function moveButton(btn) {
    let x = Math.random() * (window.innerWidth - btn.offsetWidth - 20);
    let y = Math.random() * (window.innerHeight - btn.offsetHeight - 20);

    btn.style.position = "fixed";
    btn.style.left = x + "px";
    btn.style.top = y + "px";
}

function showNextQuestion(n) {
    document.querySelectorAll(".question-section").forEach(q => q.classList.add("hidden"));
    document.getElementById("question" + n).classList.remove("hidden");
}

function celebrate() {
    document.querySelectorAll(".question-section").forEach(q => q.classList.add("hidden"));

    let c = document.getElementById("celebration");
    c.classList.remove("hidden");

    document.getElementById("celebrationTitle").textContent = config.celebration.title;
    document.getElementById("celebrationMessage").textContent = config.celebration.message;
    document.getElementById("celebrationEmojis").textContent = config.celebration.emojis;

    document.getElementById("letterBtn").classList.remove("hidden");
}

// 💌 FIXED MODAL (NO AUTO POPUP)
function showLoveLetter() {
    let modal = document.getElementById("loveLetterModal");
    modal.style.display = "flex";
    document.getElementById("loveLetterText").textContent = config.loveLetter;
}

function closeLoveLetter() {
    document.getElementById("loveLetterModal").style.display = "none";
}

function createFloating() {
    let container = document.querySelector(".floating-elements");

    [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears].forEach(e => {
        let d = document.createElement("div");
        d.innerHTML = e;
        d.className = "heart";
        d.style.left = Math.random()*100+"vw";
        container.appendChild(d);
    });
}
