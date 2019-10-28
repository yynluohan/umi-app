import React from 'react'
import { connect } from 'dva'
import FormIemView from '../../common/FormIemView'

const EvaluateView = ({ product }) => {
  const { item } = product

  const showProductName = () => {
    return (
      <div>
        {
          item.productNames && item.productNames.length > 0 && item.productNames.map((item, index) => (
            <div key={index}>{item}</div>
          ))
        }
      </div>
    )
  }

  const showIsStick = {
    0: '不置顶',
    1: '置顶'
  }

  const showIsDisplay = {
    0: '不屏蔽',
    1: '屏蔽'
  }

  const formItemProps = {
    title: '商品评价详情',
    list: [
      { label: '订单编号', data: item.tradeNumber },
      { label: '下单时间', data: item.tradeTime },
      { label: '商品名称', data: showProductName() },
      { label: '评价等级', data: item.commentStar },
      { label: '评价内容', data: item.commentContent, span: 24 },
      { label: '评价时间', data: item.createTime },
      { label: '回复时间', data: item.replyTime },
      { label: '置顶', data: showIsStick[item.isStick] },
      { label: '屏蔽', data: showIsDisplay[item.isDisplay] }
    ]
  }

  return (
    <div>
      <FormIemView {...formItemProps} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(EvaluateView)
