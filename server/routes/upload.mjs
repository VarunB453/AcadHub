import upload from "../upload.mjs";

import {
  send,
  sendError,
} from "../utils/response.mjs";

import { getAuthUser } from "../middleware/authMiddleware.mjs";
import fs from "node:fs";
import path from "node:path";
import { resolveUploadPath } from "../utils/uploadPaths.mjs";

export async function handleUpload(req, res) {
  const user = await getAuthUser(req);
  if (!user) {
    return sendError(res, 401, "Authentication required.");
  }

  upload.single("file")(req, res, (err) => {
    if (err) {
      return sendError(
        res,
        400,
        err.code === "LIMIT_FILE_SIZE"
          ? "File must be 5 MB or smaller."
          : "Only PNG, JPEG, and PDF files are allowed."
      );
    }

    if (!req.file) {
      return sendError(
        res,
        400,
        "No file uploaded."
      );
    }

    return send(res, 200, {
      fileUrl: `/api/uploads/${req.file.filename}`,
    });
  });
}

export async function handleUploadedFile(req, res, pathParts) {
  const user = await getAuthUser(req);
  if (!user) {
    return sendError(res, 401, "Authentication required.");
  }

  if (req.method !== "GET") {
    return sendError(res, 405, "Method not allowed.");
  }

  const filename = pathParts[0] || "";
  if (!/^[0-9a-f-]{36}\.(png|jpg|pdf)$/.test(filename)) {
    return sendError(res, 404, "File not found.");
  }

  const filePath = resolveUploadPath(`/uploads/${filename}`, path.resolve("uploads"));
  if (!filePath || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return sendError(res, 404, "File not found.");
  }

  const contentType = filename.endsWith(".png")
    ? "image/png"
    : filename.endsWith(".pdf")
    ? "application/pdf"
    : "image/jpeg";
  res.writeHead(200, {
    "Content-Type": contentType,
    "Content-Disposition": "attachment",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "private, no-store",
  });
  fs.createReadStream(filePath).pipe(res);
}