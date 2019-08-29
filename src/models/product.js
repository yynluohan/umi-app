import { query,create,update } from '../framework/utils/services'
import { routerRedux } from 'dva/router';
import { getArgment } from '../framework/utils/parameter';
import tips from '../framework/utils/tips';

export default {

  namespace: 'product',

  state: {
    item:{},
    id: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(( location ) => {
        const query = getArgment(location.search);
        if (location.pathname === '/product/categroyView' || location.pathname === '/product/categroyEdit'
            || location.pathname === '/product/productView' || location.pathname === '/product/productEdit'
            || location.pathname === '/product/freightView' || location.pathname === '/product/freightEdit'
            || location.pathname === '/product/trialEdit' || location.pathname === '/product/trialView'
            || location.pathname === '/product/evaluateView'
          ) {
          const obj = {
            '/product/categroyView':`/api/crud/product/productCategoryies/${query.id}`,
            '/product/categroyEdit':`/api/crud/product/productCategoryies/${query.id}`,
            '/product/productView':`/api/crud/product/products/${query.id}`,
            '/product/productEdit': `/api/crud/product/products/${query.id}`,
            '/product/freightView':`/api/crud/product/fareTemplates/${query.id}`,
            '/product/freightEdit': `/api/crud/product/fareTemplates/${query.id}`,
            '/product/trialEdit':`/api/crud/product/trials/${query.id}`,
            '/product/trialView': `/api/crud/product/trials/${query.id}`,
            '/product/evaluateView': `/api/cms/evaluations/${query.id}`
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
      })
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

    //添加产品类型
    *addCategroy({ payload },{ call,put }) {
      const result = yield call(create,'/api/crud/product/productCategoryies',payload);
      tips.lookMes(result.code,result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    //修改产品类别
    *updateCategroy({ payload },{ call,put,select }) {
      const { id } = yield select(({ product }) => product);
      const result = yield call(update,`/api/crud/product/productCategoryies/${id}`,payload);
      tips.lookMes(result.code,result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 添加产品
    *addProduct({ payload },{ call,put }) {
      const result = yield call(create,'/api/crud/product/products',payload);
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        yield put(routerRedux.goBack())
      }
    },

    //修改产品
    *updateProduct({ payload },{ call,put,select }) {
      const { id } = yield select(({ product }) => product);
      const result = yield call(update,`/api/crud/product/products/${id}`,payload);
      tips.lookMes(result.code,result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    //添加试用装
    *addTrial({ payload },{ call,put }) {
      const result = yield call(create,'/api/crud/product/trials',payload);
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        yield put(routerRedux.goBack())
      }
    },

    //添加运费模板
    *addFreight({ payload },{ call,put }) {
      const result = yield call(create,'/api/crud/product/fareTemplates',payload);
      tips.lookMes(result.code,result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    //更新运费模板
    *updateFreight({ payload },{ call,put,select }) {
      const { id } = yield select(({ product }) => product);
      const result = yield call(update,`/api/crud/product/fareTemplates/${id}`,payload);
      tips.lookMes(result.code,result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    //更新试用装
    *updateTrial({ payload },{ call,put,select }) {
      const { id } = yield select(({ product }) => product);
      const result = yield call(update,`/api/crud/product/trials/${id}`,payload);
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
