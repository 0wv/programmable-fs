import { prettify } from '../util.ts'
import type { Context } from 'https://deno.land/x/abc@v1.3.3/mod.ts'
export async function main (c: Context) {
  const params = new URLSearchParams(c.url.searchParams)
  const options: Deno.RemoveOptions = JSON.parse(params.get('options') || '{}')
  const path = params.get('path') || ':'
  const pretty = params.get('pretty') || '0'
  if (path === ':') return prettify({
    message: 'path is not specified',
    result: 1,
  }, pretty)
  await Deno.remove(path, options)
  return prettify({
    result: 0,
  }, pretty)
}
