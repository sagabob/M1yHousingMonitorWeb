# Project Structure Documentation

This document outlines the architectural structure and organization of the **My Housing Monitor** web application.

## Overview

The project is a **React** application built with **Vite** and likely deployed on **Vercel** (indicated by `vercel.json` and `api` directory). It uses **TypeScript** and **Tailwind CSS** for styling.

## High-Level Directory Layout

```
/
├── api/                # Vercel Serverless Functions
├── public/             # Static public assets
├── src/                # Main application source code
│   ├── components/     # Shared React components
│   ├── data-services/  # Data fetching, API clients, and schemas
│   ├── features/       # Feature-based modules (Vertical Slices)
│   ├── layouts/        # Application layout wrappers
│   ├── lib/            # Utility libraries
│   ├── pages/          # Route entry points
│   └── ...
└── ... config files
```

## detailed Breakdown

### 1. `src/features/`
The application follows a feature-based architecture where code related to specific business domains is grouped together.

- **`client/`**: Features related to client/user info.
- **`home/`**: Features related to the home page dashboard/view.

Each feature directory typically contains its own components, hooks, and logic specific to that feature, promoting better isolation and maintainability.

### 2. `src/data-services/`
This directory serves as the centralized data layer for the application.

- **`api/`**: Base API client or configuration.
- **`config/`**: Data-related configuration.
- **`hooks/`**: Custom React hooks for data fetching (e.g., using React Query or SWR).
- **`schemas/`**: Zod schemas or TypeScript interfaces for data validation.
- **`repos/`**: Repository pattern implementations (abstraction over data sources).

### 3. `src/components/`
Contains reusable UI components shared across the application.

- **`ui/`**: Base UI elements (likely ShadcnUI components like Buttons, Cards, Inputs).
- **`common/`**: Application-specific shared components (e.g., `PageHeading`, `LoadingGrid`, `ErrorFallback`).

### 4. `src/pages/` and `src/layouts/`
- **`pages/`**: Connects routes to feature views. These components act as the entry points for the React Router.
- **`layouts/`**: Defines the common page structures (e.g., Headers, Footers, Sidebars) that wrap the page content.

### 5. `api/`
Contains server-side logic deployed as Vercel Serverless Functions. This is used for backend operations that need to run securely or separate from the client bundle (e.g., `client-info.ts`, `home-page-data-edge.ts`).

## Key Technologies & Patterns

- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router (implied by `routes.tsx`)
- **Architecture**:
    - **Vertical Slices**: Code is organized by feature (`src/features`) rather than just technical type.
    - **Separation of Concerns**: UI (`components`), Business Logic (`features`), and Data Access (`data-services`) are distinct.

## Usage Guidelines

- **New Features**: Create a new directory in `src/features/`.
- **Reusable UI**: If a component is generic, place it in `src/components/ui`. If it's specific to the app but used in multiple places, use `src/components/common`.
- **Data Fetching**: All data fetching logic should reside in `src/data-services` to maintain a single source of truth for API interactions.
