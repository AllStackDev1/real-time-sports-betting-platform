# Real-time Sports Betting Platform

A modern, real-time sports betting platform built with React, TypeScript, and Tailwind CSS. This application provides live game updates, real-time odds adjustments, and an interactive betting experience.

![Sports Betting Platform](https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=2000)

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
- Dynamic position updates

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
├── context/
│   └── BettingContext.tsx # Global state management
├── mocks/
│   └── mockData.ts      # Simulation data
├── services/
│   └── simulationService.ts # Real-time update simulation
├── types/
│   └── index.ts         # TypeScript definitions
└── App.tsx              # Main application component
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
   git clone <repository-url>
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
The simulation service provides:
- Score updates every 3 seconds
- Odds adjustments based on score changes
- Leaderboard updates every 5 seconds
- Game time progression

## Best Practices

### Code Organization
- Small, focused components
- Clear separation of concerns
- Type-safe interfaces
- Modular service architecture

### State Management
- Centralized state
- Immutable state updates
- Type-safe actions
- Clear update patterns

### Performance
- Optimized re-renders
- Efficient state updates
- Controlled simulation intervals
- Clean-up on unmount

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)
- Built with [Vite](https://vitejs.dev)