# Architecture Overview

AcadHub follows a modular monorepo-style structure with a Vite-based client application and a Node.js server layer.

## Client
- React + TypeScript frontend
- Route-based pages for auth, dashboard, students, faculty, courses, attendance, and reports
- Shared UI components and reusable services

## Server
- Node.js HTTP API with MongoDB-backed data access
- Route handlers for auth, analytics, profile, upload, and registration management
- Middleware for authentication and authorization

## Testing
- Unit tests for client services and server routes
- Integration tests for auth and UI flows

## Deployment
- Docker Compose for local development
- GitHub Actions pipeline for CI and deploy automation
