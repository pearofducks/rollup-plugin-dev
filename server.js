import { init } from './src/init.js'
import getPort from 'get-port'

export async function boot(config) {
  try {
    const resolvedPort = await getPort({ port: [config.port, ...getPort.makeRange(8081, 9000)] })
    const server = await init(config)
    await server.listen(resolvedPort, config.host)
  } catch (err) {
    console.error(err)
  }
}
