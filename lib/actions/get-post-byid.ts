'use server'
import { prisma } from "../prisma"

export const getPostById = async (id: string) => {
    try {
        const result = await prisma.post.findUnique({
            where: { id },
            include: {
                user: { // Include user information
                    select: {
                        email: true,
                        image: true // Include other user fields as needed
                    }
                }
            }
        });
        return result;
    } catch (error) {
        console.log("Error " + error);
        throw new Error("Failed to fetch data");
    }
};
