import { notification } from 'antd';
import { routerRedux } from 'dva/router';

export default {

  lookMes(code,message) {
    if (!code) {
      return;
    }
    if (code === 200) {
      notification.success({ message: '操作成功' });
    } else {
      notification.error({ message:message || '操作失败' })
    }
  }
}
