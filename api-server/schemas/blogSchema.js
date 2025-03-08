import { z } from "zod";
import { zfd } from "zod-form-data";

const ACCEPTED_IMAGE_TYPES = ["image/png"];

export const blogSchema = zfd.formData({
  title: z.string(),
  content: z.string(),
  files: z.array(z.instanceof(File)).refine((files) => {
    return files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
  }),
});
