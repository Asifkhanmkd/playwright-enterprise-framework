# Environment Configuration

## 1. Purpose

This guide walks through how the Enterprise Playwright Framework uses environment variables and how you should set up your local environment before running anything.

Using environment variables keeps your settings separate from the actual code, so the same codebase can run on your machine, in CI, or in any other environment without needing changes.

## 2. Environment Files

The repository includes a `.env.example` file that defines the environment variables required by the framework.

Before running the framework locally, create your own `.env` file by copying the example file.

### Linux / macOS

```bash
cp .env.example .env
```

### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

The `.env` file is intended for local configuration only and **must not** be committed to source control.

## 3. Creating a Local Environment

Once you've created your `.env` file, go through each variable and update the values if your setup is different from the defaults.

The framework reads these values while it runs, which means projects don't end up with hard-coded URLs or settings tied to one specific environment.

## 4. Environment Variables

### Required Variables

```properties
# Required
OPENCART_BASE_URL=https://naveenautomationlabs.com/
DUMMYJSON_BASE_URL=https://dummyjson.com
TOOLSHOP_UI_BASE_URL=https://practicesoftwaretesting.com
TOOLSHOP_API_BASE_URL=https://api.practicesoftwaretesting.com

# Optional
RETRIES=1
```

## 5. Design Philosophy

The framework follows the principle that configuration belongs outside the codebase. Environment-specific values are supplied through environment variables, allowing the same implementation to run consistently across local development and CI/CD pipelines while avoiding hard-coded configuration.

## 6. How the Framework Uses Environment Variables

Environment variables give the framework the settings it needs without baking any environment-specific details directly into the code. This approach provides several benefits:

- Local development stays consistent
- Project configuration can be reused
- CI/CD pipelines stay cleaner
- Moving between environments is simpler

## 7. Best Practices

- Keep your .env file local, don't share it or push it anywhere
- Never commit secrets or personal config
- Update `.env.example` whenever a new required variable comes up
- Remove variables that aren't being used anymore, so things stay easy to follow
- Go with environment variables instead of hard-coding config values

## 8. Troubleshooting

If the framework can't find an environment variable it's expecting:

- Check that your .env file actually exists
- Make sure the variable names match what's in .env.example
- Double-check for typos
- Restart the test run after making any changes to the file
- Confirm that the `.env` file is located in the repository root.

## 9. Related Documentation

- [README](../README.md)
- [Enterprise Framework v2.0 Design](Enterprise-Framework-v2.0.md)
- Adding a New Project Guide _(coming soon)_

---

_Last updated: July 2026_
