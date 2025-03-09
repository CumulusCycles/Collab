import { z } from "zod";
import { zfd } from "zod-form-data";

const ACCEPTED_IMAGE_TYPES = ["image/png"];

// Define a schema for a single file uploaded via Multer
const multerFile = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  destination: z.string(),
  filename: z.string(),
  path: z.string(),
  size: z.number(),
});

// Define a schema for a blog post that includes a title, content, and 2 image files
export const blogSchema = zfd.formData({
  title: z.string().min(1).max(50),
  content: z.string().min(1),
  // Validate that the files array contains exactly 2 files, and that each file is a PNG image
  files: z
    .array(multerFile)
    .min(2)
    .max(2)
    .refine((files) => {
      return files.every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.mimetype)
      );
    }),
});
