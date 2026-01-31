export function computeOffset(serverTime) {
  return serverTime - Date.now()
}

export function nowWithOffset(offset) {
  return Date.now() + offset
}
