
# Bike Queue Management System

## Overview

The Bike Queue Management System is a user-friendly application designed to manage bike queues efficiently. This project is built using React and TypeScript, ensuring a robust and scalable solution. The application is regularly used at my current workplace by both myself and my colleagues, demonstrating its reliability and effectiveness in a real-world environment.

## Features

- **Bike Queue Management**: Easily add, remove, and reset bikes in the queue.
- **Timer Functionality**: Set a timer for each bike in the queue.
- **User-Friendly Interface**: Designed to be intuitive and easy to use, even for young users.
- **Localization**: Includes Swedish language support for confirmation dialogs.
- **Production-Ready**: Docker-native with multi-stage builds for optimal deployment.
- **CI-Safe**: Builds pass in CI environments with proper ESLint configuration.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/HampusAndersson01/BikeQueueWeb.git
    cd BikeQueueWeb
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Development

### Running Locally (Development Mode)

To start the development server with hot-reload:

```sh
npm start
```

The application will be available at `http://localhost:3000`.

**Note:** This uses `react-scripts start` which is intended for development only, not production.

### Building for Production

To create an optimized production build:

```sh
npm run build
```

This generates static files in the `build/` directory.

### Serving Production Build Locally

To test the production build locally:

```sh
npm run serve
```

This serves the production build at `http://localhost:3000` using a lightweight static server.

## Docker Deployment

### Using Docker Compose (Recommended)

The easiest way to run the application in production:

```sh
docker compose up
```

This will:
- Build the React app in a Node.js container
- Serve the static files using nginx
- Expose the application on `http://localhost:3000`

To run in detached mode:

```sh
docker compose up -d
```

To stop the application:

```sh
docker compose down
```

### Using Docker Directly

Build the image:

```sh
docker build -t bike-queue-web .
```

Run the container:

```sh
docker run -p 3000:80 bike-queue-web
```

### Production Architecture

The Dockerfile uses a **multi-stage build**:

1. **Build Stage**: Compiles the React app using Node.js
2. **Production Stage**: Serves static files using nginx (Alpine-based, ~25MB)

**Important:** The production deployment does NOT use `react-scripts start`. It serves pre-built static assets through nginx for optimal performance and security.

## Deployment Platforms

### Coolify

This repository is fully compatible with Coolify. Simply:

1. Connect your Git repository
2. Coolify will automatically detect the Dockerfile
3. The app will build and deploy correctly

### Other Platforms

The Docker setup works on any platform supporting containers:
- Railway
- Render
- DigitalOcean App Platform
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances

## CI/CD

The project includes CI-safe ESLint configuration:

- ESLint **warnings** do NOT fail builds
- ESLint **errors** will fail builds
- Unused variables prefixed with `_` are allowed
- React Hooks dependencies are properly tracked

Test the CI build locally:

```sh
npm run build:ci
```

Or with environment variable:

```sh
CI=true npm run build
```

## Usage

1. **Add Bikes**: Use the input field to add bikes to the queue.
2. **Set Timer**: Set the desired timer duration for each bike.
3. **Reset All**: Click the "Återställ Alla" button to reset the entire queue.

## User Experience

The application is designed to be so user-friendly that even 6-year-old pupils are starting to learn how to use it all on their own. This ease of use ensures that users of all ages and technical backgrounds can efficiently manage bike queues without any hassle.

## Demo

Check out the live demo [here](https://bikequeue.hampusandersson.dev).

## Project Structure

```
BikeQueueWeb/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── hooks/          # Custom React hooks
│   ├── App.tsx         # Main application component
│   ├── i18n.ts         # Internationalization
│   └── index.tsx       # Application entry point
├── .eslintrc.json      # ESLint configuration
├── Dockerfile          # Multi-stage production Dockerfile
├── docker-compose.yml  # Docker Compose configuration
└── package.json        # Dependencies and scripts

```

## Scripts

- `npm start` - Run development server (NOT for production)
- `npm run build` - Build for production
- `npm run build:ci` - Build with CI=true set
- `npm run serve` - Serve production build locally
- `npm test` - Run tests
- `docker compose up` - Run in Docker (production-ready)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.