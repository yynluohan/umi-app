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

class PurchaseReturnForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      item: {},
      items: [], //选中的产品
    }
    if (!this.props.title.includes('编辑')) {
      this.getProcurementCode()
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.item) {
      this.setState({
        item: nextProps.item,
        items: this.state.items.length > 0 ? this.state.items : nextProps.item.items
      })
    }
  }

  //获取退货单编号
  getProcurementCode = () => {
      let { item } = this.state;
      query('/api/pub/sn/serial',{prefix: 'REF'}).then(({ code,data }) => {
          if (code === 200) {
            item.productRefundCode = data
            this.setState({
                item
            })
          }
      })
      query('/api/pub/sn/serial',{prefix: 'OUT'}).then(({ code,data }) => {
        if (code === 200) {
          item.field1 = data
          this.setState({
            item
        })
        }
    })
    
  }

  //表格退货数量退货订单发生改变时触发
  onChangeTable = (a,b,c) => {
    let { items } = this.state;
    items[a][c] = b;
    this.setState({
       items
    })
  }

  onSubmit = (statusData) => {
    const { validateFields,getFieldsValue } = this.props.form;
    const { items,item } = this.state;
    validateFields((errors) => {
      if (errors) {
        return;
      }
      if (items.length === 0) {
        message.error('请选择需要退货的商品！');
        return;
      }
      let procurementTotal = 0;
      let productRefundQuantities = 0;
      items.length > 0 && items.map((item,index) => {
        items[index] = {
          ...item,
          skuId: item.id
        }
        procurementTotal += (item.transactionQuantities || 0) * (item.transactionSkuPrice || 0);
        productRefundQuantities += item.transactionQuantities;
    })
      let data = {
        ...item,
        items,
        originatorName:window.localStorage.username || '',
        procurementTotal,
        productRefundQuantities,
        ...getFieldsValue(),
      };
      this.props.onSave(data,statusData)
    });
  }
  


 render() {

   const { getFieldDecorator } = this.props.form;
   let { item,items } = this.state;

   console.log('9999',item)

   let totalMoney = 0;

   items.length > 0 && items.map((item,index) => {
       items[index] = {
           ...item,
           transactionTotalSkuPrice: (item.transactionQuantities || 0) * (item.transactionSkuPrice || 0)
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
        selected:(data) => this.setState({ items: items.concat(data) }),
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
            title: '可退货数量',
            key: 'number',
            dataIndex: 'number'
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
            render:(record,text,index) => (
                <InputNumber min={0} 
                    onChange={(e) => this.onChangeTable(index,e,'transactionSkuPrice')}
                    value={record.transactionSkuPrice}
                />
            )
        },
        {
            title: '退货总价',
            key: 'transactionTotalSkuPrice',
            dataIndex: 'transactionTotalSkuPrice'
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
       <Form>
         <Row>
          <Col span={12}>
            <FormItem label='退货单编号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('productRefundCode', {
                initialValue: item.productRefundCode,
                rules: [
                    {
                      required: true,
                      message:'请填写退货单编号'
                    },
                  ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='出库单编号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('field1', {
                initialValue: item.field1,
                rules: [
                    {
                      required: true,
                      message:'请填写出库单编号'
                    },
                  ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='关联采购单' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('productProcurementId', {
                initialValue: item.productProcurementId,
                rules: [
                  {
                    required: false,
                    message:'请选择采购单'
                  },
                ],
              })(
                  <FieldOptionInput method={query} apiUrl='/api/wms/procurements?pageSize=100000' getway={{name: 'procurementCode',value: 'id'}}/>
              )}
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
                  <FieldOptionInput method={query} apiUrl='/api/wms/suppliers?pageSize=100000' getway={{name: 'supplierName',value:'id'}}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='退货所在仓库' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('productRefundWarehouseId', {
                initialValue: item.productRefundWarehouseId,
                rules: [
                  {
                    required: true,
                    message:'请选择退货所在仓库'
                  },
                ],
              })(
                  <FieldOptionInput method={query} apiUrl='/api/wms/warehouses?pageSize=100000' getway={{name: 'warehouseName',value:'id'}}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='退货时间' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('productRefundTime', {
                initialValue: item.productRefundTime ? moment(item.productRefundTime,dataFormat) : '',
                rules: [
                    {
                      required: true,
                      message:'请选择退货时间'
                    },
                  ],
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
            <FormItem label='备注' hasFeedback {...formItemLayout(3,21)}>
              {getFieldDecorator('productRefundNote', {
                initialValue: item.productRefundNote,
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
         {
           this.props.title.includes('编辑') ?
           <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit('审核')}>提交审核</Button>
           :
           ''
         }
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit()}>保存</Button>
        <Button onClick={this.props.onBack}>返回</Button>
       </div>
     </div>
   )
 }

}

export default Form.create()(PurchaseReturnForm)
