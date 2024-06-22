import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({message:'Hello Hono!'})
})

app.get('/v1/status', (c) => {
  return c.json({
    updated_at: new Date().toISOString(),
    version: Bun.env.npm_package_version
  })
})

export { app }
