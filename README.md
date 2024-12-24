# Real-time Sports Betting Platform

A modern, real-time sports betting platform built with React, TypeScript, and Tailwind CSS. This application provides live game updates, real-time odds adjustments, and an interactive betting experience.

![Sports Betting Platform](https://github.com/user-attachments/assets/aeb0ce27-8c4a-4d06-a901-12f941207b17)

## Features

### 🎮 Live Game Updates
- Real-time score updates
- Dynamic odds adjustments based on game progress
- Live game time tracking
- Multiple concurrent games support

### 💰 Betting System
- Interactive bet placement
- Real-time balance updates
- Comprehensive betting history
- Multiple betting options (home, away, draw)

### 🏆 Leaderboard
- Real-time rankings
- Win rate tracking
- Total winnings display
- Dynamic position updates based on win rate and amount won using weights

### 👤 User Features
- Personal balance tracking
- Betting history
- Performance statistics
- Real-time updates

## Project Structure

```
src/
├── components/           # React components
│   ├── BetForm.tsx      # Betting form component
│   ├── BettingHistory.tsx # History display
│   ├── GameCard.tsx     # Game display card
│   └── Leaderboard.tsx  # Leaderboard component
│   └── Button.tsx  # Button component
│   └── Input.tsx  # Input component
├── hooks/
│   └── useAlert.ts      # hooks to trigger notification popup
├── pages/           # React components
│   └── dashboard.tsx      # Dashboard page component
│   └── login.tsx      # Login page component
│   └── signup.tsx      # Signup page component
├── stores/
│   └── auth.store.ts # auth state management
│   └── bet.store.ts # bet state management
│   └── game.store.ts # game state management
├── utils/
│   └── constant.ts # Where we define constant with use throughout the app
│   └── helper.ts  # Where we write some helper functions that we can reuse
│   └── http.ts  # window fetch config file, which expose http methods
│   └── services.ts  # File that exposes all api services we need
├── types/
│   └── index.ts         # TypeScript definitions
└── App.tsx              # Main application component that export the Router configurations
```

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon set
- **Vite** - Build tool and development server

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/AllStackDev1/real-time-sports-betting-platform/tree/main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Development

### State Management
The application uses React Context for state management, with the following key features:
- Centralized state in `BettingContext`
- Real-time updates through simulation services
- Type-safe state mutations

### Component Architecture
- **GameCard**: Displays individual game information and betting options
- **BetForm**: Handles bet placement with validation
- **BettingHistory**: Shows user's betting history
- **Leaderboard**: Displays real-time rankings

### Real-time Updates
The app gets simulated data from the server which provides:
- Score updates every 30 seconds
- Odds adjustments based on score changes
- Leaderboard updates every 5 seconds
- Game time progression
- Balance update when bet is placed or won

## Best Practices

### Code Organization
- Small, focused components
- Clear separation of concerns
- Type-safe interfaces
- Modular service architecture

### State Management
- Zustand state management with different individual store for conciseness.
- Immutable state updates
- Type-safe actions
- Clear update patterns

### Performance
- Optimized re-renders
- Efficient state updates
- Clean-up on unmount

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)
- Built with [Vite](https://vitejs.dev)