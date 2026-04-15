# 🏘️ My Housing Monitor Web

A modern, full-stack React web application for monitoring and analyzing Australian housing market data across Local Government Areas (LGAs). Built with cutting-edge technologies including React 19, TypeScript, Vite, Firebase Firestore, and Supabase. Here is the demo https://experiment-housing-monitor-app.vercel.app/

## ✨ Features

- **📊 LGA Data Visualization**: Interactive displays of median house and unit prices, rental data, and market trends
- **🔥 Real-time Data**: Firebase Firestore integration for up-to-date housing market information
- **🎨 Beautiful UI**: Modern, responsive design with Tailwind CSS 4 and shadcn/ui components
- **🧭 Seamless Navigation**: React Router v7 with nested routing and dynamic LGA pages
- **🔒 Type-Safe**: Full TypeScript implementation with Zod schemas for runtime validation
- **⚡ Optimized Performance**: React Query for efficient data fetching, caching, and synchronization
- **📱 Mobile-First**: Responsive design that works beautifully on all devices
- **🎭 Loading States**: Animated skeleton screens and loading components for better UX
- **🔌 Edge API Functions**: Vercel edge functions for server-side data processing
- **🎯 Component Library**: Comprehensive UI component library powered by Radix UI primitives

## 🛠️ Tech Stack

### Frontend
- **React 19.1** - Latest React with improved performance
- **TypeScript 5.8** - Type safety and better developer experience
- **Vite 7** - Lightning-fast build tool and dev server
- **React Router v7.8** - Modern routing with nested routes
- **TanStack Query v5.90** - Powerful data synchronization

### Styling
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component primitives
- **shadcn/ui** - Beautiful, reusable components built on Radix
- **Lucide React** - Beautiful icon library
- **class-variance-authority** - CVA for component variants

### Backend & Data
- **Firebase 12** - Firestore for real-time database
- **Supabase** - PostgreSQL database with REST API
- **Vercel Edge Functions** - Serverless API endpoints
- **Zod 4** - TypeScript-first schema validation

### Development Tools
- **ESLint 9** - Code linting and quality
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React** - Fast refresh and JSX transform

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Firebase project** - [Create one here](https://console.firebase.google.com/)
- **Supabase project** (optional) - [Create one here](https://supabase.com/)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd my-housing-monitor-web
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
   
Create a `.env` file in the root directory:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id

# Supabase Configuration (optional)
VITE_SUPABASE_PROJECT_URL=https://your-project.supabase.co/rest/v1
VITE_SUPABASE_API_KEY=your_supabase_anon_key
```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

### Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
my-housing-monitor-web/
├── api/                          # Vercel Edge Functions
│   ├── client-info.ts           # Client info API
│   ├── home-page-data-edge.ts   # Home page data API
│   └── lib/                     # API utilities
│       ├── database.ts          # Database connections
│       └── response-utils.ts    # API helpers
│
├── src/
│   ├── components/              # Shared Components
│   │   ├── common/              # App-specific shared components
│   │   │   ├── ErrorFallback.tsx
│   │   │   ├── LoadingCard.tsx
│   │   │   └── ...
│   │   └── ui/                  # Shadcn Universal UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── ...
│   │
│   ├── data-services/           # Data Layer Architecture
│   │   ├── api/                 # API integration layer
│   │   ├── db-sources/          # Database connections (Firebase/Supabase)
│   │   ├── hooks/               # React Query hooks
│   │   ├── repos/               # Repository pattern
│   │   ├── schemas/             # Zod validation schemas
│   │   └── data-utils/          # Transformation utilities
│   │
│   ├── features/                # Feature Modules (Vertical Slices)
│   │   ├── client/              # Client feature
│   │   │   ├── components/      # Client-specific components
│   │   │   └── pages/           # Client feature pages
│   │   └── home/                # Home feature
│   │       ├── components/      # Home-specific components
│   │       └── pages/           # Home feature pages
│   │
│   ├── layouts/                 # Application layouts
│   ├── pages/                   # Route Entry Points
│   ├── ui/                      # UI constants & icons
│   ├── lib/                     # Utilities
│   ├── routes.tsx               # Route definitions
│   └── main.tsx                 # Entry point
│
├── public/                      # Static assets
├── vercel.json                  # Vercel deployment config
└── vite.config.ts               # Vite configuration
```

## 🔑 Key Features & Architecture

### 🎨 UI Component Library

Built with **shadcn/ui** and **Radix UI**, featuring 40+ pre-built, accessible components:

- **Layout**: Card, Separator, Scroll Area, Resizable, Sidebar
- **Navigation**: Navigation Menu, Menubar, Breadcrumb, Pagination, Tabs
- **Forms**: Input, Textarea, Select, Checkbox, Radio Group, Switch, Form
- **Overlays**: Dialog, Alert Dialog, Sheet, Drawer, Popover, Tooltip, Hover Card
- **Feedback**: Alert, Toast (Sonner), Progress, Skeleton
- **Data Display**: Table, Accordion, Collapsible, Avatar, Badge, Aspect Ratio
- **Interactive**: Button, Toggle, Dropdown Menu, Context Menu, Command
- **Date & Time**: Calendar, Date Picker

### 📊 Data Architecture

#### React Query Integration
Efficient data fetching with automatic caching and synchronization:

```tsx
// Custom hooks with React Query
const { data, isLoading, error } = useHomePageData();
const { data: medianPrice } = useMedianPrice(lgaAlias);
const { data: bmgccData } = useBMGCCData();
```

#### Repository Pattern
Clean separation of data access logic:

```tsx
// Example: medianPrice.repo.ts
export const medianPriceRepo = {
  getByLGA: async (alias: string) => { /* ... */ },
  getAll: async () => { /* ... */ }
};
```

#### Zod Schema Validation
Runtime type checking and validation:

```tsx
// Ensures data integrity from Firebase/Supabase
const medianPriceSchema = z.object({
  lga: z.string(),
  medianHousePrice: z.number(),
  medianUnitPrice: z.number(),
  // ... more fields
});
```

### 🎭 Loading States & Error Handling

Beautiful loading states with animated skeleton screens:

```tsx
// LoadingGrid with staggered animations
<LoadingGrid cardCount={3} staggerDelay={150} />

// Custom LoadingCard
<LoadingCard 
  animationType="pulse"
  delay={200}
  titleWidth="w-48" 
  descriptionLines={3}
/>

// Error Boundary with fallback UI
<QueryBoundary>
  <YourComponent />
</QueryBoundary>
```

### 🔌 API Layer

#### Vercel Edge Functions
Serverless API endpoints optimized for edge computing:

- **`/api/home-page-data-edge`** - Home page data aggregation
- **`/api/info`** - API information and health check

#### Supabase Integration
PostgreSQL database access via REST API:

```typescript
// Supabase service layer
export const supabaseService = {
  getListings: async () => { /* ... */ },
  getByLGA: async (lga: string) => { /* ... */ }
};
```

### 🧭 Routing & Navigation

**React Router v7** with modern features:

- **Nested Routes**: Hierarchical page structure
- **Dynamic Routes**: LGA-specific pages (`/:alias`)
- **Outlet Context**: Type-safe data passing to child routes
- **Error Boundaries**: Graceful error handling per route

```tsx
// Route structure
<Route path="/" element={<AppLandingPage />} />
<Route path="/topics/:alias" element={<ClientHome />} />
<Route path="*" element={<NotFound />} />
```

### 🏗️ Architecture Deep Dive

#### Frontend (Client-Side)
- **Role**: Handles UI presentation, user interaction, and client-side routing.
- **Data Access**: Does **not** access the database directly for all operations. It uses:
    - **Repositories (`src/data-services/repos`)**: For direct, secure Firestore access (when allowed by rules).
    - **Client API (`src/data-services/client-api`)**: Fetches data from our Backend API (Vercel Functions) when server-side processing or hiding secrets is required.

#### Backend (Server-Side)
- **Location**: `api/` directory (root).
- **Technology**: Vercel Edge Functions / Serverless Functions.
- **Role**:
    - Acts as a secure proxy for sensitive database operations.
    - Performs complex data aggregation that would be too heavy for the client.
    - Exposes REST endpoints that the Frontend calls via `client-api`.

#### Database Layer
- **Firestore**: Primary NoSQL database for flexible data structures.
- **Supabase**: relational data storage, tapped into via Vercel Functions/Client.

---

### 🎨 Design System & CSS Tokens

We use **Tailwind CSS v4** with CSS variables for a dynamic and themable design system.

#### 1. Adding New Colors (Tokens)
To add a new brand color or token:

**Step 1: Define CSS Variable**
Open `src/index.css` and add your variable to the `@theme` block or `:root`:

```css
@theme inline {
  --color-my-new-color: #123456;
}
```

**Step 2: Use in Code**
You can now use it directly in Tailwind classes:

```tsx
<div className="bg-my-new-color text-white">...</div>
```

#### 2. Component Design
- **shadcn/ui**: We use these as base primitives. Do not modify `src/components/ui` files directly unless you are customizing the global component style.
- **Overriding**: Use `className` props to override styles for specific instances.
- **Global Styles**: Defined in `src/index.css` (headers, body defaults).

## 💻 Development


### Development Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload at `http://localhost:5173` |
| `npm run build` | Build for production (TypeScript compilation + Vite build) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

### Naming Conventions

To ensure consistency, we adhere to the following naming conventions:

#### File Naming
- **React Components**: `PascalCase` (e.g., `UserProfile.tsx`) - matches component name.
- **Non-Components**: `camelCase` (e.g., `useAuth.ts`, `apiClient.ts`).
- **API Routes**: `kebab-case` (e.g., `api/client-info.ts`).
- **Directories**: `kebab-case` (preferred) or `camelCase`.

#### Component Naming
- **General**: `PascalCase` noun-based descriptions (e.g., `SubmitButton`).
- **Feature-Specific**: `[FeatureName][ComponentName]` (e.g., `ClientHeading.tsx`).

### Development Workflow

```bash
# 1. Create a new branch
git checkout -b feature/your-feature-name

# 2. Start development server
npm run dev

vercel dev --local-config vercel.dev.json

# 3. Make your changes and test

# 4. Lint your code
npm run lint

# 5. Build to verify no errors
npm run build

# 6. Commit and push
git add .
git commit -m "Your commit message"
git push origin feature/your-feature-name
```

### Code Quality & Style

- ✅ **TypeScript** - Full type safety across the codebase
- ✅ **ESLint** - Code linting with React and TypeScript rules
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **Component Composition** - Reusable, composable components
- ✅ **Custom Hooks** - Logic extraction and reusability
- ✅ **Error Boundaries** - Graceful error handling

### Project Configuration Files

- `vite.config.ts` - Vite configuration and plugins
- `tsconfig.json` - TypeScript base configuration
- `tsconfig.app.json` - App-specific TypeScript settings
- `tsconfig.node.json` - Node.js TypeScript settings
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint rules and plugins
- `components.json` - shadcn/ui configuration

## 🚀 Deployment

### Vercel (Recommended)

This project is optimized for **Vercel** deployment with edge functions support.

#### Deploy with Vercel

1. **Connect Repository**
   - Import your Git repository to Vercel
   - Or use Vercel CLI: `npm i -g vercel && vercel`

2. **Configure Environment Variables**
   
   Add these in Vercel Dashboard → Settings → Environment Variables:
   
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_SUPABASE_PROJECT_URL=https://your-project.supabase.co/rest/v1
   VITE_SUPABASE_API_KEY=your_supabase_anon_key
   ```

3. **Deploy**
   - Push to your main branch
   - Vercel will automatically build and deploy
   - Edge functions in `/api` directory will be deployed automatically

#### Vercel Configuration

The project includes `vercel.json` for deployment configuration:
- Edge Functions for API routes
- Build output directory
- Environment variable handling

### Other Platforms

#### Netlify

```bash
# Build command
npm run build

# Publish directory
dist

# Environment variables
# Add the same variables as Vercel
```

#### Docker

```dockerfile
# Example Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Follow code style** (run `npm run lint`)
5. **Test your changes** (ensure `npm run build` succeeds)
6. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
7. **Push to the branch** (`git push origin feature/amazing-feature`)
8. **Open a Pull Request**

### Contribution Guidelines

- Write clean, readable TypeScript code
- Follow existing code style and patterns
- Use meaningful commit messages
- Update documentation as needed
- Test your changes thoroughly

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgments

- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful component library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Query](https://tanstack.com/query)** - Powerful data synchronization
- **[Firebase](https://firebase.google.com/)** - Real-time database
- **[Vercel](https://vercel.com/)** - Deployment platform

---

**Built with ❤️ for Australian Housing Market Analysis**
