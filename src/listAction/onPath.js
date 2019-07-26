
export default function onPath({ options, record }) {
  const { path, query = { id: 'id' } } = options;
  const data = {};
  Object.keys(query).forEach(key => {
    data[key] = record[key] || query[key];
  });

  let str = '';
  if (Object.keys(data).length > 0) {
    for (let i in data) {
      if (Object.keys(data.length === 1)) {
        str += `${i}=${data[i]}`
      } else {
        str += `$${i}=${data[i]}`
      }
    }
  }

  str = str ? `?${str}` : ''

  window.location.href = '#' +  path +  str
}
