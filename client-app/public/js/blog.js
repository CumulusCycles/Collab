/**
 * Function to post a blog to the server
 * @param {FormData} formData - The FormData object containing the blog data
 * @returns {Promise} - The response from the server
 */
export default async function postBlog(formData) {
  // Log the FormData object properties to the console
  let index = 0;
  for (let [key, value] of formData.entries()) {
    // If the value is a File object, log the file name
    if (value instanceof File) {
      console.log(`Files[${index}]: ${value.name}`);
      index++;
    } else {
      console.log(`${key}: ${value}`);
    }
  }

  // Use fetch to post the FormData object to the server
  // This will automatically set the Content-Type header to multipart/form-data
  const response = await fetch("http://localhost:3001/blog", {
    method: "POST",
    body: formData,
  });
  return await response.json();
}
