export function createMessageElement(message) {
  const bubble = document.createElement("article");
  bubble.className = `message ${message.role}`;
  bubble.textContent = message.text;
  return bubble;
}

export function createTypingElement() {
  const bubble = document.createElement("article");
  bubble.className = "message bot";
  bubble.id = "typingBubble";
  bubble.innerHTML = `<span class="typing"><span></span><span></span><span></span></span>`;
  return bubble;
}

export function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
}

export function scrollToBottom(container) {
  container.scrollTop = container.scrollHeight;
}
