import z from "zod"

export const signupSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    password: z.string().min(6)
})

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const createBlogSchema = z.object({
    title: z.string(),
    content: z.string(),
    thumbnail: z.string()
})

export const updateBlogSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
})

export const createCommentSchema = z.object({
    postId: z.string(),
    comment: z.string()
})

export const updateCommentSchema = z.object({
    id: z.string(),
    postId: z.string(),
    comment: z.string()
})

export type SignupType = z.infer<typeof signupSchema>
export type SigninType = z.infer<typeof signinSchema>
export type CreateBlogSchemaType = z.infer<typeof createBlogSchema>
export type UpdateBlogSchemaType = z.infer<typeof updateBlogSchema>
export type createCommentSchemaType = z.infer<typeof createCommentSchema>
export type updateCommentSchemaType = z.infer<typeof updateCommentSchema>
