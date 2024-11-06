'use server'
import { prisma } from "../prisma"

export const getAllPost = async() => {
    try {
        const posts = await prisma.post.findMany({})
        return posts
    } catch (error) {
        console.log("Error getting post " + error)
    }
}