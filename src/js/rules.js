const taskPatterns = [
  {
    name: "summarize",
    test: /\b(summarize|summary|sum up|recap)\b/i,
    handler: (input) => {
      const cleaned = input.replace(/\b(summarize|summary|sum up|recap)\b[:\s-]*/i, "").trim();
      if (!cleaned) return "Give me something to summarize first, genius.";
      const sentences = cleaned.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
      const short = sentences.slice(0, 2).join(". ");
      return `Tiny summary because apparently paragraphs are scary:\n${short}${short ? "." : ""}`;
    }
  },
  {
    name: "todo",
    test: /\b(todo|to-do|task list|checklist|plan)\b/i,
    handler: (input) => {
      const topic = input.replace(/\b(make|create|write|a|an|todo|to-do|task list|checklist|plan|for|about)\b/gi, " ").replace(/\s+/g, " ").trim();
      const target = topic || "your suspicious little mission";
      return [
        `Checklist for ${target}:`,
        "1. Define the goal so it stops wobbling around.",
        "2. Break it into 3-5 actual tasks.",
        "3. Do the ugliest task first. Yes, that one.",
        "4. Review the result and fix the obvious mess.",
        "5. Celebrate for 11 seconds, then continue."
      ].join("\n");
    }
  },
  {
    name: "idea",
    test: /\b(idea|ideas|brainstorm|suggest)\b/i,
    handler: () => [
      "Here are ideas, since your brain apparently put up an away message:",
      "• Add a secret command that changes the bot's mood.",
      "• Give it random dramatic status updates.",
      "• Add fake achievements like “Survived 5 insults.”",
      "• Make it occasionally answer perfectly, then complain about it.",
      "• Add themes: villain mode, sleepy mode, royal snob mode."
    ].join("\n")
  },
  {
    name: "math",
    test: /\b(calculate|math|solve)\b|^[\d\s+\-*/().%^]+$/i,
    handler: (input) => {
      const expression = input
        .replace(/calculate|math|solve/gi, "")
        .replace(/\^/g, "**")
        .trim();

      if (!/^[\d\s+\-*/().%*]+$/.test(expression)) {
        return "That does not look like safe basic math, so no. I enjoy chaos, not security problems.";
      }

      try {
        // Restricted Function avoids exposing scope. Still only allow numeric characters/operators above.
        const result = Function(`"use strict"; return (${expression})`)();
        if (!Number.isFinite(result)) return "The result is nonsense. Somehow fitting.";
        return `The answer is ${result}. You are welcome, calculator peasant.`;
      } catch {
        return "That math expression broke. Impressive, in the worst way.";
      }
    }
  }
];

const unsafePatterns = [
  /\b(kill yourself|kys|self harm|suicide)\b/i,
  /\b(slur|racial slur|homophobic slur|nazi)\b/i,
  /\b(threaten|dox|doxx|swat)\b/i
];

export function findTaskHandler(input) {
  return taskPatterns.find(rule => rule.test.test(input));
}

export function isUnsafeRequest(input) {
  return unsafePatterns.some(pattern => pattern.test(input));
}
