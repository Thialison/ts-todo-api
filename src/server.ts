import App from './app'
import log from './utils/logger'

const initializer = async (port = 3333): Promise<void> => {
  await App.init()
  App.server.listen(port)
  log.info(`server running at http://localhost:${port}`)
}

initializer()
