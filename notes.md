
#SETUP
- homepage & css cleanup

#PRISMA, AUTHENICATION & DB SETUP
- npm i -D prisma
- npm i @prisma/client
- npx prisma init

-- AUTHJS
- docs
- schema
- Vercel
- npx prisma migrate dev
- prisma studio
- setup blob store
- npm i @vercel/blob
- npm i clsx zod

#HEADER AUTH SETUP
- fix the layout and group folder
- add header component then to layout

#CREATE POST
- create post page
- create post form
- add the form to display
- action folder
- createPost
- log the formdata to the console
- add the inputs
```
'use server'
import { z } from "zod";

const PostSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    userEmail: z.string().min(1, { message: "User email is required" }),
    imageUrl: z
      .instanceof(File)
      .refine((file) => file.size > 0, { message: "Image is required" })
      .refine((file) => file.size < 4000000, {
        message: "Image must be less than 4MB",
      }),
});

export const createPost = async (prevState: any, formData: FormData) => {
    const validatedFields = PostSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { title, userEmail, imageUrl } = validatedFields.data;

    // Handle successful post creation logic here (e.g., save to database)
    // For example:
    // await savePostToDatabase({ title, userEmail, imageUrl });

    return {
        success: true, // Indicate success, this can be handled in the form's state
    };
}

```
- show the errors | be sure toe add them to the form and test
- complete the createPost action
- add submit button


#POST CARD COMPONENT
- getall all posts action
- add to the home page
- create post card component
- update the ms config
- add the session to show edit and delete
- npm install react-icons
- test it out, log in with a different user
