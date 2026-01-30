async function withLock(locks, key, fn) {
  const previous = locks.get(key) || Promise.resolve()

  let release
  const current = new Promise(resolve => (release = resolve))

  locks.set(key, previous.then(() => current))

  await previous
  try {
    return await fn()
  } finally {
    release()
    if (locks.get(key) === current) {
      locks.delete(key)
    }
  }
}

module.exports = { withLock }
