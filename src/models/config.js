import { query,create } from '../framework/utils/services'
import { message,notification } from 'antd';
import { getArgment } from '../framework/utils/parameter';

export default {
  namespace: 'config',
  state: {

  },


  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const query = getArgment(location.search)
      });
    },
  },

  effects: {

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
