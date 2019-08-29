import React from 'react';
import { Form,Button,InputNumber } from 'antd';
import FormIemView from '../../../common/FormIemView'
import { query } from '../../../framework/utils/services';
import TableInSpin from '../../../common/TableInSpin';

class WmsApproveForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      item:props.item || {},
      items: []
    }
    this.getProcurementCode()
  }

   //获取采购单编号
   getProcurementCode = () => {
    query('/api/pub/sn/serial',{prefix: 'IN'}).then(({ code,data }) => {
        if (code === 200) {
          this.setState({
              item:{
                field2: data
              }
          })
        }
    })
}

  componentWillReceiveProps(nextProps){
    if (nextProps.item) {
      this.setState({
        item: nextProps.item,
        items: nextProps.item.items ? nextProps.item.items : this.state.items
      })
    }
  }

  onSubmit = (statusData) => {
    const { item,items } = this.state;
    let data = {
        ...item,
        items,
        originatorName: window.localStorage.username || '',
    };
    this.props.onSave(data,statusData)
  }

    //表格本次入库数量退发生改变时触发
    onChangeTable = (a,b,c) => {
        let { items } = this.state;
        items[a][c] = b;
        this.setState({
           items
        })
      }


 render() {

   const { item } = this.state;

   const formItemViewProps = {
    isHiddenBackBut:true,
    list: [
        {label:'退货编号',data: item.productRefundCode},
        {label:'经办人',data:item.transactionBy},
        {label:'退货日期',data:item.transactionTime},
        {label:'制单人',data:item.originatorName},
        {label:'备注',data:item.productRefundNote},
        {label:'产生的出库单',data:item.field1},
        {label:'供应商',data:item.supplierName},
        {label:'关联的采购单',data:item.procurementCode},
    ]
   }

   const tableInspinProps = {
    list: item.items || [],
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
          title: '需求数量',
          key: 'demandQuantities',
          dataIndex: 'demandQuantities'
      },
      {
          title: '退货数量',
          key: 'transactionQuantities',
          render:(record,text,index) => (
              <InputNumber min={0} 
                  onChange={(e) => this.onChangeTable(index,e,'transactionQuantities')}
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
     <div style={{ backgroundColor: '#fff',padding: '20px'}}>
       <h2>{this.props.title}</h2>
       <FormIemView {...formItemViewProps}/>
       <TableInSpin {...tableInspinProps} />
       <div style={{textAlign: 'right',marginTop:'2em'}}>
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit('通过')}>审核通过</Button>
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit('拒绝')}>审核拒绝</Button>
        <Button onClick={this.props.onBack}>返回</Button>
       </div>
     </div>
   )
 }

}

export default Form.create()(WmsApproveForm)
