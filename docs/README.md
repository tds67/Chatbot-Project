# MoodBot

MoodBot is a moody, teasing chatbot UI built with plain HTML, CSS, and JavaScript.

## How to run

Open `index.html` directly in a browser.

No build tools are required.

## Project structure

```text
moodbot-project/
  index.html
  src/
    css/
      styles.css
    js/
      app.js
      botEngine.js
      persona.js
      rules.js
      storage.js
      ui.js
    assets/
  docs/
    README.md
```

## Main files

- `src/js/persona.js` controls moods, insults, refusal lines, and mild curse words.
- `src/js/rules.js` controls simple task handling.
- `src/js/botEngine.js` decides whether the bot helps or rejects the request.
- `src/css/styles.css` controls the user interface.
- `src/js/storage.js` saves chat history and settings in the browser.

## Customization ideas

- Add more moods in `persona.js`.
- Add new task handlers in `rules.js`.
- Change rejection probability in `botEngine.js`.
- Add sound effects or achievements.
- Add a real AI API later by replacing `generateReply()` in `botEngine.js`.

## Safety note

The bot is designed for playful teasing. It avoids slurs, threats, hate, protected-class harassment, and self-harm content.
