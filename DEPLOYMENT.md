# Deployment Guide

## Docker Creation

You can verify the system by checking the `DockerService.java`. It utilizes `docker-java` library to interact with the Docker daemon.
Ensure Docker Desktop is running and the option "Expose daemon on tcp://localhost:2375 without TLS" is checked if you are on Windows and using TCP connection, or rely on the default socket.

## Production Deployment (Hypothetical)

1. **Build Backend**:
   ```bash
   ./mvnw clean package
   ```
   This generates a JAR file in `target/`.

2. **Build Frontend**:
   ```bash
   cd frontend
   npm run build
   ```
   This generates static files in `frontend/dist/`.

3. **Containerization**:
   Create a `Dockerfile` for the backend that also serves the frontend static files, or use Nginx to serve frontend and proxy API requests to the backend container.

   **Example Backend Dockerfile**:
   ```dockerfile
   FROM openjdk:17-jdk-alpine
   VOLUME /tmp
   COPY target/backend-0.0.1-SNAPSHOT.jar app.jar
   ENTRYPOINT ["java","-jar","/app.jar"]
   ```

4. **Orchestration**:
   Use `docker-compose.yml` to spin up MySQL, Backend, and optionally a separate Frontend container.

   ```yaml
   version: '3'
   services:
     mysqldb:
       image: mysql:8.0
       environment:
         MYSQL_ROOT_PASSWORD: root
         MYSQL_DATABASE: vsquarters
     backend:
       build: .
       ports:
         - "8080:8080"
       depends_on:
         - mysqldb
   ```
