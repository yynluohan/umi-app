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
            || location.pathname === '/supply/putStorageEdit' || location.pathname === '/supply/putStorageView'
            || location.pathname === '/supply/outStorageEdit' || location.pathname === '/supply/outStorageView'
            || location.pathname === '/supply/transferEdit' || location.pathname === '/supply/transferView'
            || location.pathname === '/supply/inventoryEdit' || location.pathname === '/supply/inventoryView'
            ) {
          const obj = {
            '/supply/warehouseEdit':`/api/wms/warehouses/${query.id}`,
            '/supply/warehouseView':`/api/wms/warehouses/${query.id}`,
            '/supply/purchaseOrderEdit': `/api/wms/procurements/${query.id}`,
            '/supply/purchaseOrderView': `/api/wms/procurements/${query.id}`,
            '/supply/purchaseReturnEdit': `/api/wms/refunds/${query.id}`,
            '/supply/purchaseReturnView':`/api/wms/refunds/${query.id}`,
            '/supply/putStorageEdit': `/api/wms/storages/in/${query.id}`,
            '/supply/putStorageView': `/api/wms/storages/in/${query.id}`,
            '/supply/outStorageEdit': `/api/wms/storages/out/${query.id}`,
            '/supply/outStorageView': `/api/wms/storages/out/${query.id}`,
            '/supply/transferEdit': `/api/wms/transfers/${query.id}`,
            '/supply/transferView': `/api/wms/transfers/${query.id}`,
            '/supply/inventoryEdit': `/api/wms/checks/${query.id}`,
            '/supply/inventoryView': `/api/wms/checks/${query.id}`,
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
      const result = yield call(create,'/api/wms/warehouses',payload);
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        yield put(routerRedux.goBack())
      }
    },

    //修改仓库
    *updateWarehouse({ payload },{ call,put,select }) {
      const { id } = yield select(({ supply }) => supply);
      const result = yield call(update,`/api/wms/warehouses/${id}`,payload);
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

    //添加入库
    *addPutStorage({ payload },{ call,put }) {
      const result = yield call(create,'/api/wms/storages/in',payload)
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        yield put(routerRedux.goBack())
      }
    },

    //编辑入库
    *updatePutStorage({ payload },{ call,put,select }) {
      const { id } = yield select(({ supply }) => supply);
      const result = yield call(update,`/api/wms/storages/in/${id}`,payload);
      tips.lookMes(result.code,result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 添加出库
    *addOutStorage({ payload },{ call,put }) {
      const result = yield call(create,'/api/wms/storages/out',payload)
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 编辑出库
    *updateOutStorage({ payload },{ call,put,select }) {
      const { id } = yield select(({ supply }) => supply);
      const result = yield call(update,`/api/wms/storages/out/${id}`,payload);
      tips.lookMes(result.code,result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    //添加调拨
    *addTransfer({ payload },{ call,put }) {
      const result = yield call(create,'/api/wms/transfers',payload)
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        yield put(routerRedux.goBack())
      }
    },

    //编辑调拨
    *updateTransfer({ payload },{ call,put,select }) {
      const { id } = yield select(({ supply }) => supply);
      const result = yield call(update,`/api/wms/transfers/${id}`,payload);
      tips.lookMes(result.code,result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 添加盘点
    *addInventory({ payload },{ call,put }) {
      const result = yield call(create,'/api/wms/checks',payload)
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        yield put(routerRedux.goBack())
      }
    },

    //编辑盘点
    *updateInventory({ payload },{ call,put,select }) {
      const { id } = yield select(({ supply }) => supply);
      const result = yield call(update,`/api/wms/checks/${id}`,payload);
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
