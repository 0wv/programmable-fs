import { prettify } from '../mod.ts'
import type { Event, EventType } from '../mod.ts'
import type { Context } from 'https://deno.land/x/abc@v1.3.3/mod.ts'

export type ReadTextFileEventData = {
  data: string
  options: Deno.ReadFileOptions
  path: string
}

export async function main (c: Context) {
  const params = new URLSearchParams(c.url.searchParams)
  const options: Deno.ReadFileOptions = JSON.parse(params.get('options') || '{}')
  const path = params.get('path') || ':'
  const pretty = params.get('pretty') || '0'
  const type: EventType = 'read-text-file'
  if (path === ':') {
    const event: Event = {
      message: 'path is not specified',
      result: 1,
      type,
    }
    return prettify(event, pretty)
  }
  const readTextFileEventData: ReadTextFileEventData = {
    data: await Deno.readTextFile(path, options),
    options,
    path,
  }
  const event: Event = {
    data: JSON.stringify(readTextFileEventData),
    result: 0,
    type,
  }
  return prettify(event, pretty)
}
