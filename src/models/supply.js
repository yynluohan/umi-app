import { query,create,update } from '../framework/utils/services'
import { message,notification } from 'antd';
import { routerRedux } from 'dva/router';
import { getArgment } from '../framework/utils/parameter';
import tips from '../framework/utils/tips';

export default {
  namespace: 'supply',
  state: {
    item: {},
    id: ''
  },


  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const query = getArgment(location.search);
        if (location.pathname === '/supply/warehouseEdit' || location.pathname === '/supply/warehouseView') {
          const obj = {
            '/supply/warehouseEdit':`/api/crud/store/warehouses/${query.id}`,
            '/supply/warehouseView':`/api/crud/store/warehouses/${query.id}`,
          }
          dispatch({
            type: 'save',
            payload:{
              id: query.id
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

    // 添加仓库
    *addWarehouse({ payload },{ call,put }) {
      const result = yield call(create,'/api/crud/store/warehouses',payload);
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        yield put(routerRedux.goBack())
      }
    },

    //修改仓库
    *updateWarehouse({ payload },{ call,put,select }) {
      const { id } = yield select(({ supply }) => supply);
      const result = yield call(update,`/api/crud/store/warehouses/${id}`,payload);
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
