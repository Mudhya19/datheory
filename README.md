# Portfolio Web Application

## Overview

This project is a full-stack portfolio web application built to demonstrate real-world engineering practices, including API design, frontend architecture, authentication flow, and admin data management. The application features a public-facing portfolio site with an isolated admin panel for content management.

## Tech Stack

-   **Backend**: Laravel (REST API, Middleware-based admin auth, Eloquent ORM)
-   **Frontend**: React (SPA, Vite, Tailwind CSS)
-   **Database**: MySQL
-   **Authentication**: Token-based admin authentication with expiry handling
-   **Development Environment**: Laragon (Windows)

## Architecture Overview

Public users interact with a React SPA rendered via Laravel Vite integration. The application follows a hybrid approach where Laravel serves the main HTML page and API endpoints while React handles the frontend experience. Admin users access a protected admin interface that communicates with authenticated Laravel API endpoints, completely isolated from the public UI.

The architecture separates public content consumption from administrative functions, ensuring security and maintainability. API endpoints support both published content for public viewing and unpublished content for admin management.

## Features

-   **Public Project Listing**: Responsive portfolio showcase with project details
-   **Admin Dashboard**: Isolated administrative interface with full CRUD capabilities
-   **Content Management**: Create, read, update, and delete projects with publish/unpublish functionality
-   **Token-Based Authentication**: Secure admin access with token expiry handling
-   **Responsive Design**: Mobile-first approach using Tailwind CSS
-   **Safe Delete Operations**: Confirmation dialogs and loading states for defensive UX
-   **Clean State Management**: Proper error handling and empty state displays

## Admin Panel

The admin panel represents a key architectural decision in this project:

-   **Isolated Interface**: Completely separated from public UI components
-   **Protected Routes**: Middleware-based authentication ensures only authorized access
-   **Complete Auth Lifecycle**: Login, token management, and logout functionality
-   **Defensive UX**: Confirmation dialogs for destructive actions, loading indicators, and proper error messaging
-   **Role-Based Access**: Strict separation between public and administrative concerns

This isolation demonstrates understanding of security best practices and proper application architecture.

## Security Considerations

-   Admin routes protected by custom middleware
-   Token-based authentication with configurable expiry
-   Clear separation of public/admin concerns
-   Input validation on both frontend and backend
-   CSRF protection through Laravel's built-in mechanisms

## Development Setup

1. Clone the repository
2. Install PHP dependencies: `composer install`
3. Install Node.js dependencies: `npm install`
4. Configure environment variables in `.env`
5. Run database migrations: `php artisan migrate`
6. Seed initial data: `php artisan db:seed`
7. Start development servers:
    - Backend: `php artisan serve`
    - Frontend: `npm run dev`

Access the application at `http://127.0.0.1:8000`

## Engineering Decisions

### Admin Interface Separation

The admin panel is completely isolated from the public UI to maintain security boundaries and demonstrate proper architectural separation of concerns. This approach prevents potential security vulnerabilities and makes the codebase more maintainable.

### Token-Based Authentication

For a portfolio application, token-based authentication provides a clean, stateless approach that works well with API-driven architectures. This choice demonstrates understanding of modern authentication patterns without over-engineering for a simple portfolio.

### Laravel + React Integration

Rather than building a completely decoupled frontend, this project uses Laravel's Vite integration to serve React assets. This approach maintains the benefits of a modern JavaScript frontend while keeping deployment simple and leveraging Laravel's routing and middleware capabilities.

### Hybrid Architecture

The application combines server-side rendering for the initial HTML with client-side React rendering for dynamic interactions. This provides good SEO for the portfolio content while maintaining a responsive user experience.

### Defensive User Experience

The admin interface implements defensive UX patterns including confirmation dialogs for destructive actions, loading states, and proper error handling. These patterns demonstrate attention to real-world usability concerns.
