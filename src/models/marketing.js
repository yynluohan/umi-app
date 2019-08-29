// import { query,create,update } from '../framework/utils/services'
// import { message,notification } from 'antd';
// import { routerRedux } from 'dva/router';
// import { getArgment } from '../framework/utils/parameter';
// import tips from '../framework/utils/tips';

export default {
  namespace: 'marketing',
  state: {
    item: {},
  },


  subscriptions: {
    // setup({ dispatch, history }) {
    //   history.listen((location) => {
    //     const query = getArgment(location.search);

    //   });
    // },
  },

  effects: {

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
