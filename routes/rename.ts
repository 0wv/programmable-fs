import { prettify } from '../util.ts'
import type { Context } from 'https://deno.land/x/abc@v1.3.3/mod.ts'
export async function main (c: Context) {
  const params = new URLSearchParams(c.url.searchParams)
  const newpath = params.get('newpath') || ':'
  const oldpath = params.get('oldpath') || ':'
  const pretty = params.get('pretty') || '0'
  if (newpath === ':') return prettify({
    message: 'newpath is not specified',
    result: 1,
  }, pretty)
  if (oldpath === ':') return prettify({
    message: 'oldpath is not specified',
    result: 1,
  }, pretty)
  await Deno.rename(oldpath, newpath)
  return prettify({
    result: 0,
  }, pretty)
}
