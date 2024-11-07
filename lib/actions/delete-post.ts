'use server'
import { del } from "@vercel/blob";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { getPostById } from "./get-post-byid";


export const deletePost = async (id: string) => {
    const data = await getPostById(id);
    if (!data) return { message: "No data found" };

    await del(data.imageUrl);
    try {
      await prisma.post.delete({
        where: { id },
      });
    } catch (error) {
        console.log("Error " + error)
      return { message: "Failed to delete data" };
    }

    revalidatePath("/");
  };