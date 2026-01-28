import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";
import { logger } from "@core/utils/logger";

class EnterpriseReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite): void {
    logger.info(`Test run started | ${suite.allTests().length} starts`);
  }

  onTestBegin(test: TestCase, result: TestResult): void {
    logger.info(`START: ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const status = result.status.toUpperCase();
    const duration = `${result.duration}ms`;

    switch (result.status) {
      case "passed":
        logger.info(`✅ PASS: ${test.title} (${duration})`);
        break;

      case "failed":
        logger.error(`❌ FAIL: ${test.title} (${duration})`);
        logger.error(result.error?.message || "Unknown error");
        break;

      default:
        logger.warn(`⚠️ ${result.status.toUpperCase()}: ${test.title}`);
    }
  }

  onEnd(result: FullResult): void {
    logger.info(`🏁 Test run finished | Status: ${result.status}`);
  }
}



export default EnterpriseReporter;
