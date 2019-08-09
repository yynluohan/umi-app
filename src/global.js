// 入口文件

import BaseFormLayout from './components/layout/BaseFormLayout'
import ZEleA from 'zero-element-antd';

import { set as setEndpoint } from 'zero-element/lib/utils/request/endpoint';
// import { saveToken } from 'zero-element/lib/utils/request/token';

import { set as LASet } from 'zero-element-global/lib/listAction';
import { set as AITSet } from 'zero-element-global/lib/actionItemType';
import { set as LayoutSet } from 'zero-element-global/lib/layout';
import { set as VTSet } from 'zero-element-global/lib/valueType';

import onPath from './listAction/onPath';
import path from './listAction/path';

setEndpoint('http://192.168.3.16:8080')
// setEndpoint('https://www.muaskin.com')

// saveToken({
//   token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJvcmdJZCI6IjEiLCJ1c2VySWQiOiIxIiwiYWNjb3VudCI6ImFkbWluIiwiaWF0IjoxNTYxMTcyMzMyLCJqdGkiOiIxIiwic3ViIjoiYWRtaW4iLCJleHAiOjE1NjE0MzE1MzJ9.EwlEBQBhdzbJUTWNCjorE9ECK2WTbCejO4Q86W_ezUHoZu7cmjprRbZnYJhZTHH2_9GFphRNq1sdjBUmcqyaAQ',
// });

LASet({
  'onPath': onPath,
});

AITSet({
  path,
});

LayoutSet({
  'BaseFormLayout': BaseFormLayout
})

// const showStatus = (record) => {
//   let style =  {};
//   if (record.data.record.status) {
//     style = {
//       color: '#fff',padding:'0.3em',borderRadius:'3px',
//       backgroundColor: record.data.record.status != 'OFFSELL' ? '#428bca' : '#777',
//     }
//   }
//   return <span style={style}>
//     { record.data.record.status ? record.options.statusMap[record.data.record.status] : '' }
//   </span>
// }

const showImage = (record) => {
  return (
    <a href={record.data.record[record.field]} target="_blank">
      <img src={record.data.record[[record.field]]} alt='' style={{width: '50px'}}/>
    </a>
  )
}

const showStatus = (record) => {
  let style =  {
    color: '#fff',padding:'0.3em',borderRadius:'3px',
    backgroundColor: record.options.colorMap[record.data.record[record.field]],
  };

  return <span style={style}>
    {record.options.statusMap[record.data.record[record.field]]}
  </span>
}


VTSet({
  'showImage': (record) => record.data.record[record.field] != undefined ? showImage(record) : '',
  'showStatus': (record) => record.data.record[record.field] != undefined ? showStatus(record) : ''
})

window.localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJvcmdJZCI6IjEwMDEiLCJ1c2VySWQiOiI4NzY3MDgwODI0MzcxOTc4MjciLCJhY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE1NjUyNDk2MzAsImp0aSI6Ijg3NjcwODA4MjQzNzE5NzgyNyIsInN1YiI6ImFkbWluIiwiZXhwIjoxNTY1NTA4ODMwfQ.Y_emEyd9i6j2QJZKTQCJyV3g_hTD-K4n7cBJ3j1bL2VM4a2kdMApqPG8rYtBPBAMIi3y9Y4eXGZoZrRgFmsdEQ'
// window.localStorage.token = 'eyJsb2dpbl9uYW1lIjoiYWRtaW4iLCJpZCI6IjEiLCJ0b2tlbiI6ImIzN2Y5ODczY2JmNDkwNWNlZjMzZWE3NzllOWEwNzkwN2M1OGIwZjAifQ=='

// window.localStorage.token = 'eyJsb2dpbl9uYW1lIjoiYWRtaW4iLCJpZCI6IjEiLCJ0b2tlbiI6ImIzN2Y5ODczY2JmNDkwNWNlZjMzZWE3NzllOWEwNzkwN2M1OGIwZjAifQ=='

window.MC = {
  HASH: '',
  HOST:'http://192.168.3.16:8080',
  // HOST:'https://www.muaskin.com',
  UPLOADHOST:'http://192.168.3.28:8088',
  DATETIMEFORMAT:'YYYY/MM/DD HH:mm:ss',
  DATAFORMAT:'YYYY/MM/DD',
}
