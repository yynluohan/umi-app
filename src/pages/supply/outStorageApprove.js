import React from 'react'
import { Button, InputNumber } from 'antd'
import { connect } from 'dva'
import FormIemView from '../../common/FormIemView'
import { routerRedux } from 'dva/router'
import TableInSpin from '../../common/TableInSpin'

class OutStorageApprove extends React.Component {
  constructor (props) {
    super(props)
    console.log('88888', props)
    this.state = {
      item: {},
      storageOutItems: []
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeTable = this.onChangeTable.bind(this)
    this.onBack = this.onBack.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    console.log('7777', nextProps)
    const { item } = nextProps.supply
    this.setState({
      item,
      storageOutItems: item.storageOutItems || []
    })
  }

  onSubmit (statusData) {
    const { item, storageOutItems } = this.state
    const data = {
      ...item,
      storageOutItems,
      originatorName: window.localStorage.username || ''
    }
    if (statusData === '拒绝') {
      this.props.dispatch({
        type: 'supply/outStorageApproveReject'
      })
    } else {
      this.props.dispatch({
        type: 'supply/outStorageApprovePass',
        payload: data
      })
    }
  }

  // 表格本次入库数量退发生改变时触发
  onChangeTable (a, b, c) {
    const { storageOutItems } = this.state
    storageOutItems[a][c] = b
    this.setState({
      storageOutItems
    })
  }

  onBack () {
    this.props.dispatch(routerRedux.goBack())
  }

  render () {
    const { item } = this.state

    const formItemViewProps = {
      isHiddenBackBut: true,
      list: [
        { label: '出库编号', data: item.transactionCode },
        { label: '仓库', data: item.warehouseName },
        { label: '经办人', data: item.transactionBy },
        { label: '出库日期', data: item.transactionTime },
        { label: '订单号信息', data: item.outOrderNum },
        { label: '客户', data: item.distributorCustomer },
        { label: '制单人', data: item.originatorName },
        { label: '备注', data: item.note }
      ]
    }

    const tableInspinProps = {
      list: item.storageOutItems || [],
      loading: false,
      columns: [
        {
          title: '商品条码',
          key: 'skuBarcode',
          dataIndex: 'skuBarcode'
        },
        {
          title: '商品编号',
          key: 'skuCode',
          dataIndex: 'skuCode'
        },
        {
          title: '商品名称',
          key: 'skuName',
          dataIndex: 'skuName'
        },
        {
          title: '需求数量',
          key: 'demandQuantities',
          dataIndex: 'demandQuantities'
        },
        {
          title: '出库数量',
          key: 'transactionQuantities',
          render: (record, text, index) => (
            <InputNumber
              min={0}
              onChange={(e) => this.onChangeTable(index, e, 'transactionQuantities')}
              value={record.transactionQuantities}
            />
          )
        },
        {
          title: '退货单价',
          key: 'transactionSkuPrice',
          dataIndex: 'transactionSkuPrice'
        },
        {
          title: '退货总价',
          key: 'total',
          render: (record) => (
            <span>{(record.transactionQuantities || 0) * record.transactionSkuPrice || 0}</span>
          )
        },
        {
          title: '单位',
          key: 'field1',
          dataIndex: 'field1'
        }
      ]
    }

    return (
      <div style={{ backgroundColor: '#fff', padding: '20px' }}>
        <h2>{this.props.title}</h2>
        <FormIemView {...formItemViewProps} />
        <TableInSpin {...tableInspinProps} />
        <div style={{ textAlign: 'right', marginTop: '2em' }}>
          <Button type='primary' style={{ marginRight: '1em' }} onClick={() => this.onSubmit('通过')}>审核通过</Button>
          <Button type='primary' style={{ marginRight: '1em' }} onClick={() => this.onSubmit('拒绝')}>审核拒绝</Button>
          <Button onClick={() => this.onBack()}>返回</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(OutStorageApprove)
