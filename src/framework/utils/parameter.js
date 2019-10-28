export function getArgment (x) {
  if (!x) {
    return {}
  }
  const str = x.split('&')
  const obj = {}
  str.length > 0 && str.map((item) => {
    const data = item.replace(/\?/g, '').split('=')
    obj[data[0]] = data[1]
  })
  return obj
}

export function getPath (x) {
  let path = ''
  if (!x) {
    return ''
  }
  path = x.replace('#', '').split('?')[0]
  return path
}
