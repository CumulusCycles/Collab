# Demo App - Zod Schema Validation

This Repo is to support a question I posted on [Stack Overflow](https://stackoverflow.com/users/3144462/robertfrenette) regarding Zod Schema Validation with multiple files.

This App has an error when performing Zod Schema validation of FormData containing a multi-select HTML `file` input element (2 files attached).

![Screenshot 0](./readme_img/screenshot_0.png)

## Code

### HTML Form

```HTML
    <form id="blog-post">
      <div>
        <label for="title">Title</label>
        <input
        type="text"
        id="title"
        name="title"
        value="BWT Alpine Formula One Team"
        />
      </div>
      <br />
      <div>
        <label for="content">Content:</label>
        <textarea id="content" name="content" rows="10" cols="50">
"Alpine may be a relatively new name to Formula 1, but Renault's famous sportscar arm has plenty of motorsport heritage. The 2021 rebrand of the team marked the next step in Renault's F1 revival, begun in 2016 with the takeover of the then-Lotus squad. Already race winners in their new guise, regular podiums and a tilt at the title must be their next target."
        </textarea>
      </div>
      <br />
      <div>
        <label for="files">Upload Images:</label>
        <input type="file" id="files" name="files" multiple />
      </div>
      <br />
      <div>
        <button type="submit">Post</button>
      </div>
    </form>
```

### JavaScript

```Javascript
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

  // Use fetch to post the FormData object to the server
  // This will automatically set the Content-Type header to multipart/form-data
    const response = await fetch("http://localhost:3001/blog", {
      method: "POST",
      body: formData,
    });
    console.log(await response.json());

```

### Express Route

```Javascript
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
```

## Schema Validation Config - Success

When validating only the FormData's `title` and `content` properties, validation is successful.

### blogSchema.js

```Javascript
const ACCEPTED_IMAGE_TYPES = ["image/png"];

export const blogSchema = zfd.formData({
  title: z.string(),
  content: z.string(),
  // files: z.array(z.instanceof(File)).refine((files) => {
  //   return files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
  // }),
});

```

### Response

Note: `uuid` is generated on the server before the response is sent back to the client.

```Javascript
{
    "title": "BWT Alpine Formula One Team",
    "content": "\"Alpine may be a relatively new name to Formula 1, but Renault's famous sportscar arm has plenty of motorsport heritage. The 2021 rebrand of the team marked the next step in Renault's F1 revival, begun in 2016 with the takeover of the then-Lotus squad. Already race winners in their new guise, regular podiums and a tilt at the title must be their next target.\"\r\n          ",
    "uuid": "09ca5679-d841-42dc-8618-b20942f22159"
}
```

## Schema Validation Config - Error

When validation includes the FormData's `files` property, validation fails because `files` is `undefined`.

### blogSchema.js

```Javascript
const ACCEPTED_IMAGE_TYPES = ["image/png"];

export const blogSchema = zfd.formData({
  title: z.string(),
  content: z.string(),
  files: z.array(z.instanceof(File)).refine((files) => {
    return files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
  }),
});
```

### Response

```Javascript
[
    {
      "code": "invalid_type",
      "expected": "array",
      "received": "undefined",
      "path": [
        "files"
      ],
      "message": "Required"
    }
]
```

## To Test

### Start Client App

1. Open Terminal in the `client-app` dir
2. Execute `npm install && npm start`

### Start Api Server

1. Open Terminal in the `api-server` dir
2. Execute `npm install && npm run dev`

### Submit Blog Post

1. Launch [http://localhost:3000](http://localhost:3000) in Browser.
2. Select `alpine_car.png` and `alpine_logo.png` files from `./sample-images` folder in the `Upload Images` HTML file element.
3. Submit Blog post

#### Populated Form

![Screenshot 1](./readme_img/screenshot_1.png)

#### Error Response

![Screenshot 2](./readme_img/screenshot_2.png)

![Screenshot 3](./readme_img/screenshot_3.png)
