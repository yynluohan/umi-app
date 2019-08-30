import React from 'react';
import { Button,InputNumber } from 'antd';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView'
import { routerRedux } from 'dva/router';
import TableInSpin from '../../common/TableInSpin';


class InventoryCheckAgain extends React.Component {

  constructor(props){
    super(props);
    console.log('88888',props)
    this.state = {
      item:{},
      skuRecords: []
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('7777',nextProps)
    const { item } = nextProps.supply;
    this.setState({
        item,
        skuRecords: item.skuRecords || []
    })
  }

  onSubmit = () => {
    const { item,skuRecords } = this.state;
    let data = {
        ...item,
        skuRecords,
        originatorName: window.localStorage.username || '',
    };
    this.props.dispatch({
        type: 'supply/inventoryCheckAgain',
        payload:data
    })
  }

    //表格本次数量发生改变时触发
    onChangeTable = (a,b,c) => {
        let { skuRecords } = this.state;
        skuRecords[a][c] = b;
        this.setState({
            skuRecords
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
        {label:'盘点编号',data: item.checkCode},
        {label:'盘点仓库',data:item.warehouseName},
        {label:'盘点时间',data:item.checkTime},
        {label:'制单人',data:item.originatorName},
        {label:'备注',data:item.checkNote},
    ]
   }

   const tableInspinProps = {
    list: item.skuRecords || [],
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
          title: '应有数量',
          key: 'deservedQuantities',
          dataIndex: 'deservedQuantities'
      },
      {
          title: '实际数量',
          key: 'factQuantities',
          render:(record,text,index) => (
              <InputNumber min={0} 
                  onChange={(e) => this.onChangeTable(index,e,'factQuantities')}
                  value={record.factQuantities}
              />
          )
      }
    ]
 }

   return (
     <div style={{ backgroundColor: '#fff',padding: '20px'}}>
       <h2>继续盘点</h2>
       <FormIemView {...formItemViewProps}/>
       <TableInSpin {...tableInspinProps} />
       <div style={{textAlign: 'right',marginTop:'2em'}}>
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit('')}>继续盘点</Button>
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
  
export default connect(mapStateToProps)(InventoryCheckAgain);
