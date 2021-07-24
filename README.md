# programmable file server

it is file server with user friendly api.

## getting started

```ts
import { ProgrammableFS } from './mod.ts'
import type { Event, WriteTextFileEventData } from './mod.ts'

const server = new ProgrammableFS()
server.onEvent = (event: Event) => {
  switch (event.type) {
    case 'mkdir':
      console.log('hook by mkdir')
      const path = JSON.parse(event.data || '{ path: "" }') as WriteTextFileEventData
      console.log(`path: ${path}`)
      break

    case 'remove':
    case 'write-text-file':
      console.log('remove or write')
      break

    default:
      console.log(`hook by ${event.type}`)
      break
  }
}
server.start({ port: 8080 })
```

## examples

### run JS or TS on server side

```sh
deno run \
  --allow-run \
  --allow-write \
  ./examples/run-code/server-ts
```

```sh
curl "http://localhost:8080/write?data=console.log('hello')&path=hello.js"
```

## apis

| path | description | required | aliases |
| --- | --- | --- | --- |
| `/mkdir` | [make directory](#make-directory) | `--allow-write` | (none) |
| `/read-dir` | [read directory](#read-directory) | `--allow-read`  | `/dir`, `/ls` |
| `/read-text-file` | [read text file](#read-text-file) | `--allow-read` | `/cat`, `/read` |
| `/remove` | [remove file or directory](#remove-file-or-directory) | `--allow-write` | `/rm` |
| `/rename` | [rename file or directory](#rename-file-or-directory) | `--allow-write` | `/mv`, `/read` |
| `/write-text-file` | [write text file](#write-text-file) | `--allow-write` | `/write` |

## usage

### make directory

| parameter | type | default value | description |
| --- | --- | --- | --- |
| `options` | `Deno.MkdirOptions` | `{}` | options |
| `path` | `string` | `':'` | path of directory to be made. not making directory when value is `':'` |
| `pretty` | `string` | `'0'` | if value is not `'0'` then prettify (option) |

```sh
# create remote foo directory
curl 'http://localhost:8080/mkdir?path=foo'
```

### read directory

| parameter | type | default value | description |
| --- | --- | --- | --- |
| `entry-type` | `EntryType` | `'all'` | type of entry to be output (option) |
| `path` | `string` | `'.'` | path of directory to be read |
| `pretty` | `string` | `'0'` | if value is not `'0'` then prettify (option) |

#### EntryType

| name | description | aliases |
| --- | --- | --- |
| `'directory'` | directory | `'d'`, `'dir'` |
| `'file'` | file | `'f'` |
| `'symlink'` | symbolic link | `'l'` |

```sh
# read remote directory
curl 'https://localhost:8080/read-directory'

# show files
curl 'https://localhost:8080/read-directory?entry-type=file'
```

### read text file

| parameter | type | default value | description |
| --- | --- | --- | --- |
| `options` | `Deno.ReadFileOptions` | `{}` | options |
| `path` | `string` | `':'` | path of file to be read. not reading text file when value is `':'` |
| `pretty` | `string` | `'0'` | if value is not `'0'` then prettify (option) |

```sh
# read remote foo.txt
curl 'https://localhost:8080/read-text-file?path=foo.txt'
```

### remove file or directory

| parameter | type | default value | description |
| --- | --- | --- | --- |
| `options` | `Deno.RemoveOptions` | `{}` | options |
| `path` | `string` | `':'` | path of file or directory to be removed. not removing file or directory when value is `':'` |
| `pretty` | `string` | `'0'` | if value is not `'0'` then prettify (option) |

```sh
# remove remote foo.txt
curl 'https://localhost:8080/remove?path=foo.txt'

# remove remote foo/
curl 'https://localhost:8080/remove?path=foo/'

# remove remote foo/bar/baz
curl 'https://localhost:8080/remove?path=foo/bar/baz&options=\{"recursive":true\}'
```

### rename file or directory

| parameter | type | default value | description |
| --- | --- | --- | --- |
| `newpath` | `string` | `':'` | newpath of file or directory. not renaming file or directory when value is `':'` |
| `oldpath` | `string` | `':'` | oldpath of file or directory. not renaming file or directory when value is `':'` |
| `pretty` | `string` | `'0'` | if value is not `'0'` then prettify (option) |

```sh
# rename foo.txt to hoge.txt
curl 'https://localhost:8080/remove?newpath=hoge.txt&oldpath=foo.txt'
```

### write text file

| parameter | type | default value | description |
| --- | --- | --- | --- |
| `data` | `string` | `''` | data to be written |
| `options` | `Deno.WriteFileOptions` | `{}` | options |
| `path` | `string` | `':'` | path of file or to be written. not writing file or directory when value is `':'` |
| `pretty` | `string` | `'0'` | if value is not `'0'` then prettify (option) |

```sh
# write 42 to foo.txt
curl 'https://localhost:8080/remove?data=42&path=foo.txt'

# create remote baz.txt
curl 'https://localhost:8080/remove?path=baz.txt'
```
