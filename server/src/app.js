import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { uploadsDir } from "./config/paths.js";
import authRoutes from "./routes/authRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";
import tuitionRoutes from "./routes/tuitionRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const clientDistPath = path.resolve(__dirname, "../../client/dist");
const clientDistPath = path.join(process.cwd(), "client", "dist");


const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(uploadsDir));

app.get("/api", (_req, res) => res.json({ message: "Home Tuition API is running" }));
app.get("/api/health", (_req, res) =>
  res.json({
    ok: true,
    service: "home-tuition-api",
    timestamp: new Date().toISOString()
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/tuitions", tuitionRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(clientDistPath));

//   app.get(/^\/(?!api|uploads).*/, (_req, res) => {
//     res.sendFile(path.join(clientDistPath, "index.html"));
//   });
// }

if (process.env.NODE_ENV === "production") {
  // Serve static files
  app.use(express.static(clientDistPath));

  // Catch-all for React Router, excluding API and Uploads
  app.get(/^\/(?!api|uploads).*/, (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"), (err) => {
      if (err) {
        // This will print the EXACT path error in your Render logs if it fails again
        console.error("Error sending index.html:", err);
        res.status(500).send(err.message);
      }
    });
  });
}

app.use(notFound);
app.use(errorHandler);

export default app;
