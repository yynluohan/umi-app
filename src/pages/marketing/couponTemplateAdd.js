import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CouponTemplateForm from './component/CouponTemplateForm';

const CouponTemplateAdd  = ({ dispatch,marketing }) => {

  const fromProps = {
    title: '添加优惠券模板',
    onBack() {
      dispatch(routerRedux.goBack())
    }
  }

  return(
    <div>
      <CouponTemplateForm {...fromProps}/>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    marketing: state.marketing
  }
}

export default connect(mapStateToProps)(CouponTemplateAdd)
