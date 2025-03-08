// Simplified demo App for handling POST of FormData Object

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { logger } from "./utils/logger.js";
import blogRouter from "./routes/blogRouter.js";

const app = express();
app.use(bodyParser.json()); // User data via AJAX in JSON format, not from HTML form submission
app.use(bodyParser.urlencoded({ extended: true })); // Form Submission

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "HEAD,POST,OPTIONS",
  credentials: true,
};
// Allow the client to access the server
app.use(cors(corsOptions));

// Route for the blog
app.use("/blog", blogRouter);

// Error handling for routes
app.use((_req, res, next) => {
  res.status(404).send("Route not found");
});

// Start the API Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  logger.info(`API Server is running on http://localhost:${port}`);
});
