const arcjetModule = require("@arcjet/node");
const ENV = require("./env");

// Arcjet default export
const arcjet = arcjetModule.default;

// Named exports
const { shield, detectBot, slidingWindow } = arcjetModule;

const aj = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    slidingWindow({
      mode: "LIVE",
      max: 100,
      interval: 60,
    }),
  ],
});

module.exports = aj;
