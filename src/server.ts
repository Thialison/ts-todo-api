import App from './app'
import log from '@utils/logger'

export async function serverUp(port?: number): Promise<void> {
  const app = new App()
  await app.init()
  app.server.listen(port)
  log.info(`server running at http://localhost:${port}`)
}

serverUp(3333).catch(err => {
  throw err
})
