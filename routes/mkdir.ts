import type { Context } from '../deps.ts'
import { prettify } from '../mod.ts'
import type { Event, EventType } from '../mod.ts'

export type MkdirEventData = {
  options: Deno.MkdirOptions
  path: string
}

export async function main (c: Context) {
  const params = new URLSearchParams(c.url.searchParams)
  const options: Deno.MkdirOptions = JSON.parse(params.get('options') || '{}')
  const path = params.get('path') || ':'
  const pretty = params.get('pretty') || '0'
  const type: EventType = 'mkdir'
  if (path === ':') {
    const event = {
      message: 'path is not specified',
      result: 1,
      type,
    }
    return prettify(event, pretty)
  }
  await Deno.mkdir(path, options)
  const mkdirEventData: MkdirEventData = {
    options,
    path,
  }
  const event: Event = {
    data: JSON.stringify(mkdirEventData),
    result: 0,
    type,
  }
  return prettify(event, pretty)
}
