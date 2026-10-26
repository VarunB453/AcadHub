import path from "node:path";

export function resolveUploadPath(requestUrl, uploadRoot = path.resolve("uploads")) {
  const rawPath = String(requestUrl || "").split(/[?#]/, 1)[0];

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(rawPath);
  } catch {
    return null;
  }

  if (!decodedPath.startsWith("/uploads/")) {
    return null;
  }

  const root = path.resolve(uploadRoot);
  const filePath = path.resolve(root, decodedPath.slice("/uploads/".length));
  const relativePath = path.relative(root, filePath);

  if (
    !relativePath ||
    relativePath === ".." ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    return null;
  }

  return filePath;
}