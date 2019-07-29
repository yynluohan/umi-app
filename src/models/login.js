import { query,create } from '../framework/utils/services'
import { message,notification } from 'antd';
import { getArgment } from '../framework/utils/parameter';

export default {
  namespace: 'login',
  state: {
    myTaskList: [], //我的任务列表
    registeredGithubUsername: '',
    applyResultData: {}
  },


  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/register') {
          const query = getArgment(location.search)
          const registeredGithubUsername = query.registeredGithubUsername || ''
          if (registeredGithubUsername) {
            notification.warning({ message: '请先完善信息后再继续！'})
            dispatch({
              type: 'save',
              payload:{
                registeredGithubUsername
              }
            })
          }
        }
      });
    },
  },

  effects: {

    *create({ payload },{ call,put }) {
      const result = yield call(create,'/api/sys/oauth/login',{...payload});
      if (result.code == 200) {
        message.success('登录成功！')
        window.localStorage.token = result.data.accessToken;
        window.localStorage.username = payload.account;
        window.localStorage.perms = result.data.perms;
        const menuData = yield call(query,'/api/sys/users/menus');
        if (menuData.code === 200) {
          window.localStorage.menuList = JSON.stringify(menuData.data)
        } else {
          notification.error({ message: menuData.message })
        }
        setTimeout(function() {
           window.location.href = '#' + '/';
           window.location.reload()
        },50)
      } else {
        message.error(result.message)
      }
    },

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
