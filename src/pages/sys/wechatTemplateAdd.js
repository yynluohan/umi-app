import { connect } from 'dva';
import WechatTemplateForm from './component/WechatTemplateForm';
import { routerRedux } from 'dva/router';

const WechatTemplateAdd = ({ dispatch, sys }) => {

  const wechatTemplateProps = {
    title: '添加微信模板消息',
    onSave(data) {
      dispatch({
        type: 'sys/addWechatTemplate',
        payload:data
      })
    },
    onBack() {
      dispatch(routerRedux.goBack())
    }
  }

  return (
    <div>
      <WechatTemplateForm {...wechatTemplateProps}/>
    </div>
  )

}


function mapStateToProps(state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(WechatTemplateAdd)
