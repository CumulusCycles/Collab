import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, "public")));

// Start the Web Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Web Server is running on port ${port}`);
});
