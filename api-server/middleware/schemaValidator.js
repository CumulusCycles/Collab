import { logger } from "../utils/logger.js";

export const validate = (schema) => (req, res, next) => {
  try {
    logger.info(JSON.stringify(req.body));

    // Validate the request body against the schema
    schema.parse(req.body);
    // schema.safeParse(req.body);

    // If there are no errors, call the next middleware function
    next();
  } catch (err) {
    return res.status(400).send(err.errors);
  }
};
