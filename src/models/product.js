import { query,create } from '../framework/utils/services'
import { message,notification } from 'antd';
import { routerRedux } from 'dva/router';
import { getArgment } from '../framework/utils/parameter';

export default {

  namespace: 'product',

  state: {
    item:{}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(( location ) => {
        const query = getArgment(location.search);
        if (location.pathname === '/product/categroyView' || location.pathname === '/product/categroyEdit') {
          const obj = {
            '/product/categroyView':`/api/crud/product/productCategoryies/${query.id}`,
            '/product/categroyEdit':`/api/crud/product/productCategoryies/${query.id}`,
          }
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
            item: result.data
          }
        })
      }
    },

    //添加产品类型
    *addCategroy({ payload },{ call,put }) {
      const result = yield call(create,'/api/crud/product/productCategoryies',payload);
      if (result.code === 200) {
        notification.success({ message: '添加成功' })
        yield put(routerRedux.goBack())
      } else {
        notification.error({ message: result.message })
      }
    }

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
