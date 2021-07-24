import { prettify } from '../mod.ts'
import type { Event, EventType } from '../mod.ts'
import type { Context } from 'https://deno.land/x/abc@v1.3.3/mod.ts'

export type RemoveEventData = {
  options: Deno.RemoveOptions
  path: string
}

export async function main (c: Context) {
  const params = new URLSearchParams(c.url.searchParams)
  const options: Deno.RemoveOptions = JSON.parse(params.get('options') || '{}')
  const path = params.get('path') || ':'
  const pretty = params.get('pretty') || '0'
  const type: EventType = 'remove'
  if (path === ':') {
    const event = {
      message: 'path is not specified',
      result: 1,
      type,
    }
    return prettify(event, pretty)
  }
  await Deno.remove(path, options)
  const removeEventData: RemoveEventData = {
    options,
    path,
  }
  const event: Event = {
    data: JSON.stringify(removeEventData),
    result: 0,
    type,
  }
  return prettify(event, pretty)
}
