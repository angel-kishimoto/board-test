// sound is from https://sounds-mp3.com/i-en-throw-dice
const diceSound = new Audio("dice.mp3");

const playSound = (sound: HTMLAudioElement) => {
    if (!sound.paused) {
        sound.pause();
        sound.currentTime = 0;
    }

    sound.play();
}

export const playDiceSound = () => playSound(diceSound);