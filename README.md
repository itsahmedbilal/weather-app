# Weather App

This project is a dynamic weather application built with React, TypeScript, and Vite. It provides real-time weather information based on user-input locations.

## Features

- Real-time weather data display
- Dynamic theme changes based on weather conditions
- Responsive design with animated weather icons
- Debounced search functionality for efficient API calls

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS for styling

## Key Components

- `App.tsx`: Main component handling state and rendering
- `SunComponent`, `CloudComponent`, `RainDropsComponent`: Weather icon components
- Custom hooks:
  - `useDebounce`: For optimizing search input
  - `useWeatherReport`: Fetches weather data
  - `useThemeUpdater`: Updates theme based on weather conditions

## Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Start the development server: `pnpm run dev`

## Project Structure
