import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

const logger = pino(
  {
    level: isProduction ? "info" : "debug",
  },
  isProduction
    ? pino.destination("./logs/app.log") // save logs in file (production)
    : pino.transport({
        target: "pino-pretty",
        options: { colorize: true },
      })
);

export default logger;
