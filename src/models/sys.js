import { query, create, update } from '../framework/utils/services'
import { getArgment } from '../framework/utils/parameter'
import tips from '../framework/utils/tips'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'sys',
  state: {
    vipItem: {},
    credictItem: {},
    brandItem: {},
    privacyItem: {},
    type: 'VIP_RULES',
    item: {}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const query = getArgment(location.search)
        if (location.pathname === '/sys/rule') {
          dispatch({
            type: 'query'
          })
        }
        if (location.pathname === '/sys/adGroupView' || location.pathname === '/sys/wechatTemplateEdit' ||
            location.pathname === '/sys/wechatTemplateView' || location.pathname === '/sys/userView'
        ) {
          const obj = {
            '/sys/adGroupView': `/api/ad/groups/${query.id}`,
            '/sys/wechatTemplateEdit': `/api/crud/wxTemplateMessage/wechatTemplateMessages/${query.id}`,
            '/sys/wechatTemplateView': `/api/crud/wxTemplateMessage/wechatTemplateMessages/${query.id}`,
            '/sys/userView': `/api/crud/user/users/${query.id}`
          }
          dispatch({
            type: 'save',
            payload: {
              id: query.id
            }
          })
          dispatch({
            type: 'onView',
            payload: {
              url: obj[location.pathname]
            }
          })
        }
      })
    }
  },

  effects: {

    *onView({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield call(query, payload.url)
      if (result.code === 200) {
        yield put({
          type: 'save',
          payload: {
            item: result.data || {}
          }
        })
      }
    },

    * query ({}, { call, put }) {
      const vipResult = yield call(query, '/api/term/config', { type: 'VIP_RULES' })
      const redictResult = yield call(query, '/api/term/config', { type: 'CREDIT_RULES' })
      const brandResult = yield call(query, '/api/term/config', { type: 'BRAND' })
      const privacyResult = yield call(query, '/api/term/config', { type: 'PRIVACY_POLICY' })
      yield put({
        type: 'save',
        payload: {
          vipItem: vipResult.data || {},
          credictItem: redictResult.data || {},
          brandItem: brandResult.data || {},
          privacyItem: privacyResult.data || {}
        }
      })
    },

    * onUpdate ({ payload }, { call, select }) {
      const { vipItem, credictItem, brandItem, privacyItem, type } = yield select(({ sys }) => sys)
      const obj = {
        VIP_RULES: vipItem,
        CREDIT_RULES: credictItem,
        BRAND: brandItem,
        PRIVACY_POLICY: privacyItem
      }
      let result = ''
      if (obj[type].id) {
        result = yield call(update, `/api/term/config/${obj[type].id}`, { ...payload })
      } else {
        result = yield call(create, '/api/term/config', { ...payload, type })
      }
      tips.lookMes(result.code, result.message)
    },

    // 添加微信模板消息
    * addWechatTemplate ({ payload }, { call, put }) {
      const result = yield call(create, '/api/crud/wxTemplateMessage/wechatTemplateMessages', payload)
      tips.lookMes(result.code, result.message)
      if (result.code == 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 更新微信模板消息
    * updateWechatTemplate ({ payload }, { call, put, select }) {
      const { id } = yield select(({ sys }) => sys)
      const result = yield call(update, `/api/crud/wxTemplateMessage/wechatTemplateMessages/${id}`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code == 200) {
        yield put(routerRedux.goBack())
      }
    }
  },
  reducers: {
    save (state, action) {
      return { ...state, ...action.payload }
    }
  }

}
