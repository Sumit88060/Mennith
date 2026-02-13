const config = window.VALENTINE_CONFIG;

let loveMeter, loveValue, extraLove;
let bgMusic, musicToggle;
let musicStarted = false;

window.addEventListener('DOMContentLoaded', () => {

    document.title = config.pageTitle;

    // TEXT
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

    // ELEMENTS
    loveMeter = document.getElementById('loveMeter');
    loveValue = document.getElementById('loveValue');
    extraLove = document.getElementById('extraLove');

    bgMusic = document.getElementById('bgMusic');
    musicToggle = document.getElementById('musicToggle');

    setupLoveMeter();
    setupMusic();
    createFloatingElements();
});

function setupLoveMeter() {
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

function setupMusic() {
    if (!config.music.enabled) return;

    document.getElementById('musicSource').src = config.music.musicUrl;
    bgMusic.volume = config.music.volume;

    document.addEventListener("click", () => {
        if (!musicStarted) {
            bgMusic.play().catch(()=>{});
            musicToggle.textContent = config.music.stopText;
            musicStarted = true;
        }
    });

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

function createFloatingElements() {
    const container = document.querySelector('.floating-elements');

    [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears].forEach(e => {
        const div = document.createElement('div');
        div.innerHTML = e;
        div.className = 'heart';
        div.style.left = Math.random() * 100 + 'vw';
        container.appendChild(div);
    });
}

function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth - 20);
    const y = Math.random() * (window.innerHeight - button.offsetHeight - 20);

    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

function showNextQuestion(n) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${n}`).classList.remove('hidden');
}

function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));

    const c = document.getElementById('celebration');
    c.classList.remove('hidden');

    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;

    // ✅ SHOW LETTER BUTTON HERE
    document.getElementById("letterBtn").classList.remove("hidden");
}


// 💌 LOVE LETTER
function showLoveLetter() {
    document.getElementById("loveLetterModal").classList.remove("hidden");
    document.getElementById("loveLetterText").textContent = config.loveLetter;
}

function closeLoveLetter() {
    document.getElementById("loveLetterModal").classList.add("hidden");
}
