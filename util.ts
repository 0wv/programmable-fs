// deno-lint-ignore no-explicit-any
export function prettify (json: any, pretty = '1'): string {
  return pretty !== '0'
    ? JSON.stringify(json, null, 2)
    : JSON.stringify(json)
}
