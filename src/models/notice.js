import { query } from '../framework/utils/services'
import { getArgment } from '../framework/utils/parameter';

export default {
  namespace: 'notice',
  state: {
    item: {}
  },


  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const query = getArgment(location.search);
        if (location.pathname === '/sys/noticeView') {
          const obj = {
            '/sys/noticeView':`/api/cms/notice/notices/${query.id}`,
          }
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
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
