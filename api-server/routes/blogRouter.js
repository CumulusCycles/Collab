import express from "express";
import multer from "multer";

import { validate } from "../middleware/schemaValidator.js";
import { blogSchema } from "../schemas/blogSchema.js";
import { addBlogPost } from "../controllers/blogController.js";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();

// Validate the blogSchema before adding a new blog post
// The validate function will return an error if the request body does not match the schema
// If there is no error, the addBlogPost function will be called
router.post("/", upload.array("files", 2), validate(blogSchema), addBlogPost);

export default router;
