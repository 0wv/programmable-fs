import { Application } from './deps.ts'
import type { Context, HTTPOptions, MiddlewareFunc } from './deps.ts'

export type Event = {
  data?: string
  message?: string
  result: number
  type: EventType
}
export type EventType = 'mkdir' | 'read-dir' | 'read-text-file' | 'remove' | 'rename' | 'write-text-file'

export class ProgrammableFS {
  #app

  constructor () {
    const wrapper = async (path: string, c: Context) => {
      const event = (await import(path)).main(c)
      this.onEvent(JSON.parse(await event))
      return event
    }
    this.#app = new Application()
    this.#app
      .get('/cat', async c => await wrapper('./routes/read-text-file.ts', c)) // alias for read-text-file
      .get('/dir', async c => await wrapper('./routes/read-dir.ts', c)) // alias for read-dir
      .get('/ls', async c => await wrapper('./routes/read-dir.ts', c)) // alias for read-dir
      .get('/mkdir', async c => await wrapper('./routes/mkdir.ts', c))
      .get('/move', async c => await wrapper('./routes/rename.ts', c)) // alias for rename
      .get('/mv', async c => await wrapper('./routes/rename.ts', c)) // alias for rename
      .get('/read', async c => await wrapper('./routes/read-text-file.ts', c)) // alias for read-text-file
      .get('/read-dir', async c => await wrapper('./routes/read-dir.ts', c))
      .get('/read-text-file', async c => await wrapper('./routes/read-text-file.ts', c))
      .get('/remove', async c => await wrapper('./routes/remove.ts', c))
      .get('/rename', async c => await wrapper('./routes/rename.ts', c))
      .get('/rm', async c => await wrapper('./routes/remove.ts', c)) // alias for remove
      .get('/write', async c => await wrapper('./routes/write-text-file.ts', c)) // alias for write-text-file
      .get('/write-text-file', async c => await wrapper('./routes/write-text-file.ts', c))
  }

  // deno-lint-ignore no-unused-vars
  onEvent (event: Event) {
    // pass
  }

  start (sc: HTTPOptions) {
    this.#app.start(sc)
  }

  use (...m: MiddlewareFunc[]) {
    this.#app.use(...m)
    return this.#app
  }
}
