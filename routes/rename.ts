import type { Context } from '../deps.ts'
import { prettify } from '../mod.ts'
import type { Event, EventType } from '../mod.ts'

export type RenameEventData = {
  newpath: string
  oldpath: string
}

export async function main (c: Context) {
  const params = new URLSearchParams(c.url.searchParams)
  const newpath = params.get('newpath') || ':'
  const oldpath = params.get('oldpath') || ':'
  const pretty = params.get('pretty') || '0'
  const type: EventType = 'rename'

  if (newpath === ':') {
    const event: Event = {
      message: 'newpath is not specified',
      result: 1,
      type,
    }
    return prettify(event, pretty)
  }

  if (oldpath === ':') {
    const event: Event = {
      message: 'oldpath is not specified',
      result: 1,
      type,
    }
    return prettify(event, pretty)
  }

  await Deno.rename(oldpath, newpath)
  const renameEventData: RenameEventData = {
    newpath,
    oldpath,
  }
  const event: Event = {
    data: JSON.stringify(renameEventData),
    result: 0,
    type,
  }
  return prettify(event, pretty)
}
