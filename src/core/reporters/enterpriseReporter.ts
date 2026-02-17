
import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestResult,
  TestCase,
} from "@playwright/test/reporter";
import path from "path";
import fs from "fs";

export default class EnterpriseReporter implements Reporter {
  private runId: string;
  private runLogPath: string;
  private aggregatedLogPath: string;
  private summaryPath: string;
  private workersDir: string;
  private testResults: Array<{
    title: string;
    status: string;
    duration: number;
    testId: string;
    retry: number;
    workerId?: string;
    logs: string;
  }> = [];

  constructor() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    this.runId = `run-${timestamp}`;

    const reportsDir = path.resolve(process.cwd(), "reports", this.runId);
    this.workersDir = path.resolve(process.cwd(), "logs", "workers");

    // Create directories atomically
    [reportsDir, this.workersDir].forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true, mode: 0o755 });
      }
    });

    this.runLogPath = path.join(reportsDir, "execution.log");
    this.aggregatedLogPath = path.join(reportsDir, "aggregated.log");
    this.summaryPath = path.join(reportsDir, "summary.json");
  }

  onBegin(config: FullConfig, suite: Suite): void {
    const totalTests = suite.allTests().length;
    const workers = config.workers || 1;

    const header = this.generateHeader("TEST RUN STARTED", {
      Time: new Date().toISOString(),
      Tests: totalTests,
      Workers: workers,
      Parallel: config.fullyParallel ? "Yes" : "No",
    });

    this.writeToAllLogs(header);
    console.log(
      `📊 Enterprise Reporter: Test run started with ${totalTests} tests`,
    );
  }

  onTestBegin(test: TestCase): void {
    const line = `[${new Date().toISOString()}] START: ${test.title}\n`;
    fs.appendFileSync(this.runLogPath, line);
  }

  async onTestEnd(test: TestCase, result: TestResult): Promise<void> {
    // Find test log files across all workers
    const testLogs = await this.findAndArchiveTestLogs(test.id, result.retry);

    // Create test result entry
    const testResult = {
      title: test.title,
      status: result.status,
      duration: result.duration,
      testId: test.id,
      retry: result.retry,
      logs: testLogs || "[No logs available]",
    };

    this.testResults.push(testResult);

    // Write to aggregated log
    const testBlock = this.createTestResultBlock(testResult, result);
    this.writeToAllLogs(testBlock);

    // Log to console with emoji
    const statusIcon =
      result.status === "passed"
        ? "✅"
        : result.status === "failed"
          ? "❌"
          : "⚠️";
    console.log(
      `${statusIcon} ${test.title} - ${result.status.toUpperCase()} (${result.duration}ms)`,
    );
  }

  async onEnd(result: FullResult): Promise<void> {
    // Generate comprehensive summary
    await this.generateSummary();

    // Aggregate all worker logs
    await this.aggregateWorkerLogs();

    // Create footer
    const footer = this.generateHeader("TEST RUN COMPLETED", {
      Time: new Date().toISOString(),
      "Overall Status": result.status.toUpperCase(),
      Duration: `${result.duration}ms`,
      "Total Tests": this.testResults.length,
      Passed: this.testResults.filter((t) => t.status === "passed").length,
      Failed: this.testResults.filter((t) => t.status === "failed").length,
      Skipped: this.testResults.filter((t) => t.status === "skipped").length,
    });

    this.writeToAllLogs(footer);

    console.log(
      `\n📊 Enterprise Reporter: Test run completed - ${result.status.toUpperCase()}`,
    );
    console.log(`📁 Detailed logs: ${this.runLogPath}`);
    console.log(`📄 Summary report: ${this.summaryPath}`);
  }

  private async findAndArchiveTestLogs(
    testId: string,
    retry: number,
  ): Promise<string> {
    const archiveDir = path.join(path.dirname(this.runLogPath), "test-logs");

    if (!fs.existsSync(this.workersDir)) {
      return "";
    }

    const workerDirs = fs.readdirSync(this.workersDir).filter((dir) => {
      const dirPath = path.join(this.workersDir, dir);
      return fs.statSync(dirPath).isDirectory();
    });

    for (const workerDir of workerDirs) {
      const testLogPath = path.join(
        this.workersDir,
        workerDir,
        `${testId}-retry-${retry}.log`,
      );

      if (fs.existsSync(testLogPath)) {
        // Archive the log file
        if (!fs.existsSync(archiveDir)) {
          fs.mkdirSync(archiveDir, { recursive: true });
        }

        const archivePath = path.join(
          archiveDir,
          `${this.sanitizeFileName(testId)}_retry-${retry}.log`,
        );

        fs.copyFileSync(testLogPath, archivePath);

        // Read and return the logs
        return fs.readFileSync(testLogPath, "utf-8");
      }
    }

    return "";
  }

  private async generateSummary(): Promise<void> {
    const summary = {
      runId: this.runId,
      timestamp: new Date().toISOString(),
      totalTests: this.testResults.length,
      passed: this.testResults.filter((t) => t.status === "passed").length,
      failed: this.testResults.filter((t) => t.status === "failed").length,
      skipped: this.testResults.filter((t) => t.status === "skipped").length,
      totalDuration: this.testResults.reduce((sum, t) => sum + t.duration, 0),
      tests: this.testResults.map((t) => ({
        title: t.title,
        status: t.status,
        duration: t.duration,
        retry: t.retry,
      })),
      failures: this.testResults
        .filter((t) => t.status === "failed")
        .map((t) => ({ title: t.title, retry: t.retry })),
    };

    fs.writeFileSync(this.summaryPath, JSON.stringify(summary, null, 2));
  }

  private async aggregateWorkerLogs(): Promise<void> {
    if (!fs.existsSync(this.workersDir)) {
      return;
    }

    const workerDirs = fs
      .readdirSync(this.workersDir)
      .filter((dir) =>
        fs.statSync(path.join(this.workersDir, dir)).isDirectory(),
      );

    for (const workerDir of workerDirs) {
      const workerLogFile = path.join(this.workersDir, workerDir, "worker.log");

      if (fs.existsSync(workerLogFile)) {
        const header = `\n\n${"#".repeat(60)}\nWORKER ${workerDir} LOGS\n${"#".repeat(60)}\n`;
        const workerLogs = fs.readFileSync(workerLogFile, "utf-8");

        fs.appendFileSync(this.aggregatedLogPath, header + workerLogs);
      }
    }
  }

  private generateHeader(title: string, details: Record<string, any>): string {
    const lines = ["=".repeat(80), title];

    for (const [key, value] of Object.entries(details)) {
      lines.push(`${key}: ${value}`);
    }

    lines.push("=".repeat(80), "");
    return lines.join("\n");
  }

  private createTestResultBlock(
    testResult: any,
    testDetails: TestResult,
  ): string {
    const statusIcon =
      testResult.status === "passed"
        ? "✅"
        : testResult.status === "failed"
          ? "❌"
          : "⚠️";

    const lines = [
      "",
      "=".repeat(80),
      `${statusIcon} ${testResult.title}`,
      `Status: ${testResult.status.toUpperCase()} | Retry: ${testResult.retry} | Duration: ${testResult.duration}ms`,
      `Test ID: ${testResult.testId}`,
      "-".repeat(40),
      testResult.logs,
      "-".repeat(40),
    ];

    if (testDetails.error) {
      lines.push(`Error: ${testDetails.error.message}`);
    }

    lines.push("=".repeat(80), "");
    return lines.join("\n");
  }

  private writeToAllLogs(content: string): void {
    fs.appendFileSync(this.runLogPath, content);
    fs.appendFileSync(this.aggregatedLogPath, content);
  }

  private sanitizeFileName(fileName: string): string {
    return fileName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  }
}
