import { Hono } from 'hono'
import { userRouter } from './Routes/user'
import { blogRouter } from './Routes/blog'
import { cors } from 'hono/cors'

type Variables = {
  userId: string,
}

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: Variables
}>()

app.use("/*", cors())

// app.use("/*", (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env?.DATABASE_URL,
//   }).$extends(withAccelerate())

//   c.set("prisma", prisma)
// })

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)


export default app
