# Quick Start Guide (Fallback Mode)

Since Java and Maven are not available in the current environment, I have set up a **Node.js-based Mock Backend** to allow you to run and test the application immediately.

## 🚀 Running the App

### 1. Frontend (Running)
The frontend has been initialized and started. It should be running at:
- **URL**: [http://localhost:5173](http://localhost:5173)

### 2. Backend (Running)
I have started a lightweight Node.js server that mocks the API endpoints.
- **URL**: [http://localhost:8080](http://localhost:8080)
- **Status**: Active

## ⚠️ Limitations
- This is a **Mock Backend**. It does not execute real Docker containers or advanced AI analysis.
- Data is stored in memory and will be reset on restart.
- Use it to verify the **Frontend UI** and **User Flow**.

## 🔧 To Run Real Backend (Java)
To function as a fully operational system with Docker and AI:
1. Install **Java JDK 17+** and **Maven**.
2. Run the Spring Boot app: `mvn spring-boot:run`.
3. Ensure **Docker Desktop** is running.
