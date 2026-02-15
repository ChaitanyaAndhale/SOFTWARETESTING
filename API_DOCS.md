# API Documentation

Base URL: `http://localhost:8080/api`

## Authentication

### POST /auth/register
Register a new user.
```json
{
  "username": "dev1",
  "password": "password",
  "role": "DEVELOPER"
}
```

### POST /auth/login
Login and receive JWT.
```json
{
  "username": "dev1",
  "password": "password"
}
```
**Response:**
```json
{
  "jwt": "eyJhbGciOi..."
}
```

## Projects

**Headers**: `Authorization: Bearer <token>`

### POST /projects/upload
Upload a new project file.
- **Params**: `name`, `description`
- **Body**: `file` (Multipart)

### GET /projects
List all projects for the logged-in user.

### GET /projects/{id}
Get project details.

## Tests

**Headers**: `Authorization: Bearer <token>`

### POST /tests/run/{projectId}
Trigger a new test run for a project.

### GET /tests/project/{projectId}
Get all test runs for a specific project.

### GET /tests/{id}
Get details of a specific test run (including logs and report).
