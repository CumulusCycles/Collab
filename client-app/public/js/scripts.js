"use strict";

import postBlog from "./blog.js";

$(document).ready(function () {
  $("#blog-post").on("submit", async (evt) => {
    evt.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append the form data to the FormData object
    formData.append("title", $("#title").val());
    formData.append("content", $("#content").val());

    // Append the files to the FormData object
    const files = document.getElementById("files").files;
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    // Call the postBlog function, passing the FormData object
    const response = await postBlog(formData);
    console.log(response);
  });
});
