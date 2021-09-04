import { init } from './src/init.js'
import getPort from 'get-port'

export async function boot(config) {
  try {
    const resolvedPort = await getPort({ host: (config.host ?? '127.0.0.0'), port: [config.port, ...getPort.makeRange(8081, 9000)] })
    const server = await init(config)
    await server.listen(resolvedPort, config.host)
    if (config.onListen) config.onListen(server)
  } catch (err) {
    console.error(err)
  }
}
