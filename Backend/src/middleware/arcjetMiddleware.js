const aj = require("../lib/arcjet");
const { isSpoofedBot } = require("@arcjet/inspect");

const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    // If request is denied
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          message: "Rate limit exceeded. Please try again later.",
        });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({
          message: "Access denied. Bot traffic is not allowed.",
        });
      }

      return res.status(403).json({
        message: "Access denied. Suspicious activity detected.",
      });
    }

    // Check spoofed bot detection
    if (decision.results && decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected. Access denied.",
      });
    }

    // Allow request
    next();
  } catch (error) {
    console.error("Error in arcjet middleware:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = arcjetProtection;
