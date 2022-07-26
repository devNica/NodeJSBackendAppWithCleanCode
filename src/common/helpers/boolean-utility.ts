export function isNull (obj: any): boolean {
  if (obj !== null) return false
  else return true
}

export function parseBoolean (value: string): boolean {
  if (value === 'false') return false
  return true
}
