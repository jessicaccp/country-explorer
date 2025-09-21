# Country Explorer

[![Netlify Status](https://api.netlify.com/api/v1/badges/dab157e8-3548-402d-8206-a68da038e2fb/deploy-status)](https://app.netlify.com/projects/country-explorer1/deploys)

**📍 [Live Demo](https://country-explorer1.netlify.app/)**

A responsive front-end application built with React and Vite for exploring, searching, and filtering country data from the REST Countries API.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Configuration & Installation](#configuration--installation)
  - [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [License](#license)

## Features

- **Dynamic Search & Filtering:** Implements client-side search by country name and filtering by geographical region.
- **Multi-criteria Sorting:** Allows users to sort the dataset by name, population, and area in both ascending and descending order.
- **Client-side Pagination:** Efficiently handles and displays a large dataset with a smart pagination component.
- **Detailed Country View:** Features a dedicated route for each country displaying comprehensive data, including calculated metrics like population density.
- **Responsive Design:** A mobile-first, fully responsive layout built with Tailwind CSS, ensuring a consistent user experience.
- **Theming:** User-selectable dark/light mode with preference persistence in the browser's `localStorage`.
- **Comprehensive Test Suite:** Includes unit and integration tests built with Vitest and React Testing Library to ensure component reliability and functionality.

## Tech Stack

- **Frontend:** React.js, React Router
- **Styling:** Tailwind CSS
- **Build Tool / Dev Environment:** Vite
- **Testing:** Vitest, React Testing Library, JSDOM, User Event
- **HTTP Client:** Axios

## Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

- Git
- Node.js (v18.x or newer)
- npm (v9.x or newer)

### Configuration & Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/jessicaccp/country-explorer.git
    cd country-explorer
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables:
    Rename the `.env.local.example` file to `.env.local`. The default values provided are sufficient to run the application.

    ```bash
    # On macOS / Linux
    mv .env.local.example .env.local

    # On Windows (Command Prompt)
    rename .env.local.example .env.local
    ```

### Running the Application

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:5173`.

## Running Tests

To run the complete test suite, execute the following command:

```bash
npm run test
```

## License

This project is distributed under the MIT License. See the `LICENSE` file for more information.
