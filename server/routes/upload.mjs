import upload from "../upload.mjs";

import {
  send,
  sendError,
} from "../utils/response.mjs";

import {
  PORT,
} from "../config/env.mjs";
import { getAuthUser } from "../middleware/authMiddleware.mjs";

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
        err.message
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
      fileUrl: `http://127.0.0.1:${PORT}/uploads/${req.file.filename}`,
    });
  });
}