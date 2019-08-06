export function getArgment(x) {
  if (!x) {
    return {};
  }
  let str = x.split('&');
  let obj = {};
  console.log('!!!',str);
  str.length > 0 && str.map((item,index) => {
    const data = item.replace(/\?/g,'').split('=');
    obj[data[0]] = data[1]
  })
  return obj
}

export function getPath(x) {
  let path = ''
  if (!x) {
    return '';
  }
  path = x.replace('#','').split('?')[0]
  return path
}
