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

class DistributorOutForm extends React.Component {

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

  //获取分销单编号
  getProcurementCode = () => {
      query('/api/pub/sn/serial',{prefix: 'SAL'}).then(({ code,data }) => {
          console.log('55555',code,data )
          if (code === 200) {
            this.setState({
                item:{
                    salesCode: data
                }
            })
          }
      })
  }

  //表格分销数量分销订单发生改变时触发
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
        message.error('请选择需要分销的商品！');
        return;
      }
      outItems.length > 0 && outItems.map((item,index) => {
        outItems[index] = {
          ...item,
          skuId: item.id
        }
      })
      let data = {
        ...item,
        outItems,
        originatorName: window.localStorage.username || '',
        ...getFieldsValue(),
      };
      this.props.onSave(data)
    });
  }
  


 render() {

   const { getFieldDecorator } = this.props.form;
   let { item,outItems } = this.state;
   let totalMoney = 0;

   outItems.length > 0 && outItems.map((item,index) => {
       outItems[index] = {
           ...item,
           transactionAllMoney: (item.transactionQuantities || 0) * (item.transactionSkuPrice || 0)
       }
       totalMoney += (item.transactionQuantities || 0) * (item.transactionSkuPrice || 0)
   })

   console.log('8888',outItems)


   const fieldOptionInputProps = {
       apiUrl: '/api/warehouse/traders',
       method:query,
       getway:{
           name: 'traderName',
           value: 'id'
       },
       onSelected:(data) => this.setState({ item:{...item,deliveredAddress:data.deliveredAddress}})
   }

   const selectionProps = {
        type: 'checkbox',
        butName:'+ 添加',
        isButton: true,
        method: query,
        apiUrl: '/api/wms/skus',
        selected:(data) => this.setState({ outItems: outItems.concat(data) }),
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
      list: outItems,
      loading: false,
      columns:[
        {
            title: '商品条码',
            key: 'barCode',
            dataIndex: 'barCode'
        },
        {
            title: '时间',
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
            render:(record,text,index) => (
                <InputNumber min={0} 
                    onChange={(e) => this.onChangeTable(index,e,'transactionSkuPrice')}
                    value={record.transactionSkuPrice}
                />
            )
        },
        {
            title: '分销总价',
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
            <FormItem label='分销订单编号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('salesCode', {
                initialValue: item.salesCode,
              })(<Input type="text" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='分销商' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('traderId', {
                initialValue: item.traderId,
                rules: [
                  {
                    required: true,
                    message:'请选择分销商'
                  },
                ],
              })(
                  <FieldOptionInput {...fieldOptionInputProps}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='收货地址' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('deliveredAddress', {
                initialValue: item.deliveredAddress,
                rules: [
                  {
                    required: true,
                    message:'请选择收货地址'
                  },
                ],
              })(
                  <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='时间' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('salesTime', {
                initialValue: item.salesTime ? moment(item.salesTime,dataFormat) : '',
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
            <FormItem label='分销备注' hasFeedback {...formItemLayout(3,21)}>
              {getFieldDecorator('salesNote', {
                initialValue: item.salesNote,
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

export default Form.create()(DistributorOutForm)
