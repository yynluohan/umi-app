import { create } from '../framework/utils/services'
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

        if(location.pathname === '/') {
          if (!window.localStorage.token) {
            window.location.href = '#/login'
          }
        }
      })
    },
  },

  effects: {

    *create({ payload },{ call }) {
      const result = yield call(create,`${window.MC.BASEURL}/api/sys/oauth/login`,{...payload});
      if (result.code === 200) {
        message.success('登录成功！')
        window.localStorage.token = result.data.accessToken;
        window.localStorage.username = payload.account;
        // window.localStorage.perms = result.data.perms;
        // const menuData = yield call(query,'/api/sys/users/menus');
        // if (menuData.code === 200) {
        //   window.localStorage.menuList = JSON.stringify(menuData.data)
        // } else {
        //   notification.error({ message: menuData.message })
        // }
        setTimeout(function() {
           window.location.href = '#' + '/';
        },50)
      } else {
        message.error(result.message)
      }
    },

    *onRegister({ payload },{ call,select }) {
      const { registeredGithubUsername } = yield select(({ login }) => login)
      let data = {...payload}
      if (registeredGithubUsername) {
        data.registeredGithubUsername = registeredGithubUsername
      }
      let result = '';
      if (registeredGithubUsername) {
        result = yield call(create,`${window.MC.BASEURL}/api/sys/oauth/bind`,data);
      } else {
        result = yield call(create,`${window.MC.BASEURL}/api/sys/oauth/register`,data);
      }
      if (result.code === 200) {
        message.success(`${registeredGithubUsername ? '绑定成功！' : '注册成功！'}`)
        setTimeout(function() {
          window.location.href = '#/login'
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
