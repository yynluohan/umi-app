import React from 'react';
import { Button,InputNumber } from 'antd';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView'
import { routerRedux } from 'dva/router';
import TableInSpin from '../../common/TableInSpin';


class DistributorOutApprove extends React.Component {

  constructor(props){
    super(props);
    console.log('88888',props)
    this.state = {
      item:{},
      outItems: []
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('7777',nextProps)
    const { item } = nextProps.supply;
    this.setState({
        item,
        outItems: item.outItems || []
    })
  }

  onSubmit = (statusData) => {
    const { item,outItems } = this.state;
    let data = {
        ...item,
        outItems,
        originatorName: window.localStorage.username || '',
    };
    if (statusData === '拒绝') {
        this.props.dispatch({
            type: 'supply/distributorOutApproveReject',
        })
    } else {
        this.props.dispatch({
            type: 'supply/distributorOutApprovePass',
            payload: data
        })
    }
  }

    //表格本次数量退发生改变时触发
    onChangeTable = (a,b,c) => {
        let { outItems } = this.state;
        outItems[a][c] = b;
        this.setState({
            outItems
        })
      }

      onBack = () => {
        this.props.dispatch(routerRedux.goBack())
      }


 render() {

   const { item } = this.state;

   const formItemViewProps = {
    isHiddenBackBut:true,
    list: [
        {label:'订单编号',data: item.salesCode},
        {label:'订单创建人',data:item.originatorName},
        {label:'创建日期',data:item.transactionTime},
        {label:'分销商名称',data:item.traderName},
        {label:'联系电话',data:item.traderContactPhone},
        {label:'经办人',data:item.transactionBy},
        {label:'收货地址',data:item.deliveredAddress},
        {label:'备注',data:item.salesNote},
    ]
   }

   const tableInspinProps = {
    list: item.outItems || [],
    loading: false,
    columns:[
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
        title: '单位',
        key: 'skuUnit',
        dataIndex: 'skuUnit'
     },
      {
          title: '需求数量',
          key: 'demandQuantities',
          dataIndex: 'demandQuantities'
      },
      {
          title: '销售数量',
          key: 'transactionQuantities',
          render:(record,text,index) => (
              <InputNumber min={0} 
                  onChange={(e) => this.onChangeTable(index,e,'transactionQuantities')}
                  value={record.transactionQuantities}
              />
          )
      },
      {
        title: '销售单价',
        key: 'transactionSkuPrice',
        dataIndex: 'transactionSkuPrice'
     },
     {
        title: '销售总价',
        key: 'total',
        render: (record) => (
            <span>{(record.demandQuantities || 0) * record.transactionQuantities || 0}</span>
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
     <div style={{ backgroundColor: '#fff',padding: '20px'}}>
       <h2>审核</h2>
       <FormIemView {...formItemViewProps}/>
       <TableInSpin {...tableInspinProps} />
       <div style={{textAlign: 'right',marginTop:'2em'}}>
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit('通过')}>审核通过</Button>
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit('拒绝')}>审核拒绝</Button>
        <Button onClick={this.onBack}>返回</Button>
       </div>
     </div>
   )
 }

}

function mapStateToProps(state) {
    return {
      supply: state.supply
    }
  }
  
export default connect(mapStateToProps)(DistributorOutApprove);
