# Chess Grandmasters Wiki

A web application that displays information about Chess Grandmasters from Chess.com.

## Features

- **Grandmaster Listing**: Browse a complete list of Chess Grandmasters as defined by Chess.com
- **Search Functionality**: Filter grandmasters by username
- **Profile Pages**: View detailed information about individual grandmasters
- **Last Online Clock**: Real-time display of time since a grandmaster was last online
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Toggle between dark and light mode for comfortable viewing

## Technologies Used

- React 19
- TypeScript
- Zustand for state management
- React Router v7
- Chess.com API

## Project Structure

The project follows a feature-based architecture:

```
src/
├── assets/            # Static assets
├── components/        # Reusable UI components
├── config/            # Application configuration
├── features/          # Feature modules
│   └── grandmasters/  # Grandmaster feature module
│       ├── components/# Feature-specific components
│       ├── pages/     # Route-level components
│       ├── services/  # API and data services
│       └── store/     # State management
├── store/             # Global state management
├── styles/            # Global styles
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## State Management

The application uses Zustand for state management with three main stores:

- **GrandmastersStore**: Manages the list of grandmasters, pagination, and search functionality
- **GrandmasterProfileStore**: Manages individual grandmaster profile data with caching
- **ThemeStore**: Handles theme switching between light and dark modes, persisting user preference

## Running the Project

### Prerequisites

- Node.js 18+ and npm/pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
pnpm build
```

## API Usage

This project uses the Chess.com API:

- `/pub/titled/GM` - List of all GM titled players
- `/pub/player/{username}` - Player profile information

## License

MIT
