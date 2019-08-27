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
        if (location.pathname === '/supply/warehouseEdit' || location.pathname === '/supply/warehouseView'
            || location.pathname === '/supply/purchaseOrderEdit' || location.pathname === '/supply/purchaseOrderView'
            || location.pathname === '/supply/purchaseReturnEdit' || location.pathname === '/supply/purchaseReturnView'  
        ) {
          const obj = {
            '/supply/warehouseEdit':`/api/crud/store/warehouses/${query.id}`,
            '/supply/warehouseView':`/api/crud/store/warehouses/${query.id}`,
            '/supply/purchaseOrderEdit': `/api/wms/procurements/${query.id}`,
            '/supply/purchaseOrderView': `/api/wms/procurements/${query.id}`,
            '/supply/purchaseReturnEdit': `/api/wms/refunds/${query.id}`,
            '/supply/purchaseReturnView':`/api/wms/refunds/${query.id}`,
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

    //添加采购订单
    *addPurchaseOrder({ payload },{ call,put }) {
      const result = yield call(create,'/api/wms/procurements',payload)
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        yield put(routerRedux.goBack())
      }
    },

    //修改采购订单
    *updatePurchaseOrder({ payload },{ call,put,select }) {
      const { id } = yield select(({ supply }) => supply);
      const result = yield call(update,`/api/wms/procurements/${id}`,payload);
      tips.lookMes(result.code,result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    //添加采购退货
    *addPurchaseReturn({ payload },{ call,put }) {
      const result = yield call(create,'/api/wms/refunds',payload)
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        yield put(routerRedux.goBack())
      }
    },

    //修改采购退货
    *updatePurchaseReturn({ payload },{ call,put,select }) {
      const { id } = yield select(({ supply }) => supply);
      const result = yield call(update,`/api/wms/refunds/${id}`,payload);
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
