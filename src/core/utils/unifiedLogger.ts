// src/core/utils/unifiedLogger.ts
// src/core/utils/unifiedLogger.ts
import fs from 'fs';
import path from 'path';

type LogLevel = 'INFO' | 'ERROR' | 'WARN' | 'DEBUG';

export class UnifiedLogger {
  private workerId: string;
  private workerLogDir: string;
  
  constructor() {
    this.workerId = process.env.TEST_WORKER_INDEX || '0';
    this.workerLogDir = path.join(process.cwd(), 'logs', 'workers', this.workerId);
    
    // Create directory
    if (!fs.existsSync(this.workerLogDir)) {
      fs.mkdirSync(this.workerLogDir, { recursive: true });
    }
    
    console.log(`[Worker ${this.workerId}] UnifiedLogger initialized`);
  }
  
  async log(testId: string, retry: number, level: LogLevel, message: string): Promise<void> {
    const timestamp = new Date().toISOString();
    const testLogFile = path.join(this.workerLogDir, `${testId}-retry-${retry}.log`);
    const line = `[${timestamp}] [${level}] ${message}\n`;
    
    // Append to test-specific file
    await fs.promises.appendFile(testLogFile, line);
    
    // Also write to worker log for real-time debugging
    const workerLogFile = path.join(this.workerLogDir, 'worker.log');
    const workerLine = `[${timestamp}] [${testId}:${retry}] [${level}] ${message}\n`;
    await fs.promises.appendFile(workerLogFile, workerLine);
  }
  
  async info(testId: string, retry: number, message: string): Promise<void> {
    return this.log(testId, retry, 'INFO', message);
  }
  
  async error(testId: string, retry: number, message: string): Promise<void> {
    return this.log(testId, retry, 'ERROR', message);
  }
  
  async warn(testId: string, retry: number, message: string): Promise<void> {
    return this.log(testId, retry, 'WARN', message);
  }
  
  async debug(testId: string, retry: number, message: string): Promise<void> {
    return this.log(testId, retry, 'DEBUG', message);
  }
}

// Create and export singleton
export const unifiedLogger = new UnifiedLogger();