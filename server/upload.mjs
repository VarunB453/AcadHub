import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

/* =========================================
   CREATE UPLOADS DIRECTORY
========================================= */
const uploadDir = path.resolve(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
/* =========================================
   STORAGE CONFIGURATION
========================================= */
const storage = multer.diskStorage({
  destination: (
    req,
    file,
    cb
  ) => {
    cb(null, uploadDir);
  },

  filename: (
    req,
    file,
    cb
  ) => {
    const extensions = {
      "image/png": ".png",
      "image/jpeg": ".jpg",
      "image/jpg": ".jpg",
      "application/pdf": ".pdf",
    };

    cb(null, `${randomUUID()}${extensions[file.mimetype]}`);
  },
});

/* =========================================
   FILE FILTER
========================================= */
const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only images and PDFs are allowed."
      )
    );
  }
};

/* =========================================
   MULTER INSTANCE
========================================= */
const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize:
      5 * 1024 * 1024,
  },
});

export default upload;