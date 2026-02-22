import lunchData from './data.js';
import backgroundImages from './images.js';
import { getRandom } from './utils.js';

const DEBUG = false;
const logError = (msg, err) => {
    if (DEBUG) {
        console.error(msg, err);
    }
};

const app = document.getElementById('app');
const welcomeScreen = document.getElementById('welcome-screen');
const loadingScreen = document.getElementById('loading-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const againBtn = document.getElementById('again-btn');
const restaurantNameEl = document.getElementById('restaurant-name');
const menuItemEl = document.getElementById('menu-item');
const loadingTextEl = document.getElementById('loading-text');

// Sound Effects
const soundEffects = [
    "emoji-scream-and-disappear-made-with-Voicemod.mp3",
    "fahhhh.mp3",
    "holy-moly-made-with-Voicemod.mp3",
    "laugh-cat-made-with-Voicemod.mp3",
    "lobotomy-sound-effect-made-with-Voicemod.mp3",
    "mi-bombo-made-with-Voicemod.mp3",
    "plankton-augh-made-with-Voicemod.mp3",
    "pluh-made-with-Voicemod.mp3",
    "taco-bell-bong-sound-effect-made-with-Voicemod.mp3",
    "vine-boom-made-with-Voicemod.mp3"
];

// Loading Messages
const loadingMessages = [
    "diggin in yo butt",
    "mikes having his way rn..",
    "sybau",
    "what i do",
    "what is u tammat",
    "jaggin my shi"
];

// Confetti Emojis
const foodEmojis = ["🍔", "🍕", "🌮", "🥗", "🍟", "🌭", "🥪", "🍗", "🍩", "🍪"];

// State for image shuffling
let availableImages = [];

// Helper to get unique random image
const getNextImage = () => {
    if (availableImages.length === 0) {
        availableImages = [...backgroundImages];
    }
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const image = availableImages[randomIndex];
    availableImages.splice(randomIndex, 1);
    return image;
};

// Helper to get random restaurant and item
const getRandomLunch = () => {
    const restaurants = Object.keys(lunchData);
    const randomRestaurant = getRandom(restaurants);
    const items = lunchData[randomRestaurant];
    const randomItem = getRandom(items);
    return { restaurant: randomRestaurant, item: randomItem };
};

// Helper to set random background
const setRandomBackground = () => {
    const randomImage = getNextImage();
    app.style.backgroundImage = `url('pics/${randomImage}')`;
};

// Preload sound effects
const audioCache = {};
soundEffects.forEach(file => {
    const audio = new Audio(`sound effect/${file}`);
    audio.volume = 0.7;
    audioCache[file] = audio;
});

// Play random sound effect
const playRandomSound = () => {
    const soundFile = getRandom(soundEffects);
    const audio = audioCache[soundFile];
    audio.currentTime = 0;
    audio.play().catch(e => logError("Sound effect failed:", e));
};

// Trigger confetti
const triggerConfetti = () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.textContent = getRandom(foodEmojis);
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
        confetti.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        fragment.appendChild(confetti);

        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
    document.body.appendChild(fragment);
};

// Runaway Button Logic
let runawayCount = 0;
const maxRunaways = 3;

const handleRunaway = (e) => {
    if (runawayCount < maxRunaways) {
        // Prevent default behavior (like clicking) only if we are running away
        e.preventDefault();

        const x = Math.random() * (window.innerWidth - againBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - againBtn.offsetHeight);

        againBtn.style.position = 'fixed';
        againBtn.style.left = `${x}px`;
        againBtn.style.top = `${y}px`;

        runawayCount++;
    }
};

againBtn.addEventListener('mouseover', handleRunaway);
againBtn.addEventListener('touchstart', handleRunaway);

const showResult = () => {
    // Play background music if not playing
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic.paused) {
        bgMusic.play().catch(e => logError("BG Audio play failed:", e));
    }

    // Play funny sound
    playRandomSound();

    // Show loading screen
    welcomeScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    loadingScreen.classList.add('active');

    // Set random loading message
    loadingTextEl.textContent = getRandom(loadingMessages);

    // Wait for delay
    setTimeout(() => {
        const { restaurant, item } = getRandomLunch();
        restaurantNameEl.textContent = restaurant;
        menuItemEl.textContent = item;

        setRandomBackground();

        loadingScreen.classList.remove('active');
        resultScreen.classList.add('active');

        // Trigger Shake
        app.classList.add('shake');
        setTimeout(() => {
            app.classList.remove('shake');
        }, 500);

        triggerConfetti();

        // Reset runaway button
        runawayCount = 0;
        againBtn.style.position = 'static';
    }, 2000); // 2 second delay
};

// Event Listeners
startBtn.addEventListener('click', showResult);

againBtn.addEventListener('click', showResult);
