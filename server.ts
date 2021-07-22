import { Application } from 'https://deno.land/x/abc@v1.3.3/mod.ts'
import { logger } from 'https://deno.land/x/abc@v1.3.3/middleware/logger.ts'
const app = new Application()
const port = (arg => isNaN(arg) ? 8080 : arg)(parseInt(Deno.args[0]))
console.log(`https://localhost:${port}/`)
app
  .use(logger())
  .get('/cat', async c => (await import('./routes/read-text-file.ts')).main(c)) // alias for read-text-file
  .get('/dir', async c => (await import('./routes/read-dir.ts')).main(c)) // alias for read-dir
  .get('/ls', async c => (await import('./routes/read-dir.ts')).main(c)) // alias for read-dir
  .get('/mkdir', async c => (await import('./routes/mkdir.ts')).main(c))
  .get('/move', async c => (await import('./routes/rename.ts')).main(c)) // alias for rename
  .get('/mv', async c => (await import('./routes/rename.ts')).main(c)) // alias for rename
  .get('/read', async c => (await import('./routes/read-text-file.ts')).main(c)) // alias for read-text-file
  .get('/read-dir', async c => (await import('./routes/read-dir.ts')).main(c))
  .get('/read-text-file', async c => (await import('./routes/read-text-file.ts')).main(c))
  .get('/remove', async c => (await import('./routes/remove.ts')).main(c))
  .get('/rename', async c => (await import('./routes/rename.ts')).main(c))
  .get('/rm', async c => (await import('./routes/remove.ts')).main(c)) // alias for remove
  .get('/write', async c => (await import('./routes/write-text-file.ts')).main(c)) // alias for write-text-file
  .get('/write-text-file', async c => (await import('./routes/write-text-file.ts')).main(c))
  .start({
    port,
  })
