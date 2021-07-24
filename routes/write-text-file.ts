import type { Context } from '../deps.ts'
import { prettify } from '../mod.ts'
import type { Event, EventType } from '../mod.ts'

export type WriteTextFileEventData = {
  data: string
  options: Deno.WriteFileOptions
  path: string
}

export async function main (c: Context) {
  const params = new URLSearchParams(c.url.searchParams)
  const data = params.get('data') || ''
  const options: Deno.WriteFileOptions = JSON.parse(params.get('options') || '{}')
  const path = params.get('path') || ':'
  const pretty = params.get('pretty') || '0'
  const type: EventType = 'write-text-file'

  if (path === ':') {
    const event: Event = {
      message: 'path is not specified',
      result: 1,
      type,
    }
    return prettify(event, pretty)
  }

  await Deno.writeTextFile(path, data, options)
  const writeTextFileEventData: WriteTextFileEventData = {
    data,
    options,
    path,
  }
  const event: Event = {
    data: JSON.stringify(writeTextFileEventData),
    result: 0,
    type,
  }
  return prettify(event, pretty)
}
