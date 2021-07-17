import { init } from './src/init.js'
import { serverOpts } from './config.js'
import getPort from 'get-port'

export async function boot(config) {
  const resolvedPort = await getPort({ port: [config.port, ...getPort.makeRange(8081, 9000)] })
  const server = await init(config)
  const address = await server.listen(resolvedPort, config.host)
  // TODO log this out
  console.log("SERVER:", address)
}
