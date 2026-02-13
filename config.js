const CONFIG = {
    valentineName: "Menn",
    pageTitle: "Will You Be My Valentine? 💝",

    floatingEmojis: {
        hearts: ['❤️','💖','💝','💗','💓'],
        bears: ['🧸','🐻']
    },

    questions: {
        first: {
            text: "Do you like me?",
            yesBtn: "Yes",
            noBtn: "No",
            secretAnswer: "I don't like you, I love you ❤️"
        },
        second: {
            text: "How much do you love me?",
            startText: "This much!",
            nextBtn: "Next ❤️"
        },
        third: {
            text: "Will you be my Valentine?",
            yesBtn: "Yes!",
            noBtn: "No"
        }
    },

    loveMessages: {
        extreme: "WOOOOW 🥰🚀",
        high: "To infinity 🚀",
        normal: "And beyond 🥰"
    },

    celebration: {
        title: "Yay! I'm the luckiest person 💖",
        message: "Now come get your gift, a big warm hug and a huge kiss!",
        emojis: "🎁💖🤗💋"
    },

    loveLetter: `Menn ❤️

You are my favorite person.
My peace. My chaos. My everything.

I love you more than words can explain.

— Yours ❤️`,

    music: {
        enabled: true,
       musicUrl: "./assets/song.mp3",
        startText: "🎵 Play Music",
        stopText: "🔇 Stop Music",
        volume: 0.5
    }
};

window.VALENTINE_CONFIG = CONFIG;
