Playwright Automation Framework (TypeScript)

This repository contains a scalable and modular test automation framework built with Playwright and TypeScript.
It is designed for realworld use, the kind of setup you would expect in a production team with CI/CD in mind and a strong focus on long-term maintainability.

This is not a demo or tutorial project. The structure and decisions here reflect how larger teams typically build and evolve automation frameworks.

What this framework aims to solve

Provide a production-ready Playwright setup, not a quick-start example

Scale cleanly as test coverage and teams grow

Keep test code readable and maintainable over time

Work smoothly in CI/CD pipelines (GitHub Actions friendly)

Act as a solid portfolio project for QA Engineers / SDETs

Architecture at a glance

The framework uses a multi-project structure that separates core infrastructure from application-specific test logic. This keeps responsibilities clear and prevents test code from becoming tightly coupled to setup logic.

Design principles followed

Clear responsibility at file and module level

Prefer composition over inheritance

Explicit fixtures instead of hidden magic

Isolated, deterministic test execution

Key features
Playwright + TypeScript

Type safety to catch issues early and improve IDE support

Reliable async handling using Playwright’s test runner

Custom fixtures

Centralized core fixtures (testBase, authFixture, etc.)

Dependencies are injected explicitly into tests

Clear separation between:

browser and context setup

authentication handling

page initialization

Page Object Model (POM)

Page classes focused purely on behavior

Test logic stays in tests, not in pages

Locators written with long-term stability in mind

Multi-project support

Multiple applications or domains can live in the same framework

Each project keeps its own pages and tests

Core logic is shared and reused where appropriate

Environment and configuration

.env based environment handling

Centralized configuration for consistency

Easy to switch between local runs and CI

Reporting and debugging

Built-in Playwright HTML reporting

Screenshots captured on failures

Trace support available for CI debugging

CI/CD readiness

Designed to plug into GitHub Actions easily

Supports parallel execution

Reports and traces can be published as artifacts

├── config/
│ ├── constants.ts
│ ├── playwright.config.ts
│ └── playwright_report/
│
├── src/
│ ├── core/
│ │ ├── hooks.ts
│ │ ├── testBase.ts
│ │ ├── authFixture.ts
│ │ ├── uiLogin.fixture.ts
│ │ ├── reporters/
│ │ ├── types/
│ │ └── utils/
│ │ ├── authStateGuard.ts
│ │ └── logger.ts
│ │
│ ├── projects/
│ │ └── openCart/
│ │ ├── pages/
│ │ │ ├── Login.page.ts
│ │ │ ├── Dashboard.page.ts
│ │ │ └── Product.page.ts
│ │ │
│ │ └── tests/
│ │ ├── auth/
│ │ │ └── session/
│ │ │ ├── Login.positive.test.ts
│ │ │ ├── Login.negative.test.ts
│ │ │ ├── Logout.test.ts
│ │ │ └── Login.persistence.test.ts
│ │ │
│ │ └── Product.test.ts
│
├── Storage/
│ └── auth-state.json
│
├── .env
├── .env.example
├── package.json
├── tsconfig.json
└── README.md

Author
Asif|Software QA Engineer
