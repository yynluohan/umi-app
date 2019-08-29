import React from 'react';
import { Form,Col,Row,Input,Button,DatePicker,message } from 'antd';
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

class InventoryForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      item: {},
      skuRecords: [], //选中的产品
    }
    if (!this.props.title.includes('编辑')) {
      this.getProcurementCode()
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.item) {
      this.setState({
        item: nextProps.item,
        skuRecords: this.state.skuRecords.length > 0 ? this.state.skuRecords : nextProps.item.skuRecords
      })
    }
  }

  //获取盘点编号
  getProcurementCode = () => {
      let { item } = this.state;
      query('/api/pub/sn/serial',{prefix: 'CHK'}).then(({ code,data }) => {
          if (code === 200) {
            item.checkCode = data
            this.setState({
                item
            })
          }
      }) 
  }

  onSubmit = () => {
    const { validateFields,getFieldsValue } = this.props.form;
    const { skuRecords,item } = this.state;
    validateFields((errors) => {
      if (errors) {
        return;
      }
      if (skuRecords.length === 0) {
        message.error('请选择需要盘点的商品！');
        return;
      }
      skuRecords.length > 0 && skuRecords.map((item,index) => {
        skuRecords[index] = {
          ...item,
          skuId: item.id,
          deservedQuantities: item.validSku || (item.deservedQuantities || 0),
        }
    })
      let data = {
        ...item,
        skuRecords,
        checkSkus:skuRecords, 
        originatorName:window.localStorage.username || '',
        disableItemsSelect: true,
        ...getFieldsValue(),
      };
      this.props.onSave(data)
    });
  }
  


 render() {

   const { getFieldDecorator } = this.props.form;
   let { item,skuRecords } = this.state;

   let total = 0;
   skuRecords.length > 0 && skuRecords.map((item,index) => {
    total += (item.validSku || item.deservedQuantities)
   })

   const selectionProps = {
        type: 'checkbox',
        butName:'+ 添加',
        isButton: true,
        method: query,
        apiUrl: '/api/wms/inventories',
        selected:(data) => this.setState({ skuRecords: skuRecords.concat(data) }),
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
      list: skuRecords,
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
            key: 'validSku',
            dataIndex: 'validSku'
        },
      ]
   }


   return (
     <div style={{ backgroundColor: '#fff',padding: '20px'}}>
       <h2>{this.props.title}</h2>
       <Form>
         <Row>
          <Col span={12}>
            <FormItem label='盘点编号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('checkCode', {
                initialValue: item.checkCode,
                rules: [
                    {
                      required: true,
                      message:'请填写盘点编号'
                    },
                  ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='盘点仓库' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('warehouseId', {
                initialValue: item.warehouseId,
                rules: [
                  {
                    required: false,
                    message:'请选择盘点仓库'
                  },
                ],
              })(
                  <FieldOptionInput method={query} apiUrl='/api/wms/warehouses?pageSize=100000' getway={{name: 'warehouseName',value: 'id'}}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='盘点人' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('transactionBy', {
                initialValue: item.transactionBy,
                rules: [
                  {
                    required: false,
                    message:'请填写盘点人'
                  },
                ],
              })(
                 <Input />
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='盘点时间' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('checkTime', {
                initialValue: item.checkTime ? moment(item.checkTime,dataFormat) : '',
                rules: [
                    {
                      required: false,
                      message:'请选择盘点时间'
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
              {getFieldDecorator('checkNote', {
                initialValue: item.checkNote,
              })(
                <Input />
              )}
            </FormItem>
          </Col>
         </Row>
       </Form>
       
       <Selection {...selectionProps}/>
       <TableInSpin {...tableInspinProps} />
    
       <div style={{margin: '2em 0 0 0.5em',fontSize:'17px',fontWeight:'bold'}}>
          总计：<span style={{color:'#f66'}}>{total}</span>
       </div>
       <div style={{textAlign: 'right',marginTop:'2em'}}>
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit()}>保存</Button>
        <Button onClick={this.props.onBack}>返回</Button>
       </div>
     </div>
   )
 }

}

export default Form.create()(InventoryForm)
