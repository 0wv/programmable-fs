import { prettify } from '../util.ts'
import type { Context } from 'https://deno.land/x/abc@v1.3.3/mod.ts'
export type EntryType = 'all' | 'd' | 'dir' | 'directory' | 'f' | 'file' | 'l' | 'symlink'
export async function main (c: Context) {
  const params = new URLSearchParams(c.url.searchParams)
  const path = params.get('path') || '.'
  const pretty = params.get('pretty') || '0'
  const entryType = (
    param => (
      ['all', 'd', 'dir', 'directory', 'f', 'file', 'l', 'symlink'].includes(param)
    )
      ? param
      : 'all'
  )(params.get('entry-type') || 'all') as EntryType
  const entries = []
  for await (const entry of Deno.readDir(path)) {
    switch (entryType) {
      case 'all':
        entries.push(entry)
        break
      case 'd': // alias like `find -type`
      case 'dir': // alias for directory
      case 'directory':
        if (entry.isDirectory) entries.push(entry)
        break
      case 'f': // alias like `find -type`
      case 'file':
        if (entry.isFile) entries.push(entry)
        break
      case 'l': // alias like `find -type`
      case 'symlink':
        if (entry.isSymlink) entries.push(entry)
        break
    }
  }
  return prettify({
    entries,
    result: 0,
  }, pretty)
}
