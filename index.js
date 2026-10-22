// Module 6: Advanced JavaScript and DOM Manipulation
// Click handlers, callback functions, audio, switch statements,
// JavaScript objects and methods, keyboard events, and CSS animation.

// A JavaScript object with a property and a method (Lessons 5 and 6).
const drumKit = {
  beatsPlayed: 0,

  recordBeat: function () {
    this.beatsPlayed += 1;
    document.getElementById("beat-count").textContent = this.beatsPlayed;
  }
};

// Lesson 1: Register a click listener for each drum button.
const drumButtons = document.querySelectorAll(".drum");
const numberOfDrumButtons = drumButtons.length;

for (let i = 0; i < numberOfDrumButtons; i++) {
  drumButtons[i].addEventListener("click", function () {
    const buttonInnerHTML = this.innerHTML.trim();

    if (makeSound(buttonInnerHTML)) {
      buttonAnimation(buttonInnerHTML);
      drumKit.recordBeat();
    }
  });
}

// Lessons 7 and 8: Respond to the seven assigned keyboard keys.
// The callback is passed to addEventListener as an argument.
document.addEventListener("keypress", function (event) {
  // Do not trigger drums while someone is typing in an editable field.
  if (event.target && typeof event.target.closest === "function" &&
      event.target.closest("input, textarea, select, [contenteditable='true']")) {
    return;
  }

  const key = event.key.toLowerCase();
  if (makeSound(key)) {
    buttonAnimation(key);
    drumKit.recordBeat();
  }
});

// Lessons 3 and 4: Select a matching sound with a switch statement.
function makeSound(key) {
  let soundFile;

  switch (key) {
    case "w":
      soundFile = "sounds/tom-1.mp3";
      break;
    case "a":
      soundFile = "sounds/tom-2.mp3";
      break;
    case "s":
      soundFile = "sounds/tom-3.mp3";
      break;
    case "d":
      soundFile = "sounds/tom-4.mp3";
      break;
    case "j":
      soundFile = "sounds/snare.mp3";
      break;
    case "k":
      soundFile = "sounds/crash.mp3";
      break;
    case "l":
      soundFile = "sounds/kick-bass.mp3";
      break;
    default:
      return false;
  }

  // Create an Audio object and replay the chosen sound on each hit.
  const sound = new Audio(soundFile);
  sound.currentTime = 0;
  sound.play().catch(function (error) {
    console.error("Could not play the drum sound:", soundFile, error);
  });

  return true;
}

// Lesson 9: Briefly add and remove the .pressed CSS class.
function buttonAnimation(currentKey) {
  const activeButton = document.querySelector(".drum." + currentKey);
  if (!activeButton) return;

  activeButton.classList.add("pressed");

  // Restarting the timer handles repeated hits on the same drum.
  clearTimeout(activeButton.animationTimer);
  activeButton.animationTimer = setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}
