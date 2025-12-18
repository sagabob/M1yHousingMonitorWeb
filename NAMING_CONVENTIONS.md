# Naming Conventions & Project Standards

To ensure consistency, readability, and maintainability across the codebase, we adhere to the following naming conventions.

## 1. File Naming

### React Components
*   **Convention**: **PascalCase**
*   **Rule**: The file name should exactly match the primary component exported from it.
*   **Examples**:
    *   ✅ `nav-bar.tsx` → ❌ (Avoid kebab-case for component files)
    *   ✅ `NavBar.tsx`
    *   ✅ `UserProfile.tsx`
    *   ✅ `ClientContainer.tsx`

### Non-Component Files (Hooks, Utils, Data)
*   **Convention**: **camelCase**
*   **Examples**:
    *   ✅ `useAuth.ts`
    *   ✅ `formatDate.ts`
    *   ✅ `apiClient.ts`
    *   ✅ `lga-data.ts` → ⚠️ Consider `lgaData.ts` or keep kebab-case for distinct data files (acceptable exception).

### Directories
*   **Convention**: **kebab-case** (preferred) or **camelCase**.
*   **Rule**: Keep directory names lowercase-dashed to avoid cross-platform case-sensitivity issues (Windows/macOS/Linux).
*   **Examples**:
    *   ✅ `src/features/user-profile/`
    *   ✅ `src/components/common/`

## 2. Component Naming

### Component Names
*   **Convention**: **PascalCase**
*   **Rule**: Names should be noun-based descriptions of what the component *is* or *does*.
*   ✅ `SubmitButton`
*   ✅ `PageLayout`

### Feature-Specific Components
*   **Convention**: `[FeatureName][ComponentName]`
*   **Reason**: Makes it easier to find components in global search (Ctrl/Cmd+P) and prevents naming collisions.
*   **Examples (in `features/client/`)**:
    *   ✅ `ClientHeading.tsx`
    *   ✅ `ClientTable.tsx`
    *   ⚠️ `Heading.tsx` (Generic names are harder to distinguish in tabs/search)

## 3. Page Naming (Routes)

*   **Convention**: **PascalCase**
*   **Reason**: Pages are just React Components. Naming them PascalCase makes them consistent with other components.
*   **Recommendation**:
    *   Rename `src/pages/app-landing-page.tsx` → `src/pages/AppLandingPage.tsx`
    *   Rename `src/pages/not-found.tsx` → `src/pages/NotFound.tsx`
    *   Rename `src/pages/topics/client-home.tsx` → `src/pages/topics/ClientHome.tsx`

## 4. Import / Export Defaults

*   **Exports**: Use `export default` for top-level Page components. Use `named exports` (e.g. `export const Button = ...`) for reusable UI components and utilities to allow better tree-shaking and refactoring support.
*   **Imports**: Always use absolute imports with `@/` where possible.
    *   ✅ `import Button from "@/components/ui/Button"`
    *   ❌ `import Button from "../../components/ui/Button"`

## 5. CSS / Styles

*   **Tailwind**: Use utility classes directly.
*   **Custom Classes**: If creating custom CSS classes in `index.css`, use `kebab-case`.
    *   `.custom-card-wrapper`
