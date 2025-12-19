# API Refactoring & Naming Suggestions

Based on an analysis of the `api/` directory, here are suggestions to improve structure, maintainability, and consistency.

## 1. Directory Structure

The current structure is flat, which works for small projects but can get messy.

**Current:**
```
api/
  client-info.ts
  home-page-data-edge.ts
  lib/
    supabase-service.ts
    database.ts
    ...
```

**Proposed:**
Group "services" (business logic) and "utils" separately. Move strictly internal logic into a `_src` or `internal` folder to avoid confusion with actual API endpoints if using Vercel (where every file in `api` can become a route).

```
api/
  # Public Endpoints
  client-info.ts
  home-page-data.ts        <-- Rename (remove '-edge')
  
  # Shared Internal Logic
  _lib/                    <-- Use underscore to indicate internal-only
    services/
      supabase.service.ts  <-- Explicit dot notation
    utils/
      response.utils.ts
      db.utils.ts
    types/
      api-types.ts
```

## 2. Naming Conventions

### File Names
*   **Endpoints**: Keep using **kebab-case** (e.g., `client-info.ts`) as these directly map to URLs.
*   **Remove Redundancy**: Rename `home-page-data-edge.ts` to `home-page-data.ts`. The `edge` runtime config inside the file is sufficient context; the filename doesn't need it.

### Function Names
*   **Service Functions**: Use `get[Entity][filteredBy]` pattern.
    *   Current: `getBenchMarkforLga`
    *   Suggestion: `getBenchmarkByLga` (CamelCase, "By" preposition)

## 3. Code Refactoring

### Middleware / Wrapper Pattern
Currently, every handler manually calls `validateEnvironment()` and wraps everything in a `try/catch` block. You can create a higher-order function to handle this.

**Create `api/_lib/with-edge-handler.ts`:**
```typescript
export const withEdgeHandler = (handler: (req: Request) => Promise<Response>) => {
  return async (req: Request) => {
    try {
      validateEnvironment();
      return await handler(req);
    } catch (error) {
      console.error(error);
      return createInternalErrorResponse(error);
    }
  };
};
```

**Usage:**
```typescript
// api/client-info.ts
export default withEdgeHandler(async (req) => {
   // clean logic, no try-catch boilerplate
});
```

### Type Safety
*   **Share Types**: If possible, share TypeScript interfaces between `src/` (Frontend) and `api/` (Backend) to ensure the API matches what the UI expects.
*   **Zod Validation**: Use Zod in the API to validate incoming query parameters (e.g., `lgacode`) instead of manual `if (!lgaCode)` checks.

## 4. Supabase Service

In `supabase-service.ts`, the generic `SupabaseQueryResult` is a good start.
*   **Suggestion**: Define specific return types for each RPC call instead of `any`.
    ```typescript
    interface HomePageSummary { ... }
    export const getHomePageSummaryByLga = async (...): Promise<SupabaseQueryResult<HomePageSummary>> => ...
    ```
