import lunchData from './data.js';
import backgroundImages from './images.js';

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

// Helper to get random item from array
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

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

// Play random sound effect
const playRandomSound = () => {
    const soundFile = getRandom(soundEffects);
    const audio = new Audio(`sound effect/${soundFile}`);
    audio.volume = 0.7;
    audio.play().catch(e => console.log("Sound effect failed:", e));
};

// Trigger confetti
const triggerConfetti = () => {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.textContent = getRandom(foodEmojis);
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
        confetti.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        document.body.appendChild(confetti);

        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
};

// Runaway Button Logic
let runawayCount = 0;
const maxRunaways = 3;

againBtn.addEventListener('mouseover', () => {
    if (runawayCount < maxRunaways) {
        const x = Math.random() * (window.innerWidth - againBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - againBtn.offsetHeight);

        againBtn.style.position = 'fixed';
        againBtn.style.left = `${x}px`;
        againBtn.style.top = `${y}px`;

        runawayCount++;
    }
});

const showResult = () => {
    // Play background music if not playing
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic.paused) {
        bgMusic.play().catch(e => console.log("BG Audio play failed:", e));
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
