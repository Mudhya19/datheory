# Portfolio API Documentation

## Base URL

`http://127.0.0.1:8000/api`

## Authentication

This API uses Laravel Sanctum for authentication. For protected endpoints, include the Authorization header:

```
Authorization: Bearer {token}
```

## Endpoints

### Public Endpoints

#### GET /profile

Get profile information

**Response:**

```json
{
    "id": 1,
    "full_name": "Datheory",
    "name": "Datheory",
    "title": "Data Science & Machine Learning Enthusiast",
    "bio": "Saya fokus membangun dasar data analysis dan machine learning melalui project studi case sampai use case.",
    "location": "Indonesia",
    "avatar_url": "https://via.placeholder.com/150",
    "avatar": "https://via.placeholder.com/150",
    "social_links": {
        "github": "https://github.com/username",
        "linkedin": "https://linkedin.com/in/username",
        "twitter": "https://twitter.com/username"
    },
    "contact": {
        "email": "email@domain.com",
        "phone": "08xxxxxxxx"
    },
    "links": {
        "website": "https://github.com/username"
    },
    "created_at": "2025-12-19T01:09:30.000000Z",
    "updated_at": "2025-12-19T01:09:30.000000Z"
}
```

#### GET /projects

Get all published projects

**Response:**

```json
[
    {
        "id": 1,
        "title": "Customer Churn Prediction",
        "slug": "customer-churn-prediction",
        "short_description": "Predict customer churn using machine learning",
        "description": "Project ini bertujuan memprediksi pelanggan yang berpotensi berhenti...",
        "content": "Project ini bertujuan memprediksi pelanggan yang berpotensi berhenti...",
        "tech_stack": ["Python", "Pandas", "Scikit-learn"],
        "github_url": "https://github.com/username/churn-project",
        "demo_url": null,
        "thumbnail_url": "https://via.placeholder.com/600x400",
        "image_url": "https://via.placeholder.com/600x400",
        "is_published": true,
        "metadata": {
            "problem_statement": "Memprediksi churn pelanggan",
            "dataset_size": "100 rows",
            "accuracy": "85%"
        },
        "links": {
            "github": "https://github.com/username/churn-project",
            "demo": null
        },
        "created_at": "2025-12-19T01:09:30.0000Z",
        "updated_at": "2025-12-19T01:09:30.000000Z"
    }
]
```

#### GET /projects/{slug}

Get a specific project by slug

**Response:**
Same as single project in the projects list.

#### GET /skills

Get all skills

**Response:**

```json
[
    {
        "id": 1,
        "name": "Python",
        "category": "Programming",
        "level": "advanced",
        "proficiency": 90,
        "icon_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "created_at": "2025-12-19T01:09:30.0000Z",
        "updated_at": "2025-12-19T01:09:30.000000Z"
    }
]
```

### Authentication Endpoints

#### POST /login

Login to get API token

**Request:**

```json
{
    "email": "admin@portfolio.test",
    "password": "password123"
}
```

**Response:**

```json
{
    "token": "1|abc123...",
    "user": {
        "id": 1,
        "name": "Admin",
        "email": "admin@portfolio.test",
        "email_verified_at": null,
        "created_at": "2025-12-19T01:09:30.000000Z",
        "updated_at": "2025-12-19T01:09:30.000000Z"
    }
}
```

#### POST /logout

Logout and invalidate token

**Headers:**

```
Authorization: Bearer {token}
```

**Response:**

```json
{
    "message": "Logged out"
}
```

### Protected Endpoints (Admin)

#### POST /projects

Create a new project

**Headers:**

```
Authorization: Bearer {token}
```

**Request:**

```json
{
    "title": "New Project",
    "slug": "new-project",
    "short_description": "Short description",
    "description": "Full description",
    "tech_stack": ["React", "Laravel"],
    "github_url": "https://github.com/...",
    "demo_url": "https://demo.com",
    "thumbnail_url": "https://image.com/thumbnail.jpg",
    "is_published": true,
    "metadata": {
        "problem_statement": "Problem description",
        "dataset_size": "1000 rows",
        "accuracy": "85%"
    }
}
```

**Response:**

```json
{
    "id": 2,
    "title": "New Project",
    "slug": "new-project",
    "short_description": "Short description",
    "description": "Full description",
    "content": "Full description",
    "tech_stack": ["React", "Laravel"],
    "github_url": "https://github.com/...",
    "demo_url": "https://demo.com",
    "thumbnail_url": "https://image.com/thumbnail.jpg",
    "image_url": "https://image.com/thumbnail.jpg",
    "is_published": true,
    "metadata": {
        "problem_statement": "Problem description",
        "dataset_size": "1000 rows",
        "accuracy": "85%"
    },
    "links": {
        "github": "https://github.com/...",
        "demo": "https://demo.com"
    },
    "created_at": "2025-12-19T01:09:30.000000Z",
    "updated_at": "2025-12-19T01:09:30.000000Z"
}
```

#### PUT /projects/{id}

Update an existing project

**Headers:**

```
Authorization: Bearer {token}
```

**Request:**
Same as POST /projects but with optional fields.

#### DELETE /projects/{id}

Delete a project

**Headers:**

```
Authorization: Bearer {token}
```

**Response:**

```json
{
    "message": "Project deleted successfully"
}
```

## Error Responses

### 401 Unauthorized

```json
{
    "message": "Unauthenticated."
}
```

### 404 Not Found

```json
{
    "message": "Resource not found"
}
```

### 422 Validation Error

```json
{
    "message": "The title field is required.",
    "errors": {
        "title": ["The title field is required."]
    }
}
```
