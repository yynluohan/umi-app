
export default {

  namespace: 'product',

  state: {
    name:'这个一个模版'
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(( location ) => {

      })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line

    }

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
