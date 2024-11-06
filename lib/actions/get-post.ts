'use server'
import { prisma } from "../prisma"

export const getAllPost = async () => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: { // Include the user information
                    select: {
                        email: true,
                        image: true // Include other user fields as needed
                    }
                }
            }
        });
        return posts;
    } catch (error) {
        console.log("Error getting post: " + error);
    }
}
