# Base environment for Web Frontend Code Analysis - React + Vite
# This Dockerfile provides a clean Node.js environment for analyzing a React frontend project
# Supports React 18, Vite 5, and modern frontend tooling

FROM node:18-alpine

# Set working directory as required by the specification
WORKDIR /app

# Install common build tools for frontend development
RUN apk add --no-cache \
    git \
    bash

# Copy package files for dependency installation
COPY repo/package*.json ./

# Install dependencies, including devDependencies required by Vite builds.
# Prefer npm ci when a lockfile is present to keep the environment reproducible.
RUN if [ -f package-lock.json ]; then \
      npm ci --include=dev; \
    else \
      npm install --include=dev --legacy-peer-deps; \
    fi

# Copy the rest of the project files
COPY repo/. ./

# No build step - this is for analysis, not deployment
# Models will analyze the source code structure, not run the built application

# Expose port for development server (if needed for testing)
EXPOSE 3000

# Default command starts the development server
CMD ["npm", "run", "dev"]
