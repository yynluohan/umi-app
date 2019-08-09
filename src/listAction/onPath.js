
export default function onPath({ options, record }) {

  const { path, query = { id: 'id' } } = options;


  let queryData = {};
  if (options.queryData) {
    queryData = options.queryData(x => x);
  }
  if (Object.keys(queryData).length > 0) {
    for (let key in queryData) {
      queryData[key] = record[key]
    }
  }

  // const data = {};
  // Object.keys(query).forEach(key => {
  //   data[key] = record[key] || query[key];
  // });
  //
  // let str = '';
  // if (Object.keys(data).length > 0) {
  //   for (let i in data) {
  //     if (Object.keys(data.length === 1)) {
  //       str += `${i}=${data[i]}`
  //     } else {
  //       str += `$${i}=${data[i]}`
  //     }
  //   }
  // }

  let str = '';
  if (Object.keys(queryData).length > 0) {
    Object.keys(queryData).map((item,index) => {
      if (index === 0) {
        str += '?' + `${item}=${queryData[item]}`
      } else {
        str += '&' + `${item}=${queryData[item]}`
      }
    })
  }

  // str = str ? `?${str}` : ''

  window.location.href = '#' +  path +  str
}
