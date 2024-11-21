
# Drone Tracker Dashboard

This project is a **Drone Tracker Dashboard** built with **Vite**, **React**, **TypeScript**, and **Tailwind CSS**. It includes features like real-time drone position tracking, interactive map layers, and dynamic UI toggles. The project leverages **Leaflet** for mapping, **React Leaflet** for seamless React integration, **Zustand** for state management, and **Lucide React** for modern icons. Essential configurations for ESLint and Prettier are included to maintain code quality and consistency.

---

## Features

- **Vite**: Fast build tool and development server.
- **React + TypeScript**: Modern React with type safety.
- **Tailwind CSS**: Utility-first CSS framework.
- **Leaflet**: Powerful mapping library for interactive maps.
- **React Leaflet**: React integration for Leaflet to simplify map rendering and interactivity.
- **Zustand**: Lightweight and scalable state management for drone and UI states.
- **Lucide React**: Modern and customizable SVG icon library for building sleek user interfaces.
- **ESLint**: Linting for JavaScript and TypeScript with strict rules.
- **Prettier**: Code formatter for consistent styling.
- **Hot Module Replacement (HMR)**: Instant feedback during development.

---

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Scripts

- **Start Development Server**:
  ```bash
  npm run dev
  ```
  Starts the development server at `http://localhost:5173`.

- **Build for Production**:
  ```bash
  npm run build
  ```
  Bundles the application for production.

- **Preview Production Build**:
  ```bash
  npm run preview
  ```
  Serves the production build locally for testing.

- **Lint the Code**:
  ```bash
  npm run lint
  ```
  Checks the code for linting issues using ESLint.

- **Format Code**:
  ```bash
  npm run format
  ```
  Formats the code using Prettier.

---

## Configuration

### Leaflet + React Leaflet
The project uses Leaflet for map rendering and React Leaflet for React integration. Drone positions are displayed as markers on an interactive map with dynamic icons based on state.

### Zustand
Zustand is used for state management, including tracking drone positions, map settings, and UI toggles like stats and control panels.

### Lucide React
Icons are implemented using Lucide React for modern and lightweight SVG icons.

### ESLint
The project uses ESLint with:
- **@typescript-eslint** for TypeScript linting.
- **eslint-plugin-react-hooks** for React hooks rules.
- **eslint-plugin-react-refresh** for React Refresh rules.
- **Prettier integration** to handle code formatting.

### Tailwind CSS
Tailwind is configured for a utility-first approach. The configuration is in `tailwind.config.js`.
