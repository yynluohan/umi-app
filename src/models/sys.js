import { query,create,update } from '../framework/utils/services'
import { message,notification } from 'antd';
import { getArgment } from '../framework/utils/parameter';
import tips from '../framework/utils/tips';

export default {
  namespace: 'sys',
  state: {
    vipItem: {},
    credictItem: {},
    brandItem: {},
    privacyItem: {},
    type: 'VIP_RULES',
  },


  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const query = getArgment(location.search)
        if (location.pathname === '/sys/rule') {
          dispatch({
            type: 'query',
          })
        }
      });
    },
  },

  effects: {
    *query({ payload },{ call,put,select }) {
      const vipResult = yield call(query,'/api/term/config',{type: 'VIP_RULES'})
      const redictResult = yield call(query,'/api/term/config',{type: 'CREDIT_RULES'})
      const brandResult = yield call(query,'/api/term/config',{type: 'BRAND'})
      const privacyResult = yield call(query,'/api/term/config',{type: 'PRIVACY_POLICY'})
      yield put({
        type: 'save',
        payload:{
          vipItem: vipResult.data || {},
          credictItem: redictResult.data || {},
          brandItem: brandResult.data || {},
          privacyItem: privacyResult.data || {}
        }
      })
    },

    *onUpdate({ payload },{ call,put,select }) {
      const { vipItem,credictItem,brandItem,privacyItem,type } = yield select(({ sys }) => sys);
      const obj = {
        'VIP_RULES': vipItem,
        'CREDIT_RULES': credictItem,
        'BRAND': brandItem,
        'PRIVACY_POLICY': privacyItem
      }

      console.log('5555',type)
      let result = '';
      if (obj[type].id) {
        result = yield call(update,`/api/term/config/${obj[type].id}`,{...payload})
      } else {
        result = yield call(create,'/api/term/config',{...payload,type })
      }
      tips.lookMes(result.code,result.message)
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
