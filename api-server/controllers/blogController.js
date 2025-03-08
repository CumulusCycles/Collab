import { addNewBlogPost } from "../services/blogService.js";

export async function addBlogPost(req, res) {
  try {
    // Call the addNewBlogPost function from the blogService
    const result = await addNewBlogPost(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
