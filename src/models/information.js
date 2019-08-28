import { query,create,update,detele } from '../framework/utils/services'
import { message,notification } from 'antd';
import { routerRedux } from 'dva/router';
import { getArgment } from '../framework/utils/parameter';
import tips from '../framework/utils/tips';

export default {
  namespace: 'information',
  state: {
    item: {},
    id: '',
    evaluationList:[],
    pageNum:1,
    pageSize:10,
    pages:0,
    pageTotal:0,
  },


  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const query = getArgment(location.search);
        
        const obj = {
          '/information/editInfor': `/api/cms/articles/${query.id}`,
          '/information/viewInfor': `/api/cms/articles/${query.id}`,
        }
        
        if(location.pathname === '/information/editInfor' || location.pathname === '/information/viewInfor'){
          dispatch({
            type:'save',
            payload:{
              id:query.id
            }
          })
          dispatch({
            type: 'onView',
            payload:{
              url:obj[location.pathname]
            }
          })
        }
        if(location.pathname === '/information/viewInfor'){
          dispatch({
            type: 'getEvaluationsById',
            payload:{
              stockId:query.id,
              pageNum: 1,
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

    // 添加资讯
    *addInforData({ payload },{ call,put }) {
      const result = yield call(create,'/api/cms/articles',payload);
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 编辑资讯
    *updateInforData({ payload },{ call,put }) {
      const result = yield call(update,`/api/cms/articles/${payload.id}`,payload.data);
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 获取评论列表
    *getEvaluationsById({ payload },{ call,put }) {

      const param = {
        stockType: 'Article',
        stockId: payload.stockId,
        isLayered:true,
        pageNum:payload.pageNum,
        pageSize:10,
      }
      const result = yield call(query,'/api/gw/expore/info/evaluations',param);
      if (result.code === 200) {
        yield put({
          type: 'save',
          payload:{
            evaluationList: result.data.records || [],
            pageNum:result.data.current || 1,
            pageSize:result.data.size || 10,
            pages:result.data.pages || 0,
            pageTotal:result.data.total || 0
          }
        })
      }
    },

    //添加评论
    *addEvaluationContent({ payload },{ call, put, select }){
      const { pageNum,id } = yield select (({information}) => information);
      const result = yield call(create,'/api/cms/evaluations',payload);
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        yield put({
          type: 'getEvaluationsById',
          payload:{
            stockId:id,
            pageNum,
            pageSize:10
          }
        })
      }
    },
    
    //提交回复
    *addReplyContent({ payload },{ call, put, select }){
      const { pageNum,id } = yield select (({information}) => information);
      const result = yield call(create,'/api/cms/evaluations',payload);
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        yield put({
          type: 'getEvaluationsById',
          payload:{
            stockId:id,
            pageNum,
            pageSize:10
          }
        })
      }
    },

    //删除评论
    *deleteReplyContent({ payload },{ call, put, select }){
      const { pageNum,id } = yield select (({information}) => information);
      const result = yield call(create,`/api/cms/evaluations/${payload}/action/forbidden`,{});
      tips.lookMes(result.code,result.message)
      if (result.code == 200) {
        //yield put(routerRedux.goBack())
        yield put({
          type: 'getEvaluationsById',
          payload:{
            stockId:id,
            pageNum,
            pageSize:10
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
