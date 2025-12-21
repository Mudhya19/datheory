# Deployment Guide for Portfolio Application

This document provides instructions for deploying the Laravel + React portfolio application.

## Prerequisites

-   Web server (Apache/Nginx)
-   PHP 8.1+ with extensions: `curl`, `gd`, `json`, `mbstring`, `openssl`, `pdo`, `tokenizer`, `xml`
-   MySQL 8.0+ or PostgreSQL 10+
-   Node.js 16+ and npm 8+
-   Composer

## Environment Configuration

### Backend (Laravel)

1. Copy the `.env.example` file to `.env`:

    ```bash
    cp .env.example .env
    ```

2. Generate the application key:

    ```bash
    php artisan key:generate
    ```

3. Configure your database connection in `.env`:

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    ```

4. Set the application URL:

    ```env
    APP_URL=https://your-domain.com
    ```

5. Configure Sanctum for frontend integration:
    ```env
    SANCTUM_STATEFUL_DOMAINS=your-frontend-domain.com
    SESSION_DOMAIN=.your-domain.com
    ```

### Frontend (React)

1. In the `frontend/` directory, create a `.env.production` file:
    ```env
    VITE_API_BASE_URL=https://your-backend-domain.com/api
    ```

## Installation Steps

### Backend Setup

1. Install PHP dependencies:

    ```bash
    composer install --optimize-autoloader --no-dev
    ```

2. Run database migrations:

    ```bash
    php artisan migrate --force
    ```

3. Seed the database (if needed):

    ```bash
    php artisan db:seed
    ```

4. Create storage link:

    ```bash
    php artisan storage:link
    ```

5. Clear caches:
    ```bash
    php artisan config:clear
    php artisan cache:clear
    php artisan route:clear
    php artisan view:clear
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install --production
    ```

3. Build the frontend:
    ```bash
    npm run build
    ```

## Web Server Configuration

### Apache (.htaccess)

Ensure the following `.htaccess` file is in your Laravel public directory:

```apache
Options -MultiViews
RewriteEngine On

# Redirect HTTP to HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle Authorization Header
RewriteCond %{HTTP:Authorization} .
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

# Redirect Trailing Slashes If Not A Folder...
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_REDIRECT_URL} (.+)/$
RewriteRule ^ %1 [L,R=301]

# Send Requests To Front Controller...
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [L]
```

### Nginx

For Nginx, use this configuration:

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name your-domain.com;
    root /path/to/your/laravel/public;
    index index.php;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    charset utf-8;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https://your-api-domain.com;" always;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_param HTTP_AUTHORIZATION $http_authorization;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

## API Configuration

The application uses Laravel Sanctum for API authentication. Ensure the following:

1. Sanctum middleware is properly configured in `app/Http/Kernel.php`
2. CORS settings allow your frontend domain
3. Session configuration supports cross-origin requests

## Frontend Integration

After building the frontend, place the contents of the `frontend/dist` directory in your web-accessible location or serve it separately.

## SSL Certificate

Install and configure SSL certificates for secure communication between frontend and backend.

## Performance Optimization

1. Enable OPcache in PHP configuration
2. Use Redis for caching (configure in `.env`)
3. Optimize images and assets
4. Enable Gzip compression on your web server

## Security Considerations

1. Keep all dependencies updated
2. Regularly rotate the application key
3. Use strong passwords for database and admin accounts
4. Implement rate limiting for API endpoints
5. Regularly backup your database

## Maintenance Tasks

Set up cron jobs for regular maintenance:

```bash
# Log rotation and cleanup
0 0 * * * find /path/to/storage/logs -name "*.log" -exec truncate -s 0 {} \;

# Weekly backup script
0 2 * * 0 /path/to/backup-script.sh
```

## Troubleshooting

### Common Issues

1. **API calls returning 401**: Check Sanctum configuration and ensure frontend domain is in `SANCTUM_STATEFUL_DOMAINS`
2. **Database connection errors**: Verify database credentials and permissions
3. **Asset loading issues**: Check if `php artisan storage:link` was run and permissions are correct

### Debugging

Enable debug mode temporarily by setting `APP_DEBUG=true` in `.env`, but remember to disable it in production.

## Rollback Plan

In case of deployment issues:

1. Maintain a backup of the previous working version
2. Revert database changes if necessary using rollback commands
3. Restore previous configuration files
4. Restart services after changes
