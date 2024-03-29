// 入口文件

import BaseFormLayout from './common/layout/BaseFormLayout';
import LineLayout from './common/layout/LineLayout';
import ZEleA from 'zero-element-antd';

import { set as setEndpoint } from 'zero-element/lib/utils/request/endpoint';
// import { saveToken } from 'zero-element/lib/utils/request/token';

import { set as LASet } from 'zero-element-global/lib/listAction';
import { set as AITSet } from 'zero-element-global/lib/actionItemType';
import { set as LayoutSet } from 'zero-element-global/lib/layout';
import { set as VTSet } from 'zero-element-global/lib/valueType';

import onPath from './listAction/onPath';
import path from './listAction/path';

// setEndpoint('http://192.168.3.16:8080')
setEndpoint('http://106.12.212.64:8280')

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
  'BaseFormLayout': BaseFormLayout,
  'LineLayout': LineLayout
})


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

const showproductNames = (record) => {
  return<div>
    {
      record.data.record[record.field].length > 0 && record.data.record[record.field].map((item,index) => (
        <div key={index} style={{backgroundColor: '#f0f0f0',marginBottom:'5px'}}>{item}</div>
      ))
    }
  </div>
}


VTSet({
  'showImage': (record) => record.data.record[record.field] != undefined ? showImage(record) : '',
  'showStatus': (record) => record.data.record[record.field] != undefined ? showStatus(record) : '',
  'productNames': (record) => record.data.record[record.field] != undefined ? showproductNames(record) : ''
})

// window.localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJvcmdJZCI6IjEwMDEiLCJ1c2VySWQiOiI4NzY3MDgwODI0MzcxOTc4MjciLCJhY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE1NjYxODAzNDcsImp0aSI6Ijg3NjcwODA4MjQzNzE5NzgyNyIsInN1YiI6ImFkbWluIiwiZXhwIjoxNTY2NDM5NTQ3fQ.rJjlToWRX6Ef1KCfN3OjuPguCUB4v9-P1KYypwglY0jYN6D-XCneFeMPWNQcqZsZYLLHm8fJLmSUkErtMqCvZQ'

window.MC = {
  HASH: '',
  // HOST:'http://192.168.3.16:8080',
  HOST:'http:///106.12.212.64:8280',
  DATETIMEFORMAT:'YYYY/MM/DD HH:mm:ss',
  DATAFORMAT:'YYYY/MM/DD',
  BASEURL:'http://106.12.212.64:8088',
  SENDCODE: 'http://120.79.77.207:8080'
}
