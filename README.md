# AcadHub

**An AI-assisted campus management platform for students, faculty, and administrators.**

AcadHub brings common academic workflows into one web application, including attendance, student and faculty records, courses, notices, events, complaints, registration approvals, and analytics. It uses a React/TypeScript frontend, a Node.js API, MongoDB, and an optional Groq-powered AI assistant.

[Repository](https://github.com/VarunB453/AcadHub) · [Issues](https://github.com/VarunB453/AcadHub/issues)

## Contents

- [Features](#-features)
- [Technology stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Getting started](#-getting-started)
- [Environment variables](#-environment-variables)
- [Development commands](#-development-commands)
- [API health check](#-api-health-check)
- [Project structure](#-project-structure)
- [Testing and code quality](#-testing-and-code-quality)
- [Docker status](#-docker-status)
- [Security notes](#-security-notes)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Role-based campus workflows

- **Student experience:** dashboard, attendance, notices, events, complaints, and account settings.
- **Faculty tools:** student and course management, attendance workflows, attendance analytics, file uploads, and registration-request review.
- **Administrator tools:** faculty management, registration approvals, campus analytics, and oversight of academic records.
- **Shared modules:** authentication, role-protected pages, notices, events, complaints, settings, and dashboard views.

### AI assistant

- Chat interface backed by the Groq Chat Completions API.
- Context-aware responses for supported student, faculty, and attendance intents.
- Requires a `GROQ_API_KEY`; the rest of the application can be developed without configuring AI, but AI requests will not work.

> **Implementation note:** the backend currently marks the AI notice and event context tools as “coming soon.” Feature availability may evolve as the project develops.

### Application and data layer

- JWT-based authentication helpers and hashed passwords.
- Registration requests that remain pending until approved.
- MongoDB persistence and indexes for key records.
- File uploads handled by Multer.
- Analytics views and a JSON API.

## 🧰 Technology stack

| Area | Technologies |
| --- | --- |
| Frontend | React 18, TypeScript, Vite, React Router |
| UI and styling | Tailwind CSS, shadcn/ui components, Radix UI, Lucide icons |
| Data fetching and charts | TanStack Query, Recharts |
| Backend | Node.js 20+, native `node:http` server, JavaScript ES modules |
| Database | MongoDB with the official Node.js driver |
| Authentication and uploads | JWT helpers, password hashing, Multer |
| AI integration | Groq Chat Completions API |
| Tooling | ESLint, Vitest, Testing Library, GitHub Actions |

The API uses Node's built-in HTTP server; it does **not** use Express in the current implementation.

## ✅ Prerequisites

Install the following before starting:

- **Node.js 20 or newer** and npm.
- **MongoDB**, either running locally or available through a MongoDB connection URI.
- A **Groq API key** only if you want to use the AI assistant. Create/manage it through the [Groq Console](https://console.groq.com/).

## 🚀 Getting started

### 1. Clone the repository

```bash
git clone https://github.com/VarunB453/AcadHub.git
cd AcadHub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local `.env` file from the example:

```bash
cp .env.example .env
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Edit `.env` and set at least your MongoDB connection URI and a strong authentication secret. See [Environment variables](#-environment-variables) below.

### 4. Start MongoDB

Make sure your MongoDB instance is running and the URI in `.env` points to it. For a typical local MongoDB installation, use:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017
```

The backend uses `acadhub_management` as the default database name unless `MONGODB_DB_NAME` is set.

### 5. Start the backend and frontend

Open **two terminals** in the repository root.

**Terminal 1 — API server**

```bash
npm run backend
```

The API listens on port `4000` by default.

**Terminal 2 — frontend**

```bash
npm run frontend
```

Vite is configured to serve the frontend at [http://localhost:8080](http://localhost:8080) and proxy `/api` requests to the backend on port `4000`.

### 6. Open the app

Visit [http://localhost:8080](http://localhost:8080). The app uses role-based access, and new student/faculty registration requests require approval before the account can sign in.

## 🔐 Environment variables

The repository uses a single root `.env` file for both the frontend and backend. The server loads its variables from that file, and Vite exposes variables prefixed with `VITE_` to the frontend.

| Variable | Used by | Required? | Purpose |
| --- | --- | --- | --- |
| `MONGODB_URI` | Server | Yes for database-backed features | MongoDB connection URI. |
| `MONGODB_DB_NAME` | Server | No | Database name; defaults to `acadhub_management`. |
| `AUTH_SECRET` | Server | Yes in production | Secret used by authentication helpers. Set a random value of at least 32 bytes. Local development generates a temporary secret if unset. |
| `API_PORT` | Server | No | API port; defaults to `4000` (`PORT` takes precedence). |
| `CLIENT_ORIGIN` | Server | Required for cross-origin production deployments | Exact frontend origin allowed by the API; production requests receive no cross-origin permission when it is unset. |
| `GROQ_API_KEY` | Server | Only for server-side AI features | API key used by the backend AI endpoint. |
| `VITE_API_BASE_URL` | Client | No for the local Vite proxy setup | Frontend API base path; use `/api` for local development. |
| `VITE_GROQ_API_KEY` | Client | Only for the client-side AI assistant | API key used by the browser-side AI assistant. This value is included in the frontend bundle and is visible to users; do not use a privileged or private key here. |

Example local configuration:

```dotenv
# Server
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB_NAME=acadhub_management
AUTH_SECRET=replace-with-a-long-random-secret
API_PORT=4000
CLIENT_ORIGIN=http://localhost:8080
GROQ_API_KEY=your_groq_api_key

# Client
VITE_API_BASE_URL=/api
VITE_GROQ_API_KEY=your_groq_api_key
```

Do not commit your real `.env` file, production secrets, or API keys. The example values above are placeholders, not production credentials.

In production, `AUTH_SECRET` must be at least 32 bytes or the API will refuse to start. Set `VITE_API_BASE_URL` at frontend build time to the backend URL ending in `/api` when the frontend and API use different origins, and set the backend's `CLIENT_ORIGIN` to the exact frontend origin (scheme and host, without a trailing slash). Self-service password recovery is disabled until an email-verified recovery workflow is configured; users must contact an administrator for account recovery.

## 🧪 Development commands

| Command | Description |
| --- | --- |
| `npm run frontend` | Start the Vite development server. |
| `npm run backend` | Start the Node.js API server. |
| `npm run build` | Build the frontend for production. |
| `npm run build:dev` | Build using Vite's development mode. |
| `npm run preview` | Preview the built frontend locally. |
| `npm run lint` | Run ESLint. |
| `npm test` | Run the Vitest test suite once. |
| `npm run test:watch` | Run Vitest in watch mode. |

**Development launcher note:** `npm run dev` is intended to start both services, but the current launcher calls `npm run vite` while `package.json` defines the frontend script as `frontend`. Until that mismatch is corrected, use the two-terminal startup instructions above.

## 🩺 API health check

Once the backend is running, check its health endpoint:

```bash
curl http://localhost:4000/api/health
```

A successful response includes `ok: true`, the backend name, a running status, and a timestamp.

## 📁 Project structure

```text
AcadHub/
├── client/
│   └── src/
│       ├── components/       # Shared UI components
│       ├── contexts/         # React contexts, including auth
│       ├── integrations/     # MongoDB-facing client types/integration
│       ├── layouts/          # Application layouts
│       ├── pages/            # Route-level pages
│       └── utils/            # Frontend helpers
├── server/
│   ├── config/               # Environment configuration
│   ├── database/             # MongoDB connection and initialization
│   ├── middleware/           # API middleware/auth helpers
│   ├── routes/               # API route handlers
│   ├── services/             # Domain and AI context services
│   └── utils/                # Response and authentication helpers
├── docs/                     # Project documentation/assets
├── tests/                    # Tests
├── .env.example
├── Dockerfile.client
├── Dockerfile.server
├── docker-compose.yml
├── package.json
├── vite.config.ts
└── README.md
```

## 🧹 Testing and code quality

Run the checks from the repository root:

```bash
npm run lint
npm test
npm run build
```

GitHub Actions is configured to install dependencies, lint the project, and run tests on pushes and pull requests targeting the configured branches.

## 🐳 Docker status

The repository includes `Dockerfile.client`, `Dockerfile.server`, and `docker-compose.yml`. The current Compose settings should be aligned with the Vite configuration before relying on the Compose setup: Vite is configured for port `8080`, while Compose maps `5173:5173`, and the Compose frontend environment uses `VITE_API_URL` while the example configuration names `VITE_API_BASE_URL`. The manual workflow above is the documented local-development path.

## 🔒 Security notes

- Use a strong, unique `AUTH_SECRET` outside local development.
- Keep `.env` files and API credentials private.
- Use HTTPS and appropriately restricted network access in a deployed environment.
- Review authentication, registration approval, and password-reset flows before exposing the application publicly.

## 🤝 Contributing

Contributions and bug reports are welcome.

1. Fork the repository.
2. Create a focused branch for your change.
3. Run `npm run lint`, `npm test`, and `npm run build`.
4. Open a pull request describing the change and any relevant testing.

For bugs or feature ideas, open an [issue](https://github.com/VarunB453/AcadHub/issues).

## 📄 License

No `LICENSE` file is currently present in the repository. Add a license file to make the terms for using, modifying, and distributing the project explicit.
