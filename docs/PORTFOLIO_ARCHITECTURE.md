# Portfolio Architecture

## Overview

This is a Laravel + React portfolio application with the following architecture:

-   **Backend**: Laravel (API and HTML host)
-   **Frontend**: React + Vite + Tailwind CSS (integrated via Laravel Vite plugin)
-   **Database**: MySQL
-   **Environment**: Laragon (Windows)

## Key Integration Points

### Laravel + React Integration

-   React app entry point: `resources/js/app.jsx`
-   Blade template: `resources/views/welcome.blade.php`
-   Vite configuration: `vite.config.js`
-   Assets served via Laravel's Vite integration

### How It Works

1. Laravel serves the main HTML page (`/` route)
2. Vite serves React assets during development
3. React app mounts to `<div id="app"></div>` in the Blade template
4. Tailwind CSS is processed through Vite
5. API endpoints are available under `/api/*` routes

### Development Commands

-   `php artisan serve` - Start Laravel development server
-   `npm run dev` - Start Vite development server (assets only)
-   Access the application at `http://127.0.0.1:8000`

### Standalone Frontend Directory

The `/frontend` directory contains a separate React app that was part of the original setup but is now deprecated in favor of the Laravel-integrated approach. This directory can be removed if desired.
