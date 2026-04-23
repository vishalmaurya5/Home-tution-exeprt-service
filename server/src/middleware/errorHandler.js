// server/middleware/errorHandler.js

export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (err, req, res, _next) => {
  // Always log the full error server-side so you can see it in your terminal
  console.error("─────────────────────────────────────");
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.error("Error:", err.message);
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }
  console.error("─────────────────────────────────────");

  const statusCode = err.statusCode || err.status || (res.statusCode !== 200 ? res.statusCode : 500);

  // Mongoose validation error → 400
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  // Mongoose duplicate key → 409
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(409).json({ message: `${field} already exists` });
  }

  // JWT errors → 401
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
  }

  // Multer errors (file upload)
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "File is too large." });
  }

  // Generic fallback
  return res.status(statusCode).json({
    message: err.message || "Something went wrong",
    // Only expose stack trace in development
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};