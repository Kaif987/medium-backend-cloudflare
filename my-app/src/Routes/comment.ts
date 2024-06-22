import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createCommentSchema, updateCommentSchema } from '@kaif-siddiqui/common'

type Variables = {
    userId: string,
}

export const commentRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: Variables
}>()

commentRouter.use("/*", async (c, next) => {
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

// create a comment
commentRouter.post('/', async (c) => {
    const body = await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const { success } = createCommentSchema.safeParse(body)

    if (!success) {
        c.status(400)
        return c.json({ error: "invalid inputs" })
    }

    const comment = await prisma.comment.create({
        data: {
            commentatorId: c.get("userId"),
            postId: body.postId,
            comment: body.comment
        },
        select: {
            id: true,
            commentator: {
                select: {
                    name: true
                }
            }
        }
    })

    return c.json({ id: comment.id, commentator: comment.commentator.name })
})


// edit my comment
commentRouter.put('/', async (c) => {
    const body = await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const { success } = updateCommentSchema.safeParse(body)

    if (!success) {
        c.status(400)
        return c.json({ error: "invalid inputs" })
    }

    const post = await prisma.comment.update({
        where: {
            id: body.id
        },
        data: {
            commentatorId: c.get("userId"),
            postId: body.postId,
            comment: body.comment
        }
    })

    return c.json({
        msg: "Comment edited"
    })
})

// delete a comment
commentRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const id = c.req.param("id")
        const comment = await prisma.comment.delete({
            where: {
                id
            }
        })

        return c.json({
            message: "Comment deleted"
        })

    } catch (err) {
        c.status(411)
        return c.json({
            message: "error while deleting comment"
        })
    }
})

