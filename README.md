
<h1 align="center"> AcadHub</h1>

<h3 align="center">Your Campus. Connected. Smarter. Better.</h3>


<p align="center">
  <strong>An AI-Enabled Campus Management System</strong>
  <br />
  Bringing students, faculty, and administrators together through one unified digital campus.
</p>

<p align="center">
  <a href="https://github.com/VarunB453/AcadHub">
    <img src="https://img.shields.io/badge/Project-AcadHub-6366F1?style=for-the-badge&logo=github&logoColor=white" alt="AcadHub Repository" />
  </a>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-ES_Modules-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

<p align="center">
  <a href="#-about-acadhub">About</a> •
  <a href="#-features">Features</a> •
  <a href="#-technology-stack">Tech Stack</a> •
  <a href="#-getting-started">Get Started</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 🌟 About AcadHub

**AcadHub** is a modern campus management platform designed to simplify academic administration and improve collaboration across an educational institution.

From attendance tracking and assignment management to campus announcements, events, and AI-assisted interactions, AcadHub brings essential academic workflows into a centralized digital environment.

The goal is simple: **less administrative complexity, better access to information, and a more connected campus experience.**

### 💡 Why AcadHub?

- 🎓 **Student-Centric:** Access essential academic information and campus services from one place.
- 👨‍🏫 **Faculty-Friendly:** Simplify attendance, assignments, student management, and announcements.
- 🏛️ **Administration-Ready:** Organize academic records, registrations, departments, and campus operations.
- 🤖 **AI-Enabled:** Support intelligent campus interactions through AI-oriented functionality.
- 🔐 **Security-Conscious:** Use authentication and role-based access patterns to separate user responsibilities.
- 📊 **Data-Informed:** Present academic information through dashboards, reports, and analytics-oriented interfaces.

---

## ✨ Features at a Glance

| Module | Capabilities |
|---|---|
| 🎓 Student Portal | Dashboard, attendance, assignments, events, notices, complaints, and profile management |
| 👨‍🏫 Faculty Portal | Attendance management, assignments, student management, events, and notices |
| 🏛️ Admin Portal | Student and faculty administration, courses, departments, registrations, and system management |
| 📊 Analytics | Dashboard insights, attendance analytics, and reporting interfaces |
| 📢 Campus Communication | Notice board, events, and notifications |
| 🤖 AI Assistance | AI chat assistant and campus-oriented queries |
| 🔐 Authentication | Login, role-based access, registration approval, and password-related workflows |
| ⚙️ Account Settings | Profile management and security settings |

### 🎓 Student Experience

A centralized workspace for everyday academic activities.

- View the student dashboard.
- Track attendance.
- Access and submit assignments.
- Read campus notices.
- Explore events.
- Submit complaints.
- Interact with the AI assistant.
- Review profile information and notifications.

### 👨‍🏫 Faculty Workspace

Tools designed to support teaching and academic coordination.

- Manage attendance records.
- Create and manage assignments.
- Access student information.
- Publish notices.
- Manage academic events.
- Review dashboard information and analytics.
- Maintain profile and account settings.

### 🏛️ Administration Console

A unified interface for institutional operations.

- Manage students and faculty.
- Organize courses and departments.
- Review registration requests.
- Monitor attendance analytics.
- Resolve complaints.
- Manage notices and events.
- Access reports and system information.
- Configure administrative settings.

---

## 🤖 AI-Powered Campus Assistance

AcadHub incorporates AI-oriented functionality to make campus information more accessible.

Potential use cases include:

- 💬 **Conversational Assistance:** Ask campus-related questions through an AI chat interface.
- 🧠 **Information Discovery:** Make academic and campus information easier to navigate.
- 📊 **Intelligent Insights:** Support the interpretation of academic information through analytics-oriented experiences.
- 🚀 **Future Intelligence:** Extend the platform with predictive analytics and automated academic workflows.

AI functionality may require an appropriately configured provider API key. Availability depends on the implemented integration and its configuration.

---

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| ⚛️ React 18 | Component-based user interface |
| 📘 TypeScript | Type-safe application development |
| ⚡ Vite | Development server and build tooling |
| 🎨 Tailwind CSS 3 | Utility-first styling |
| 🧩 shadcn/ui and Radix UI | Interface components and accessible primitives |
| 🧭 React Router | Client-side navigation |
| 📡 TanStack Query | Server-state and data-fetching utilities |
| 📈 Recharts | Data visualization |
| ✨ Framer Motion | Interface animations |
| 🎯 Lucide React | Icons |

### Backend

| Technology | Purpose |
|---|---|
| 🟢 Node.js | JavaScript runtime |
| 🚂 Express.js | Backend HTTP and API infrastructure |
| 🍃 MongoDB | Document-oriented database |
| 🔑 JWT-based authentication | Token-based authentication where implemented |
| 🔒 bcrypt | Password hashing where implemented |
| 📁 Multer | Multipart file-upload handling |

### Development and Testing

- **Vite:** Frontend development and production builds.
- **ESLint:** Static code-quality checks.
- **Vitest:** Test execution.
- **Playwright:** Browser automation and end-to-end testing infrastructure.
- **Docker:** Client and server container definitions are included in the repository.
- **GitHub Actions:** Workflow configuration is included in `.github/workflows`.

---

## 🏗️ Project Architecture

AcadHub separates its frontend, backend, documentation, and testing resources.

```text
AcadHub/
│
├── .github/
│   └── workflows/           # CI workflow configuration
│
├── client/                  # Frontend application
│
├── server/                  # Backend application
│   ├── index.mjs            # Backend entry point
│   └── start-dev.mjs        # Development process launcher
│
├── docs/                    # Project documentation
├── tests/                   # Test resources
│
├── .env.example             # Environment variable template
├── Dockerfile.client        # Client container definition
├── Dockerfile.server        # Server container definition
├── docker-compose.yml       # Multi-service configuration
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── vitest.config.ts         # Vitest configuration
└── README.md                # Project documentation
```

*Note: This is a simplified overview. Refer to the repository for the complete directory structure.*

---

## 🚀 Getting Started

Follow these steps to run AcadHub locally.

### Prerequisites

Install the following tools before starting:

- [Node.js](https://nodejs.org/) — a compatible modern release.
- npm — included with Node.js.
- [MongoDB](https://www.mongodb.com/) — a local instance or a MongoDB Atlas connection.
- [Git](https://git-scm.com/) — for cloning the repository.

### 1. Clone the Repository

```bash
git clone https://github.com/VarunB453/AcadHub.git
cd AcadHub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create your local environment file by copying the provided template.

**macOS / Linux / Git Bash**

```bash
cp .env.example .env
```

**Windows Command Prompt**

```cmd
copy .env.example .env
```

Open `.env` and configure the required values:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/acadhub
AUTH_SECRET=replace_with_a_strong_random_secret
API_PORT=4000
VITE_API_BASE_URL=/api
GROQ_API_KEY=your_groq_api_key
```

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `AUTH_SECRET` | Secret used by the authentication implementation |
| `API_PORT` | Backend API port |
| `VITE_API_BASE_URL` | Frontend API base path |
| `GROQ_API_KEY` | API key for the Groq integration, if required |

**Configuration notes**

- Replace all example credentials and secrets with appropriate values.
- Obtain a Groq API key from [Groq Console](https://console.groq.com/) if the AI integration requires it.
- Keep `.env` out of version control.
- Frontend variables exposed through Vite must not contain server-side secrets.

### 4. Start the Application

Run the development command:

```bash
npm run dev
```

The repository's development launcher starts the backend and frontend processes together.

The default development ports configured by the project are:

- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:4000`

Open the frontend address in your browser. Ensure MongoDB is running and the configured environment variables match the application code.

### 5. Other Useful Commands

```bash
# Start only the frontend development server
npm run frontend

# Start only the backend
npm run backend

# Build the frontend for production
npm run build

# Preview the production build
npm run preview

# Run the test suite
npm test

# Run tests in watch mode
npm run test:watch

# Check code quality
npm run lint
```

---

## 🔐 Security Considerations

AcadHub includes authentication-related functionality and server-side infrastructure. Before deploying it in a production environment, verify the following:

- 🔑 Passwords are hashed rather than stored as plaintext.
- 🛡️ Protected endpoints enforce authorization on the server.
- 👥 Role-based access checks prevent unauthorized administrative actions.
- 🔒 Authentication secrets and third-party API keys remain server-side.
- ✅ User input is validated and file uploads are restricted appropriately.
- 🌐 Production traffic uses HTTPS.
- 🗄️ Database access is restricted and backups are protected.
- 🚫 Sensitive environment files are excluded from commits.

These are security objectives and verification requirements, not a substitute for a security audit of the implementation.

---

## 📸 Screenshots and Demo

Visual examples help visitors understand the application before installing it.

Add genuine screenshots of the implemented interfaces in `docs/screenshots/`, then embed them below.

<!-- Replace the paths below with screenshots that exist in the repository. -->

### 🔐 Authentication

<!-- ![AcadHub Login](docs/screenshots/login.png) -->

### 🎓 Student Dashboard

<!-- ![Student Dashboard](docs/screenshots/student-dashboard.png) -->

### 👨‍🏫 Faculty Dashboard

<!-- ![Faculty Dashboard](docs/screenshots/faculty-dashboard.png) -->

### 🏛️ Administration Dashboard

<!-- ![Admin Dashboard](docs/screenshots/admin-dashboard.png) -->

### 📊 Attendance and Analytics

<!-- ![Attendance Analytics](docs/screenshots/attendance.png) -->

*Screenshots are intentionally left as placeholders until actual application images are added.*

---

## 🗺️ Development Roadmap

Potential enhancements for future releases include:

- [ ] 📈 Predictive attendance analytics.
- [ ] 🧠 AI-assisted academic performance insights.
- [ ] 📅 Intelligent timetable generation.
- [ ] 👨‍👩‍👧 Parent or guardian portal.
- [ ] 📱 Mobile-friendly application experience.
- [ ] 📧 Email notification integration.
- [ ] 🔔 Push notifications.
- [ ] ☁️ Production cloud deployment.
- [ ] 🐳 Improved containerized deployment and documentation.

*Roadmap items indicate possible future work and should not be interpreted as currently implemented features.*

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

### Contribution Workflow

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Commit your changes with a descriptive message.
5. Push your branch to your fork.
6. Open a pull request describing the changes.

```bash
git checkout -b feature/your-feature
git add .
git commit -m "feat: describe your change"
git push origin feature/your-feature
```

For substantial changes, open an issue first to discuss the proposed implementation.

---

## 👨‍💻 Author

**VarunB453** — Creator and Developer of AcadHub.

- GitHub: [@VarunB453](https://github.com/VarunB453)
- Project: [AcadHub](https://github.com/VarunB453/AcadHub)

---

## 🐛 Issues and Feedback

Found a bug or have an idea for improving AcadHub?

- [Report a bug or request a feature](https://github.com/VarunB453/AcadHub/issues/new)
- [Browse the repository](https://github.com/VarunB453/AcadHub)
- [Review the source code](https://github.com/VarunB453/AcadHub/tree/main)

Please include clear reproduction steps, relevant error messages, and screenshots when reporting issues.

---

## ⭐ Support the Project

If AcadHub is useful to you, consider giving the repository a star.

Your support helps increase visibility, encourages contributions, and motivates further development.

<p align="center">
  <a href="https://github.com/VarunB453/AcadHub">
    <img src="https://img.shields.io/badge/Star-AcadHub-yellow?style=for-the-badge&logo=github&logoColor=black" alt="Star AcadHub on GitHub" />
  </a>
</p>

---

<p align="center">
  <strong>🎓 AcadHub — Making Campus Life More Connected.</strong>
  <br />
  <sub>Built to bring academic workflows into one unified digital experience.</sub>
</p>
