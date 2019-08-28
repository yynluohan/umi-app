import React from 'react';
import { Form,Col,Row,Input,Button,DatePicker,InputNumber,message,Select } from 'antd';
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

class TransferForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      item: {},
      outItems: [], //选中的产品
    }
    if (!this.props.title.includes('编辑')) {
      this.getProcurementCode()
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.item) {
      this.setState({
        item: nextProps.item,
        outItems: this.state.outItems.length > 0 ? this.state.outItems : nextProps.item.outItems
      })
    }
  }

  //获取入库编号
  getProcurementCode = () => {
      let { item } = this.state;
      query('/api/pub/sn/serial',{prefix: 'TRF'}).then(({ code,data }) => {
          if (code === 200) {
            item.transactionCode = data
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

  //表格入库数量发生改变时触发
  onChangeTable = (a,b,c) => {
    let { outItems } = this.state;
    outItems[a][c] = b;
    this.setState({
        outItems
    })
  }

  onSubmit = () => {
    const { validateFields,getFieldsValue } = this.props.form;
    const { outItems,item } = this.state;
    validateFields((errors) => {
      if (errors) {
        return;
      }
      if (outItems.length === 0) {
        message.error('请选择需要入库的商品！');
        return;
      }
      let procurementTotal = 0;
      let productRefundQuantities = 0;
      outItems.length > 0 && outItems.map((item,index) => {
        outItems[index] = {
          ...item,
          skuId: item.id
        }
        procurementTotal += (item.transactionQuantities || 0) * (item.transactionSkuPrice || 0);
        productRefundQuantities += item.transactionQuantities;
    })
      let data = {
        ...item,
        outItems,
        originatorName:window.localStorage.username || '',
        procurementTotal,
        productRefundQuantities,
        ...getFieldsValue(),
      };
      this.props.onSave(data)
    });
  }
  


 render() {

   const { getFieldDecorator } = this.props.form;
   let { item,outItems } = this.state;


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
        apiUrl: '/api/wms/inventories',
        selected:(data) => this.setState({ outItems: outItems.concat(data) }),
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
                key: 'field1',
                dataIndex: 'field1'
            },
        ]
   }

   const tableInspinProps = {
      list: outItems,
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
            title: '库存余量',
            key: 'validSku',
            dataIndex: 'validSku'
        },
        {
            title: '调拨数量',
            key: 'transactionQuantities',
            render:(record,text,index) => (
                <InputNumber min={0} 
                    onChange={(e) => this.onChangeTable(index,e,'transactionQuantities')}
                    value={record.transactionQuantities}
                />
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
       <Form>
         <Row>
          <Col span={12}>
            <FormItem label='调拨编号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('transactionCode', {
                initialValue: item.transactionCode,
                rules: [
                    {
                      required: true,
                      message:'请填写调拨编号'
                    },
                  ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='出库编号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('field1', {
                initialValue: item.field1,
                rules: [
                    {
                      required: true,
                      message:'请填写出库编号'
                    },
                  ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='调出仓库' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('fromWarehouseId', {
                initialValue: item.fromWarehouseId,
                rules: [
                  {
                    required: false,
                    message:'请选择仓库'
                  },
                ],
              })(
                  <FieldOptionInput method={query} apiUrl='/api/wms/warehouses?pageSize=100000' getway={{name: 'warehouseName',value: 'id'}}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='调入仓库' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('toWarehouseId', {
                initialValue: item.toWarehouseId,
                rules: [
                  {
                    required: false,
                    message:'请选择仓库'
                  },
                ],
              })(
                  <FieldOptionInput method={query} apiUrl='/api/wms/warehouses?pageSize=100000' getway={{name: 'warehouseName',value: 'id'}}/>
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

          <Col span={12}>
            <FormItem label='操作时间' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('transactionTime', {
                initialValue: item.transactionTime ? moment(item.transactionTime,dataFormat) : '',
                rules: [
                    {
                      required: false,
                      message:'请选择操作时间'
                    },
                  ],
            })(
                <DatePicker format={dataFormat} />
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='制单人' hasFeedback {...formItemLayout()}>
              { window.localStorage.username }
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem label='备注' hasFeedback {...formItemLayout(3,21)}>
              {getFieldDecorator('note', {
                initialValue: item.note,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
         </Row>
       </Form>
       
       <Selection {...selectionProps}/>
       <TableInSpin {...tableInspinProps} />
        
       <div style={{textAlign: 'right',marginTop:'2em'}}>
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit()}>保存</Button>
        <Button onClick={this.props.onBack}>返回</Button>
       </div>
     </div>
   )
 }

}

export default Form.create()(TransferForm)