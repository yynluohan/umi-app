import React from 'react'
import { connect } from 'dva'
import FormIemView from '../../common/FormIemView'

const TrialView = ({ product }) => {
  const { item } = product

  const showEnabled = {
    1: '是',
    0: '否',
    undefined: ''
  }

  const formItemProps = {
    title: '试用装详情',
    list: [
      { label: '名称', data: item.name },
      { label: '简短描述', data: item.shortNote },
      { label: '开始时间', data: item.startTime },
      { label: '结束时间', data: item.endTime },
      { label: '排序号', data: item.index },
      { label: '是否启用', data: showEnabled[item.enabled] },
      { label: '封面', data: (<a href={item.cover} target='_black'><img src={item.cover} style={{ width: '50px' }} /></a>) },
      { label: '描述', data: item.note, span: 24 },
      {
        label: '关联产品',
        data: [item.product],
        columns: [
          { title: '封面', value: 'cover', type: 'image' },
          { title: '产品名称', value: 'name' },
          { title: '成本价', value: 'costPrice' },
          { title: '市场价', value: 'suggestedPrice' },
          { title: '零售价', value: 'price' }
        ]
      }

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

export default connect(mapStateToProps)(TrialView)
