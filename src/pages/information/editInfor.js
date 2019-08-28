import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import AddInforForm from './component/AddInforForm';

const EditInfo = ({dispatch, information }) =>{

  const { item, id } = information;

  const editInfoFormProps = {
    item,
    title:'编辑资讯',
    onBack(){
      dispatch(routerRedux.goBack())
    },
    onSave(data){
      dispatch({
        type:'information/updateInforData',
        payload:{
          id,
          data,
        }
      })
    }
  }

  return (
    <div>
      <AddInforForm {...editInfoFormProps}/>
    </div>
  )

}
  

function mapStateToProps(state) {
  return {
    information: state.information
  }
}

export default connect(mapStateToProps)(EditInfo);
