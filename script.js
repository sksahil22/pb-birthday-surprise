
/* =========================================
   PREMIUM BIRTHDAY EXPERIENCE 💗
   Dreamy Pink • Cinematic • Romantic
   Images are in the SAME folder as index.html
========================================= */

const introScreen = document.getElementById("introScreen");
const heartLauncher = document.getElementById("heartLauncher");

const memoriesScreen = document.getElementById("memoriesScreen");
const memoryGallery = document.getElementById("memoryGallery");
const memoryCaption = document.getElementById("memoryCaption");

const loveVortex = document.getElementById("loveVortex");
const finalScreen = document.getElementById("finalScreen");
const mainPhoto = document.getElementById("mainPhoto");
const replayButton = document.getElementById("replayButton");

const floatingParticles = document.getElementById("floatingParticles");
const transitionFlash = document.getElementById("transitionFlash");

let sequenceStarted = false;
let sequenceTimers = [];
let particleInterval = null;
let activeGalleryCards = [];

const TOTAL_PHOTOS = 15;

const captions = [
    "A little moment, a forever memory. 💗",
    "You make ordinary days feel magical. ✨",
    "My favourite smile, always. 🌸",
    "Every picture holds a piece of my heart. 💕",
    "If happiness had a face, I'd know yours. ♡",
    "The little things with you mean everything. 💖",
    "My favourite person, in every frame. 🌷",
    "Some memories feel like home. 🏡",
    "A thousand reasons to smile. 💗",
    "You make my world softer and brighter. ✨",
    "A moment I would choose again. 💕",
    "My heart keeps its favourite memories here. ♡",
    "With you, little things become special. 🌸",
    "One of my favourite views, always. 💖",
    "And somehow, my favourite story is still you. 💗"
];

const particleSymbols = [
    "♥", "♡", "❤", "✧", "✦", "❀", "🌸"
];

/* -----------------------------------------
   TIMER MANAGEMENT
----------------------------------------- */

function later(callback, delay) {
    const timer = window.setTimeout(callback, delay);
    sequenceTimers.push(timer);
    return timer;
}

function clearSequenceTimers() {
    sequenceTimers.forEach(timer => window.clearTimeout(timer));
    sequenceTimers = [];
}

/* -----------------------------------------
   FLOATING HEARTS AND ROSE PETALS
----------------------------------------- */

function createParticle() {
    const particle = document.createElement("span");
    const isPetal = Math.random() > 0.58;

    particle.className = isPetal
        ? "floating-particle rose-petal"
        : "floating-particle floating-heart";

    particle.textContent = isPetal
        ? ["🌸", "❀", "✿"][Math.floor(Math.random() * 3)]
        : ["♥", "♡", "❤", "✧"][Math.floor(Math.random() * 4)];

    const size = 12 + Math.random() * 23;
    const duration = 7 + Math.random() * 8;

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.fontSize = `${size}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${Math.random() * 1.5}s`;
    particle.style.setProperty("--drift", `${Math.random() * 120 - 60}px`);
    particle.style.setProperty("--spin", `${Math.random() * 360}deg`);

    floatingParticles.appendChild(particle);

    window.setTimeout(() => {
        particle.remove();
    }, (duration + 2) * 1000);
}

function startParticles() {
    if (particleInterval) {
        window.clearInterval(particleInterval);
    }

    for (let i = 0; i < 16; i++) {
        window.setTimeout(createParticle, i * 140);
    }

    particleInterval = window.setInterval(() => {
        createParticle();

        if (Math.random() > 0.5) {
            createParticle();
        }
    }, 450);
}

/* -----------------------------------------
   IMAGE PRELOADING
   Uses the exact filenames in your folder
----------------------------------------- */

function preloadImages() {
    const paths = [];

    for (let i = 1; i <= TOTAL_PHOTOS; i++) {
        paths.push(`./bp${i}.jpeg`);
    }

    paths.push("./mainpic1.jpeg");

    paths.forEach(path => {
        const image = new Image();
        image.src = path;
    });
}

/* -----------------------------------------
   START THE SURPRISE
----------------------------------------- */

heartLauncher.addEventListener("click", startExperience);

function startExperience() {
    if (sequenceStarted) return;

    sequenceStarted = true;
    heartLauncher.disabled = true;

    heartLauncher.classList.add("heart-activated");
    introScreen.classList.add("intro-leaving");

    later(() => {
        introScreen.classList.remove("active");
        introScreen.setAttribute("aria-hidden", "true");

        memoriesScreen.classList.add("memories-active");
        memoriesScreen.setAttribute("aria-hidden", "false");

        revealMemories();
    }, 750);
}

/* -----------------------------------------
   REVEAL PHOTOS ONE BY ONE
----------------------------------------- */

function revealMemories() {
    memoryGallery.replaceChildren();
    activeGalleryCards = [];

    for (let i = 1; i <= TOTAL_PHOTOS; i++) {
        const card = document.createElement("article");
        card.className = "memory-card";
        card.dataset.index = String(i);

        const photoFrame = document.createElement("div");
        photoFrame.className = "memory-photo-frame";

        const image = document.createElement("img");
        image.src = `./bp${i}.jpeg`;
        image.alt = `Birthday memory ${i}`;
        image.loading = "eager";
        image.decoding = "async";

        image.addEventListener("error", () => {
            console.error(`Unable to load image: ./bp${i}.jpeg`);
            card.classList.add("image-error");
        }, { once: true });

        const number = document.createElement("span");
        number.className = "memory-number";
        number.textContent = String(i).padStart(2, "0");

        const heart = document.createElement("span");
        heart.className = "memory-heart";
        heart.textContent = "♡";

        const caption = document.createElement("p");
        caption.className = "memory-card-caption";
        caption.textContent = captions[i - 1];

        photoFrame.appendChild(image);
        card.append(photoFrame, number, heart, caption);
        memoryGallery.appendChild(card);

        activeGalleryCards.push(card);

        // Each image gets its own entrance time
        later(() => {
            card.classList.add("memory-card-visible");

            memoryCaption.textContent = captions[i - 1];
        }, 250 + (i - 1) * 260);
    }

    // Let all photos appear before the vortex transition
    later(startVortex, 250 + TOTAL_PHOTOS * 260 + 1900);
}

/* -----------------------------------------
   CINEMATIC VORTEX
----------------------------------------- */

function startVortex() {
    memoriesScreen.classList.add("memories-gathering");

    activeGalleryCards.forEach((card, index) => {
        later(() => {
            card.classList.add("memory-card-sucked");
        }, index * 75);
    });

    later(() => {
        loveVortex.classList.add("vortex-active");
    }, 350);

    later(() => {
        transitionFlash.classList.add("flash-active");
    }, 1550);

    later(() => {
        memoriesScreen.classList.remove("memories-active");
        memoriesScreen.classList.remove("memories-gathering");
        memoriesScreen.setAttribute("aria-hidden", "true");

        loveVortex.classList.remove("vortex-active");
        loveVortex.classList.add("vortex-fading");

        showFinalReveal();
    }, 2500);

    later(() => {
        loveVortex.classList.remove("vortex-fading");
        transitionFlash.classList.remove("flash-active");
    }, 3300);
}

/* -----------------------------------------
   FINAL BIRTHDAY REVEAL
----------------------------------------- */

function showFinalReveal() {
    finalScreen.classList.add("final-active");
    finalScreen.setAttribute("aria-hidden", "false");

    // Keep the main image path consistent with the folder
    mainPhoto.src = "./mainpic1.jpeg";

    mainPhoto.onerror = () => {
        console.error(
            "Unable to load ./mainpic1.jpeg. Check the filename and folder."
        );
    };
}

/* -----------------------------------------
   REPLAY THE WHOLE EXPERIENCE
----------------------------------------- */

replayButton.addEventListener("click", replayExperience);

function replayExperience() {
    clearSequenceTimers();

    sequenceStarted = false;
    activeGalleryCards = [];

    introScreen.classList.remove("intro-leaving");
    introScreen.classList.add("active");
    introScreen.setAttribute("aria-hidden", "false");

    heartLauncher.classList.remove("heart-activated");
    heartLauncher.disabled = false;

    memoriesScreen.classList.remove(
        "memories-active",
        "memories-gathering"
    );
    memoriesScreen.setAttribute("aria-hidden", "true");

    memoryGallery.replaceChildren();
    memoryCaption.textContent =
        "Every picture holds a little piece of my heart. 💗";

    loveVortex.classList.remove("vortex-active", "vortex-fading");
    transitionFlash.classList.remove("flash-active");

    finalScreen.classList.remove("final-active");
    finalScreen.setAttribute("aria-hidden", "true");

    mainPhoto.src = "./mainpic1.jpeg";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* -----------------------------------------
   INITIALISE
----------------------------------------- */

startParticles();
preloadImages();

mainPhoto.addEventListener("load", () => {
    mainPhoto.classList.add("photo-loaded");
});
