# My Housing Monitor Web

A React-based web application for monitoring housing market data across Local Government Areas (LGAs) in Australia. Built with React, TypeScript, Vite, and Firebase.

## Features

- **LGA Data Visualization**: View median house and unit prices, rental data for different LGAs
- **Real-time Data**: Firebase integration for up-to-date housing market information
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Interactive Navigation**: React Router for seamless page navigation
- **Data Validation**: Zod schemas for type-safe data handling
- **Loading States**: Animated loading components with skeleton screens
- **API Integration**: Supabase REST API for additional listing data

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI components
- **Routing**: React Router v7
- **State Management**: React Query (TanStack Query)
- **Database**: Firebase Firestore
- **API**: Supabase REST API
- **Validation**: Zod
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project
- Supabase project (optional)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd my-housing-monitor-web
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
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

4. Start the development server
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # Radix UI components
├── data-services/      # Data layer
│   ├── api/           # API services
│   ├── hooks/         # React Query hooks
│   ├── repos/         # Repository pattern
│   ├── schemas/       # Zod schemas
│   └── config/        # Configuration
├── hooks/             # Custom React hooks
├── page-data/         # Static data
├── pages/             # Page components
├── ui/                # Custom UI components
│   ├── client-components/  # LGA-specific components
│   ├── page-containers/    # Page containers
│   └── components/         # Loading components
└── lib/               # Utilities
```

## Key Components

### Loading Components

The app includes animated loading components for better UX:

- **LoadingGrid**: Grid of loading cards with staggered animations
- **LoadingCard**: Individual loading card with configurable animations

```tsx
// Basic usage
<LoadingGrid cardCount={2} staggerDelay={200} />

// With different animation types
<LoadingCard 
  animationType="bounce"
  delay={400}
  titleWidth="w-32" 
  descriptionLines={2}
/>
```

### Data Services

- **Firebase Integration**: Real-time housing data from Firestore
- **Supabase API**: Additional listing data via REST API
- **Zod Validation**: Type-safe data validation and transformation
- **React Query**: Efficient data fetching and caching

### Routing

- **React Router v7**: Modern routing with nested routes
- **Dynamic Routes**: LGA-specific pages with `/:alias` pattern
- **Outlet Context**: Passing data to nested components

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN` 
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_SUPABASE_PROJECT_URL` (optional)
- `VITE_SUPABASE_API_KEY` (optional)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
