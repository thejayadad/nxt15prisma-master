'use server'
import { z } from "zod";
import { put, del } from "@vercel/blob";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


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
    const { url } = await put(imageUrl.name, imageUrl, {
      access: "public",
      multipart: true,
    });
    try {
      await prisma.post.create({
        data:{
          title, imageUrl: url, userEmail
        }
      })
    } catch (error) {
      console.log("Error " + error)
      return { message: "Failed to create data" };

    }
    revalidatePath("/");
    redirect("/");
}
