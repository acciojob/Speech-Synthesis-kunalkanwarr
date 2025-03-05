// Your script here.
const synth = window.speechSynthesis;
const textInput = document.getElementById("textInput");
const voiceSelect = document.getElementById("voiceSelect");
const rate = document.getElementById("rate");
const pitch = document.getElementById("pitch");
const speakButton = document.getElementById("speak");
const stopButton = document.getElementById("stop");

let voices = [];

// Fetch voices and populate dropdown
function loadVoices() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = voices
        .filter(voice => voice.lang.startsWith("en")) // Show only English voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join("");
}

// Load voices when ready
synth.onvoiceschanged = loadVoices;

// Speak function
function speakText() {
    if (synth.speaking) {
        console.error("Already speaking...");
        return;
    }

    const text = textInput.value.trim();
    if (text === "") return; // Prevent speaking empty text

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices.find(voice => voice.name === voiceSelect.value);
    utterance.rate = rate.value;
    utterance.pitch = pitch.value;

    synth.speak(utterance);
}

// Stop function
function stopSpeaking() {
    synth.cancel();
}

// Event listeners
speakButton.addEventListener("click", speakText);
stopButton.addEventListener("click", stopSpeaking);
voiceSelect.addEventListener("change", speakText);
rate.addEventListener("input", () => synth.cancel());
pitch.addEventListener("input", () => synth.cancel());

// Load voices on page load
window.onload = loadVoices;
