
# Vite React + TypeScript + Tailwind CSS Boilerplate

This is a boilerplate project built with **Vite**, **React**, **TypeScript**, and **Tailwind CSS**. It includes essential configurations for ESLint and Prettier to maintain code quality and consistency.

---

## Features

- **Vite**: Fast build tool and development server.
- **React + TypeScript**: Modern React with type safety.
- **Tailwind CSS**: Utility-first CSS framework.
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

### ESLint
The project uses ESLint with:
- **@typescript-eslint** for TypeScript linting.
- **eslint-plugin-react-hooks** for React hooks rules.
- **eslint-plugin-react-refresh** for React Refresh rules.
- **Prettier integration** to handle code formatting.

### Tailwind CSS
Tailwind is configured for a utility-first approach. The configuration is in `tailwind.config.js`.

---

## Contribution

Feel free to fork the repository and submit pull requests for improvements or bug fixes.

---

## License

This project is open-source and available under the MIT License.
