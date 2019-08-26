import React from 'react';
import { Form,Col,Row,Input,Button,DatePicker,InputNumber,message } from 'antd';
import { query } from '../../../framework/utils/services';
import FieldOptionInput from '../../../common/FieldOptionInput';
import moment from 'moment';
import Selection from '../../../common/Selection';
import TableInSpin from '../../../common/TableInSpin';

const FormItem = Form.Item;
const dataFormat = window.MC.DATETIMEFORMAT;
const formItemLayout = (a,b) => {
  return {
    labelCol: {
      span: a || 6,
    },
    wrapperCol: {
      span: b || 18,
    },
  }
}

class PurchaseOrderForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      item:props.item || {},
      items: [], //选中的产品
    }
    this.getProcurementCode()
  }
  

  componentWillReceiveProps(nextProps){
    if (nextProps.item) {
      this.setState({
        item: nextProps.item
      })
    }
  }

  //获取采购单编号
  getProcurementCode = () => {
      query('/api/pub/sn/serial',{prefix: 'PUR'}).then(({ code,data }) => {
          console.log('55555',code,data )
          if (code === 200) {
            this.setState({
                item:{
                  procurementCode: data
                }
            })
          }
      })
  }

  //表格采购数量采购订单发生改变时触发
  onChangeTable = (a,b,c) => {
    let { items } = this.state;
    items[a][c] = b;
    this.setState({
       items
    })
  }

  onSubmit = () => {
    const { validateFields,getFieldsValue } = this.props.form;
    const { items,item } = this.state;
    validateFields((errors) => {
      if (errors) {
        return;
      }
      if (items.length === 0) {
        message.error('请选择需要采购的商品！');
        return;
      }
      let procurementTotal = 0;
      items.length > 0 && items.map((item,index) => {
        items[index] = {
          ...item,
          skuId: item.id
        }
        procurementTotal += (item.transactionQuantities || 0) * (item.transactionSkuPrice || 0)
      })
      let data = {
        ...item,
        items,
        procurementTotal,
        ...getFieldsValue(),
      };
      this.props.onSave(data)
    });
  }
  


 render() {

   const { getFieldDecorator } = this.props.form;
   let { item,items } = this.state;
   let totalMoney = 0;

   items.length > 0 && items.map((item,index) => {
       items[index] = {
           ...item,
           transactionAllMoney: (item.transactionQuantities || 0) * (item.transactionSkuPrice || 0)
       }
       totalMoney += (item.transactionQuantities || 0) * (item.transactionSkuPrice || 0)
   })

   console.log('8888',items)


   const fieldOptionInputProps = {
       apiUrl: '/api/wms/suppliers',
       method:query,
       getway:{
           name: 'supplierName',
           value: 'id'
       }
   }

   const selectionProps = {
        type: 'checkbox',
        butName:'+ 添加',
        isButton: true,
        method: query,
        apiUrl: '/api/wms/skus',
        selected:(data) => this.setState({ items: data }),
        columns:[
            {
                title: '商品条码',
                key: 'barCode',
                dataIndex: 'barCode'
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
                key: 'field1',
                dataIndex: 'field1'
            },
        ]
   }

   const tableInspinProps = {
      list: items,
      loading: false,
      columns:[
        {
            title: '商品条码',
            key: 'barCode',
            dataIndex: 'barCode'
        },
        {
            title: '采购时间',
            key: 'createTime',
            dataIndex: 'createTime'
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
            title: '采购数量',
            key: 'transactionQuantities',
            render:(record,text,index) => (
                <InputNumber min={0} 
                    onChange={(e) => this.onChangeTable(index,e,'transactionQuantities')}
                />
            )
        },
        {
            title: '采购单价',
            key: 'transactionSkuPrice',
            render:(record,text,index) => (
                <InputNumber min={0} 
                    onChange={(e) => this.onChangeTable(index,e,'transactionSkuPrice')}
                />
            )
        },
        {
            title: '采购总价',
            key: 'transactionAllMoney',
            dataIndex: 'transactionAllMoney'
        },
        {
            title: '单位',
            key: 'field1',
            dataIndex: 'field1'
        },
      ]
   }


   return (
     <div style={{ backgroundColor: '#fff',padding: '20px'}}>
       <h2>{this.props.title}</h2>
       <Form>
         <Row>
          <Col span={12}>
            <FormItem label='采购单编号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('procurementCode', {
                initialValue: item.procurementCode,
              })(<Input type="text" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='供应商' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierId', {
                initialValue: item.supplierId,
                rules: [
                  {
                    required: true,
                    message:'请选择供应商'
                  },
                ],
              })(
                  <FieldOptionInput {...fieldOptionInputProps}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='采购时间' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('procurementTime', {
                initialValue: item.procurementTime ? moment(item.procurementTime,dataFormat) : '',
              })(
                <DatePicker format={dataFormat} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='经办员' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('transactionBy', {
                initialValue: item.transactionBy,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label='采购备注' hasFeedback {...formItemLayout(3,21)}>
              {getFieldDecorator('procurementNote', {
                initialValue: item.procurementNote,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='制单人' hasFeedback {...formItemLayout()}>
              { window.localStorage.username }
            </FormItem>
          </Col>
         </Row>
       </Form>
       
       <Selection {...selectionProps}/>
       <TableInSpin {...tableInspinProps} />
       <div style={{margin: '2em 0 0 0.5em',fontSize:'17px',fontWeight:'bold'}}>
          商品总金额：<span style={{color:'#f66'}}>￥{totalMoney}</span>
       </div>
        
       <div style={{textAlign: 'right',marginTop:'2em'}}>
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit()}>保存</Button>
        <Button onClick={this.props.onBack}>返回</Button>
       </div>
     </div>
   )
 }

}

export default Form.create()(PurchaseOrderForm)
