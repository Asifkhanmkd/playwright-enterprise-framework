# Adding a New Automation Project

### 1. Purpose

This guide walks through how to add a new automation project to the Enterprise Playwright Framework while sticking to the framework's architecture and conventions.

Whether you're adding a UI, API, or Hybrid project, the goal is the same, keep everything consistent, reusable, and easy to maintain by following the existing framework design rather than doing your own thing.

### 2. Prerequisites

Before adding a new project, make sure you've:

- Set up your local environment using the [Environment Configuration Guide](Environment-Configuration.md)
- Got a basic understanding of the framework's architecture
- Read through the [Enterprise Framework v2.0 Design](Enterprise-Framework-v2.0.md), especially the Project Contract section

### 3. Choose the Project Type

The framework supports a few different types of automation projects. Go with whichever structure best fits the application you're testing:

- UI Automation
- API Automation
- Hybrid (UI + API)

No matter which type you pick, every project still needs to follow the same architectural principles and conventions.

### 4. Create the Project Structure

Create your new project folder under:

`src/projects/`

Stick to the same folder structure and naming conventions the existing projects already use.

The required structure is laid out in the Project Contract section of the [Enterprise Framework v2.0 Design](Enterprise-Framework-v2.0.md). Try not to invent your own folder layout unless the framework architecture has been deliberately changed to allow it.

### 5. Configure Environment Variables

If your project needs its own environment-specific configuration:

- Add any new variables to `.env.example`
- Set the matching values in your local `.env` file
- Use environment variables instead of hard-coding values directly

Check the [Environment Configuration Guide](Environment-Configuration.md) if you need more detail on this.

### 6. Reuse Existing Framework Components

Before writing new utilities or helper classes, check whether something similar already exists in the framework. Wherever you can, reuse what's already in `Shared` or `Core` instead of building duplicates.

This includes things like base `Page` classes, API Clients, Fixtures, Utilities, Helpers, logging, and reporting.

Reusing what's already there keeps the framework consistent and a lot easier to maintain down the line.

### 7. Register the Project

Once your project structure is in place:

- Add any configuration your project needs
- Register the project if configuration changes require it
- Check that it can run on its own, independently of other projects

If more framework-level configuration is needed, follow the same pattern the existing projects already use.

### 8. Add Your Automation Assets

Once the project's registered, start adding the actual automation assets. Depending on the project type, that could mean Page Objects, API Clients, Test Data, Fixtures, Utilities, or Test Suites.

Try to keep everything modular and reusable as you build it out.

### 9. Verify the Project

Before opening a Pull Request, make sure everything actually works. It's worth checking that:

- The project runs locally without issues
- All tests pass
- The generated reports look right
- Logging output is showing up correctly
- No existing projects have been broken in the process

---

## 10. Project Checklist

Before submitting a new project, confirm that:

- [ ] The project follows the Project Contract.
- [ ] The folder structure follows the framework conventions.
- [ ] Required environment variables have been added.
- [ ] Existing Shared and Core components have been reused where appropriate.
- [ ] Tests execute successfully.
- [ ] Reports and logging work correctly.
- [ ] Documentation has been updated if required.

---

### 11. Related Documentation

- [README](../README.md)
- [Enterprise Framework v2.0 Design](enterprise-framework-v2.0.md)
- [Environment Configuration Guide](environment-configuration.md)
