import z from "zod";
export declare const signupSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const signinSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createBlogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    thumbnail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    thumbnail: string;
}, {
    title: string;
    content: string;
    thumbnail: string;
}>;
export declare const updateBlogSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export declare const createCommentSchema: z.ZodObject<{
    postId: z.ZodString;
    comment: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postId: string;
    comment: string;
}, {
    postId: string;
    comment: string;
}>;
export declare const updateCommentSchema: z.ZodObject<{
    id: z.ZodString;
    postId: z.ZodString;
    comment: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    postId: string;
    comment: string;
}, {
    id: string;
    postId: string;
    comment: string;
}>;
export type SignupType = z.infer<typeof signupSchema>;
export type SigninType = z.infer<typeof signinSchema>;
export type CreateBlogSchemaType = z.infer<typeof createBlogSchema>;
export type UpdateBlogSchemaType = z.infer<typeof updateBlogSchema>;
export type createCommentSchemaType = z.infer<typeof createCommentSchema>;
export type updateCommentSchemaType = z.infer<typeof updateCommentSchema>;
