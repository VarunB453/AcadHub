export function errorHandler(error, req, res, next) {
  const status = error.statusCode || 500;
  const message = error.message || "Internal server error";

  console.error("[AcadHub]", {
    method: req.method,
    url: req.url,
    status,
    message,
  });

  if (res.headersSent) {
    return next(error);
  }

  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      success: false,
      error: message,
    })
  );
}
