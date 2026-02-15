# Virtual Software Quality Testing Environment (VSQuarters)

A full-stack web platform that allows developers to deploy software into isolated virtual environments and automatically test software quality, performance, and stability using AI-driven analysis.

## Features

- **User Roles**: Admin, Developer, Tester.
- **Project Structure**: Spring Boot (Backend) + React.js (Frontend) + MySQL (Database).
- **Virtual Environments**: Docker-based isolation for executing tests.
- **AI Agent**: Analyzes metadata, selects test strategies, and suggests improvements.
- **Reporting**: Detailed quality scores, logs, and JSON reports.

## Prerequisites

- Java 17
- Node.js & npm
- Docker Desktop (Running)
- MySQL Server

## Setup Instructions

### Backend

1. Navigate to the project root.
2. Update `src/main/resources/application.properties` with your MySQL credentials.
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend runs on `http://localhost:8080`.

### Frontend

1. Navigate to `frontend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend runs on `http://localhost:5173` (by default with Vite).

## Usage

1. Register a new user account.
2. Login to the dashboard.
3. Upload a project file (ZIP/JAR).
4. Click "Run Test" on the project list.
5. View the real-time status and generated quality report.

## AI Integration

The system uses an embedded AI logic (`AiService`) to:
1. **Plan**: Analyze project description to determine test strategy.
2. **Execute**: Run simulations (Unit tests, Integration tests, Load tests).
3. **Evaluate**: Analyze logs and generate a quality score.
4. **Improve**: Suggest specific optimizations and fixes.
