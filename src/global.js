// 入口文件

// import setLayoutExtends from 'zero-element';
import BaseFormLayout from './components/layout/BaseFormLayout'
import ZEleA from 'zero-element-antd';

import { set as setEndpoint } from 'zero-element/lib/utils/request/endpoint';
// import { saveToken } from 'zero-element/lib/utils/request/token';

import { set as LASet } from 'zero-element-global/lib/listAction';
import { set as AITSet } from 'zero-element-global/lib/actionItemType';
import { set as LayoutSet } from 'zero-element-global/lib/layout';

import onPath from './listAction/onPath';
import path from './listAction/path';

setEndpoint('http://192.168.3.16:8080')
// setEndpoint('http://192.168.236.129:8080')

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

window.localStorage.token = '111'

window.MC = {
  HASH: '',
  HOST:'http://192.168.3.16:8080',
  // HOST:'http://192.168.236.129:8080',
  DATETIMEFORMAT:'YYYY/MM/DD HH:mm:ss',
  DATAFORMAT:'YYYY/MM/DD',
}
