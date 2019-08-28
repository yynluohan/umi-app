import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ViewInfoPage from './component/ViewInformation';

const ViewInfor = ({dispatch, information }) =>{

  const { id, item, evaluationList, pageNum, pageSize, pages, pageTotal } = information;

  // console.log('item == ',item)

  const viewInfoPageProps = {
    item,
    evaluationList,
    pageNum,
    pageSize,
    pages,
    pageTotal,
    title:'资讯详情',
    onBack(){
      dispatch(routerRedux.goBack())
    },
    onSub(data){
      dispatch({
        type:'information/addEvaluationContent',
        payload:data
      })
    },
    onReplySub(data){
      dispatch({
        type:'information/addReplyContent',
        payload:data
      })
    },
    onDeleteReply(id){
      dispatch({
        type:'information/deleteReplyContent',
        payload:id
      })
    },
    onPaginationChange(currentPage, pageSize){
      dispatch({
        type:'information/getEvaluationsById',
        payload:{
          id,
          pageNum:currentPage,
          pageSize
        }
      })
    }
  }

  return (
    <div>
      <ViewInfoPage {...viewInfoPageProps}/>
    </div>
  )

}
  

function mapStateToProps(state) {
  return {
    information: state.information
  }
}

export default connect(mapStateToProps)(ViewInfor);
