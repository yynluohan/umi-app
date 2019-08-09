import { query,create,update } from '../framework/utils/services'
import { message,notification } from 'antd';
import { routerRedux } from 'dva/router';
import { getArgment } from '../framework/utils/parameter';
import tips from '../framework/utils/tips';

export default {
  namespace: 'store',
  state: {
    item: {},
    id: '',
    warehouseId: '', //仓库id
  },


  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const query = getArgment(location.search);
        console.log('9220',query)
        if (location.pathname === '/store/editStore' || location.pathname === '/store/viewStore') {
          const obj = {
            '/store/editStore':`/api/store/stores/${query.id}`,
            '/store/viewStore':`/api/store/stores/${query.id}`,
          }
          dispatch({
            type: 'save',
            payload:{
              id: query.id,
              warehouseId: query.warehouseId
            }
          })
          dispatch({
            type: 'onView',
            payload:{
              url: obj[location.pathname]
            }
          })
        }
      });
    },
  },

  effects: {

    *onView({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield call(query,payload.url);
      if (result.code === 200) {
        yield put({
          type: 'save',
          payload:{
            item: result.data || {}
          }
        })
      }
    },

    // 添加店铺
    *addStore({ payload },{ call,put }) {
      const result = yield call(create,'/api/store/stores',payload);
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        yield put(routerRedux.goBack())
      }
    },

    //修改店铺
    *updateStore({ payload },{ call,put,select }) {
      const { id } = yield select(({ store }) => store);
      const result = yield call(update,`/api/store/stores/${id}`,payload);
      tips.lookMes(result.code,result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
