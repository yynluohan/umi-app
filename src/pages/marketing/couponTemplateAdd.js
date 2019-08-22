import { connect } from 'dva';

const CouponTemplateAdd  = ({ dispatch,marketing }) => {


  return(
    <div>
      11111
    </div>
  )

}

function mapStateToProps(state) {
  return {
    marketing: state.marketing
  }
}

export default connect(mapStateToProps)(CouponTemplateAdd)
