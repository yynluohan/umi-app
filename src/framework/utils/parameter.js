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
