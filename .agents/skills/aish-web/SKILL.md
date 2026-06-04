```markdown
# aish-web Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `aish-web` repository, a TypeScript project built with the Next.js framework. You'll learn how to structure code, write commits, organize files, and follow the project's conventions for imports, exports, and testing.

## Coding Conventions

### File Naming
- Use **camelCase** for all file names.
  - Example: `userProfile.tsx`, `apiHandler.ts`

### Import Style
- Use **absolute imports** throughout the codebase.
  - Example:
    ```typescript
    import Button from 'components/Button';
    ```

### Export Style
- Use **default exports** for modules and components.
  - Example:
    ```typescript
    const MyComponent = () => { /* ... */ };
    export default MyComponent;
    ```

### Commit Messages
- Follow the **Conventional Commits** pattern.
- Use the `feat` prefix for new features.
- Average commit message length: ~32 characters.
  - Example:
    ```
    feat: add user authentication flow
    ```

## Workflows

### Feature Development
**Trigger:** When adding a new feature to the application  
**Command:** `/feature-dev`

1. Create a new branch for your feature.
2. Implement the feature using camelCase file names and absolute imports.
3. Export new modules/components as default.
4. Write a commit message starting with `feat:`, describing the feature.
5. Open a pull request for review.

### Testing
**Trigger:** When writing or updating tests  
**Command:** `/run-tests`

1. Create or update test files using the `*.test.*` naming pattern.
   - Example: `userProfile.test.ts`
2. Ensure tests cover new or changed functionality.
3. Run the test suite (framework unknown; use project scripts or Next.js recommendations).
4. Review test results and fix any failures.

## Testing Patterns

- Test files follow the `*.test.*` naming convention.
  - Example: `loginForm.test.tsx`
- The testing framework is not specified; refer to project documentation or scripts for running tests.
- Place tests alongside the modules/components they test or in a designated `__tests__` directory.

## Commands
| Command         | Purpose                                  |
|-----------------|------------------------------------------|
| /feature-dev    | Start the feature development workflow    |
| /run-tests      | Run the test suite for the codebase       |
```