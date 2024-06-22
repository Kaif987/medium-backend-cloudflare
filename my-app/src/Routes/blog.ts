import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { updateBlogSchema, createBlogSchema } from '@kaif-siddiqui/common'

type Variables = {
    userId: string,
}

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: Variables
}>()

blogRouter.use("/*", async (c, next) => {
    const jwt = c.req.header("authorization") || ""
    if (!jwt) {
        c.status(401)
        return c.json({ error: "unauthorized" })
    }

    const token = jwt.split(" ")[1]
    const payload = await verify(token, c.env.JWT_SECRET)
    if (!payload) {
        c.status(404)
        return c.json({ error: "Your are not logged in" })
    }
    c.set("userId", payload.id as string)
    await next()
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const { success } = createBlogSchema.safeParse(body)

    if (!success) {
        c.status(400)
        return c.json({ error: "invalid inputs" })
    }

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            thumbnail: body.thumbnail,
            authorId: c.get("userId")
        }
    })

    return c.json({ id: post.id })
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const { success } = updateBlogSchema.safeParse(body)

    if (!success) {
        c.status(400)
        return c.json({ error: "invalid inputs" })
    }

    const post = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
            authorId: c.get("userId")
        }
    })

    return c.json({
        id: post.id
    })
})

// add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                thumbnail: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            posts
        })
    } catch (err) {
        c.status(411)
        return c.json({
            message: "error while fetching blog posts"
        })
    }
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const post = await prisma.post.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                thumbnail: true,
                comments: {
                    select: {
                        id: true,
                        comment: true,
                        commentator: {
                            select: {
                                name: true,
                                id: true,
                            }
                        }
                    }
                },
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            post
        })
    } catch (e) {
        c.status(411)
        return c.json({
            message: "error while fetching blog post"
        })
    }
})

