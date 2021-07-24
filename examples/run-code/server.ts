// IMPORTANT: this script requires --allow-run flag

import { exec, extname, logger } from './deps.ts'
import { ProgrammableFS } from '../../mod.ts'
import type { Event, WriteTextFileEventData } from '../../mod.ts'

const server = new ProgrammableFS()
server.onEvent = async (event: Event) => {
  switch (event.type) {
    case 'write-text-file': {
      const { path } = JSON.parse(event.data || '{ path: "" }') as WriteTextFileEventData
      const ext = extname(path)

      if (ext === '.js' || ext === '.ts') {
        await exec(`deno run "${path}"`)
      }

      break
    }
  }
}
const port = (arg => isNaN(arg) ? 8080 : arg)(parseInt(Deno.args[0]))
console.log(`https://localhost:${port}/`)
server
  .use(logger())
  .start({
    port,
  })
