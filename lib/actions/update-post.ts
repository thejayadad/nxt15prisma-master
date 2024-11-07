'use server'
import { z } from "zod";
import { put, del } from "@vercel/blob";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getPostById } from "./get-post-byid";

const EditSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  userEmail: z.string().min(1, { message: "User email is required" }),
  imageUrl: z
    .instanceof(File)
    .refine((file) => file.size < 4000000, {
      message: "Image must be less than 4MB",
    })
    .optional(), // Mark imageUrl as optional
});


export const updatePost = async (
    id: string,
    prevState: unknown,
    formData: FormData
) => {
    const validatedFields = EditSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const data = await getPostById(id);
    if (!data) return { message: "No Data Found" };

    const { title, imageUrl, userEmail } = validatedFields.data;
    let imagePath;
    if (!imageUrl || imageUrl.size <= 0) {
        imagePath = data.imageUrl;
    } else {
        await del(data.imageUrl);
        const { url } = await put(imageUrl.name, imageUrl, {
            access: "public",
            multipart: true,
        });
        imagePath = url;
    }

    try {
        await prisma.post.update({
            data: {
                title,
                imageUrl: imagePath,
                userEmail: userEmail
            },
            where: { id },
        });
    } catch (error) {
        console.log("Error " + error);
        return { message: "Failed to update data" };
    }

    revalidatePath("/");
    redirect("/");
};
