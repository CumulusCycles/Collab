import { logger } from "../utils/logger.js";

export const validate = (schema) => (req, res, next) => {
  try {
    logger.info(JSON.stringify(req.body));

    // Validate the request body and files against the schema
    // files is an array of objects, each object representing a file uploaded via Multer
    schema.parse({ ...req.body, files: req.files });

    // If there are no errors, call the next middleware function
    next();
  } catch (err) {
    return res.status(400).send(err.errors);
  }
};
