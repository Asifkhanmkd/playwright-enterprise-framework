import fs from "fs";
import path from "path";

type LogLevel = "INFO" | "ERROR" | "WARN" | "DEBUG";

class Logger {
  private logFilePath: string;

  constructor() {
    const logsDir = path.resolve(process.cwd(), "logs");

    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }
    const date = new Date().toISOString().split("T")[0];
    this.logFilePath = path.join(logsDir, `test-run-${date}.log`);
  }

  private write(level: LogLevel, message: string) {
    const timeStamp = new Date().toISOString();
    const formattedMessge = `[${timeStamp}] [${level}] ${message}\n`;

    if (level === "ERROR") {
      console.error(formattedMessge.trim());
    } else if (level === "WARN") {
      console.warn(formattedMessge.trim());
    } else if (level === "DEBUG") {
      console.debug(formattedMessge.trim());
    } else {
      console.debug(formattedMessge.trim());
    }

    fs.appendFileSync(this.logFilePath, formattedMessge);
  }
  info(message: string) {
    this.write("INFO", message);
  }

  warn(message: string) {
    this.write("ERROR", message);
  }

  error(message: string) {
    this.write("ERROR", message);
  }

  debug(message: string) {
    this.write("DEBUG", message);
  }
}

export const logger = new Logger();
