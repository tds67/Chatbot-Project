import { generateReply, randomMood } from "./botEngine.js";
import {
  loadChat,
  saveChat,
  clearChatStorage,
  loadSettings,
  saveSettings,
  exportTranscript
} from "./storage.js";
import {
  createMessageElement,
  createTypingElement,
  autoResize,
  scrollToBottom
} from "./ui.js";

const messagesEl = document.querySelector("#messages");
const form = document.querySelector("#chatForm");
const input = document.querySelector("#userInput");
const sassLevel = document.querySelector("#sassLevel");
const lazyLevel = document.querySelector("#lazyLevel");
const curseToggle = document.querySelector("#curseToggle");
const clearButton = document.querySelector("#clearChat");
const exportButton = document.querySelector("#exportChat");
const statusText = document.querySelector("#statusText");
const moodLight = document.querySelector("#moodLight");

let messages = loadChat();
const savedSettings = loadSettings();

if (savedSettings) {
  sassLevel.value = savedSettings.sassLevel;
  lazyLevel.value = savedSettings.lazyLevel;
  curseToggle.checked = savedSettings.curseEnabled;
}

function currentSettings() {
  return {
    sassLevel: Number(sassLevel.value),
    lazyLevel: Number(lazyLevel.value),
    curseEnabled: curseToggle.checked
  };
}

function persistSettings() {
  saveSettings(currentSettings());
}

function setMood() {
  const mood = randomMood();
  statusText.textContent = `Mood: ${mood}`;

  const lazy = Number(lazyLevel.value);
  moodLight.style.background = lazy > 7 ? "var(--danger)" : lazy > 4 ? "var(--accent)" : "var(--accent-2)";
  moodLight.style.boxShadow = `0 0 24px ${lazy > 7 ? "var(--danger)" : lazy > 4 ? "var(--accent)" : "var(--accent-2)"}`;
}

function render() {
  messagesEl.innerHTML = "";
  if (messages.length === 0) {
    messagesEl.appendChild(createMessageElement({
      role: "system",
      text: "MoodBot is online. Ask something, then prepare to be mildly disrespected."
    }));
  }

  for (const message of messages) {
    messagesEl.appendChild(createMessageElement(message));
  }

  scrollToBottom(messagesEl);
}

function addMessage(role, text) {
  messages.push({ role, text });
  saveChat(messages);
  render();
}

function botRespond(userText) {
  const typing = createTypingElement();
  messagesEl.appendChild(typing);
  scrollToBottom(messagesEl);

  const delay = Math.min(1200, Math.max(450, userText.length * 13));

  window.setTimeout(() => {
    typing.remove();
    const reply = generateReply(userText, currentSettings());
    addMessage("bot", reply);
    setMood();
  }, delay);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  input.value = "";
  autoResize(input);
  botRespond(text);
});

input.addEventListener("input", () => autoResize(input));

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});

[sassLevel, lazyLevel, curseToggle].forEach(control => {
  control.addEventListener("input", () => {
    persistSettings();
    setMood();
  });
});

clearButton.addEventListener("click", () => {
  messages = [];
  clearChatStorage();
  render();
});

exportButton.addEventListener("click", () => {
  exportTranscript(messages);
});

setMood();
render();
