const CHAT_KEY = "moodbot.chat.v1";
const SETTINGS_KEY = "moodbot.settings.v1";

export function loadChat() {
  try {
    return JSON.parse(localStorage.getItem(CHAT_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveChat(messages) {
  localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
}

export function clearChatStorage() {
  localStorage.removeItem(CHAT_KEY);
}

export function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || null;
  } catch {
    return null;
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function exportTranscript(messages) {
  const lines = messages.map(msg => `[${msg.role.toUpperCase()}] ${msg.text}`).join("\n\n");
  const blob = new Blob([lines], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `moodbot-transcript-${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
