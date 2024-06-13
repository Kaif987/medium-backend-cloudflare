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
    content: z.string()
})

export const updateBlogSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
})

export type SignupType = z.infer<typeof signupSchema>
export type SigninType = z.infer<typeof signinSchema>
export type CreateBlogSchemaType = z.infer<typeof createBlogSchema>
export type UpdateBlogSchemaType = z.infer<typeof updateBlogSchema>
