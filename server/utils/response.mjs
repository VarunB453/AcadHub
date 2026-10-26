export function send(res, status, body = null) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization",
    "Access-Control-Allow-Methods":
      "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-store",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
  };
  const allowedOrigin = process.env.CLIENT_ORIGIN ||
    (process.env.NODE_ENV === "production" ? null : "*");
  if (allowedOrigin) {
    headers["Access-Control-Allow-Origin"] = allowedOrigin;
  }

  res.writeHead(status, headers);

  res.end(
    body === null
      ? ""
      : JSON.stringify(body)
  );
}

export function sendError(
  res,
  status,
  message
) {
  send(res, status, {
    error: message,
  });
}

export async function parseBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  return JSON.parse(
    Buffer.concat(chunks).toString("utf8")
  );
}