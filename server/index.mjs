import { createServer } from "node:http";
import { handleAnalytics } from "./routes/analytics.mjs";

import {
  handleUpload,
  handleUploadedFile,
} from "./routes/upload.mjs";

import {
  PORT,
  MONGODB_URI,
  DB_NAME,
} from "./config/env.mjs";

import { getDb } from "./database/mongodb.mjs";

import {
  send,
  sendError,
} from "./utils/response.mjs";

import {
  handleAuth,
} from "./routes/auth.mjs";

import {
  handleAI,
} from "./routes/ai.mjs";

import {
  handleProfile,
} from "./routes/profile.mjs";

import {
  handleChangePassword,
} from "./routes/changePassword.mjs";

import {
  handleCollection,
} from "./routes/collections.mjs";

import {
  handleRegistrationRequests,
} from "./routes/registrationRequests.mjs";

/* =========================================
   SERVER
========================================= */

const server = createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    return send(res, 204);
  }

  try {
    const url = new URL(
      req.url || "/",
      `http://${req.headers.host || "localhost"}`
    );
    const pathParts = url.pathname
      .split("/")
      .filter(Boolean);

    /* =========================================
       FILE UPLOAD
    ========================================= */

    if (
      req.method === "POST" &&
      url.pathname === "/api/upload"
    ) {
      return await handleUpload(req, res);
    }

    if (pathParts[0] === "api" && pathParts[1] === "uploads") {
      return await handleUploadedFile(req, res, pathParts.slice(2));
    }

    /* =========================================
       HEALTH
    ========================================= */

    // if (url.pathname === "/api/health") {
    //   await getDb();

    //   return send(res, 200, {
    //     ok: true,
    //     database: DB_NAME,
    //   });
    // }
if (url.pathname === "/api/health") {
  return send(res, 200, {
    ok: true,
    name: "AcadHub Backend",
    status: "Running",
    timestamp: new Date().toISOString(),
  });
}

    /* =========================================
   ROOT ROUTE
========================================= */

if (url.pathname === "/") {
  return send(res, 200, {
    success: true,
    name: "AcadHub Backend",
    version: "1.0.0",
    status: "Running",
  });
}

/* =========================================
   ROUTES
========================================= */

if (pathParts[0] !== "api") {
  return sendError(res, 404, "Route not found.");
}

    switch (pathParts[1]) {
      case "auth":
        return handleAuth(req, res, pathParts);

      case "profile":
        return handleProfile(req, res);

      case "change-password":
        return handleChangePassword(
          req,
          res
        );

      case "registration-requests":
        return handleRegistrationRequests(
          req,
          res,
          pathParts
        );

      case "db":
        return handleCollection(
          req,
          res,
          pathParts,
          url
        );

      case "analytics":
        return handleAnalytics(
          req,
          res
        );

      case "ai":
        return handleAI(
          req,
          res
        );

      default:
        return sendError(
          res,
          404,
          "Route not found."
        );
    }

  } catch (error) {
    console.error("Request failed.");

    return sendError(
      res,
      500,
      "Internal server error."
    );
  }
});

/* =========================================
   START SERVER
========================================= */

// server.listen(PORT, () => {
//   console.log(
//     `MongoDB API server listening on http://127.0.0.1:${PORT}`
//   );

//   if (!MONGODB_URI) {
//     console.warn(
//       "MONGODB_URI is not set. Database requests will fail until it is configured."
//     );
//   }
// });

server.listen(PORT, "0.0.0.0", () => {
  console.log(
    `MongoDB API server listening on port ${PORT}`
  );

  if (!MONGODB_URI) {
    console.warn(
      "MONGODB_URI is not set. Database requests will fail until it is configured."
    );
  }
});