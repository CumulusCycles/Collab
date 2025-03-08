import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger.js";

export async function addNewBlogPost(reqBody) {
  logger.info("Successfully aded new blog post!");

  // Add a UUID to the body before returning
  reqBody.uuid = uuidv4();

  // For now, just return the request body
  return reqBody;
}
