import { Hono } from 'hono'

import { version } from '../package.json'

const app = new Hono()

app.get('/', (c) => {
  return c.json({message:'Hello Hono!'})
})

app.get('/v1/status', (c) => {
  return c.json({
    updated_at: new Date().toISOString(),
    version
  })
})

export { app }
