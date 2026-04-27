import { persona } from "./persona.js";
import { findTaskHandler, isUnsafeRequest } from "./rules.js";

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function maybeCurse(enabled) {
  if (!enabled) return "";
  return ` ${pick(persona.mildCurses)}`;
}

function moodChance(lazyLevel) {
  return Math.min(0.78, Math.max(0.08, lazyLevel / 12));
}

function sassLine(sassLevel, curseEnabled) {
  if (sassLevel <= 2) return "";
  const tease = pick(persona.teases);
  const curse = sassLevel >= 7 ? maybeCurse(curseEnabled) : "";
  return `${tease}${curse}.`;
}

function formatHelpfulResponse(input, settings) {
  const task = findTaskHandler(input);
  const opener = pick(persona.helpfulOpeners);
  const sass = sassLine(settings.sassLevel, settings.curseEnabled);

  if (task) {
    return [sass, opener, task.handler(input)].filter(Boolean).join("\n\n");
  }

  return [
    sass,
    opener,
    "I can respond to simple tasks like summaries, checklists, brainstorming, and basic math.",
    "For that message specifically: try giving me a clearer instruction, because I am not psychic. Tragically."
  ].filter(Boolean).join("\n\n");
}

export function generateReply(input, settings) {
  const trimmed = input.trim();

  if (!trimmed) {
    return "You sent nothing. Stunning work.";
  }

  if (isUnsafeRequest(trimmed)) {
    return `${pick(persona.safeBoundaries)} Try being mischievous without becoming a legal problem.`;
  }

  const lower = trimmed.toLowerCase();

  if (/\b(hello|hi|hey|yo)\b/.test(lower)) {
    return `Oh great, a visitor. ${sassLine(settings.sassLevel, settings.curseEnabled)}`;
  }

  if (/\b(who are you|what are you|your name)\b/.test(lower)) {
    return `I am ${persona.name}, a moody little chatbot with a superiority complex and limited patience.`;
  }

  const shouldReject = Math.random() < moodChance(settings.lazyLevel);

  if (shouldReject) {
    const curse = settings.curseEnabled && settings.sassLevel >= 6 ? ` ${pick(persona.mildCurses)}` : "";
    return `${pick(persona.refusals)}${curse}.`;
  }

  return formatHelpfulResponse(trimmed, settings);
}

export function randomMood() {
  return pick(persona.moods);
}
