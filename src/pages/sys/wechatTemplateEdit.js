import { connect } from 'dva'
import WechatTemplateForm from './component/WechatTemplateForm'
import { routerRedux } from 'dva/router'

const WechatTemplateEdit = ({ dispatch, sys }) => {
  const { item } = sys

  const wechatTemplateProps = {
    item,
    title: '编辑微信模板消息',
    onSave (data) {
      dispatch({
        type: 'sys/updateWechatTemplate',
        payload: data
      })
    },
    onBack () {
      dispatch(routerRedux.goBack())
    }
  }

  return (
    <div>
      <WechatTemplateForm {...wechatTemplateProps} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(WechatTemplateEdit)
