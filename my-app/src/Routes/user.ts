
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signupSchema } from '@kaif-siddiqui/common'
import { signinSchema } from '@kaif-siddiqui/common'

type Variables = {
    userId: string,
}

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: Variables
}>()


userRouter.post('/signup', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate())

        const body = await c.req.json()

        const { success } = signupSchema.safeParse(body)

        if (!success) {
            c.status(400)
            return c.json({ error: "invalid inputs" })
        }

        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: body.password
            }
        })

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({ id: user.id, name: user.name, email: user.email, authToken: jwt })

    } catch (err) {
        c.status(500)
        return c.json({ error: err })
    }
})

userRouter.post('/signin', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate())

        const body = await c.req.json()

        const { success } = signinSchema.safeParse(body)

        if (!success) {
            c.status(400)
            return c.json({ error: "invalid inputs" })
        }

        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password
            }
        })

        if (!user) {
            c.status(404)
            return c.json({ message: "invalid credentials" })
        }

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({ id: user.id, name: user.name, email: user.email, authToken: jwt })
    } catch (err) {
        c.status(500)
        return c.json({ error: err })
    }
})

