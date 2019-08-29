import React from 'react';
import { Form,Col,Row,Input,Button,DatePicker,InputNumber } from 'antd';
import FormIemView from '../../../common/FormIemView'
import FieldOptionInput from '../../../common/FieldOptionInput';
import { query } from '../../../framework/utils/services';
import moment from 'moment';
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

class PurchaseOrderPutForm extends React.Component {

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

  onSubmit = () => {
    const { validateFields,getFieldsValue, } = this.props.form;
    const { item,items } = this.state;
    validateFields((errors) => {
      if (errors) {
        return;
      }
      let data = {
        ...item,
        items,
        originatorName: window.localStorage.username || '',
        ...getFieldsValue(),
      };
      this.props.onSave(data)
    });
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

   const { getFieldDecorator } = this.props.form;
   const { item } = this.state;

   const formItemViewProps = {
    isHiddenBackBut:true,
    list: [
        {label:'采购单编号',data: item.procurementCode},
        {label:'供应商',data:item.supplierName},
        {label:'创建时间',data:item.transactionTime},
        {label:'制单人',data:item.originatorName},
        {label:'备注',data:item.procurementNote},
        {label: '入库记录',data: item.inHistories,
          columns:[
            {title: '商品条码',value: 'skuBarcode'},
            {title: '入库时间',value: 'transactionTime'},
            {title: '商品编号',value: 'skuCode'},
            {title: '商品名称',value: 'skuName'},
            {title: '入库数量',value: 'transactionQuantities'},
            {title: '入库价格',value: 'transactionSkuPrice'},
            {title: '单位',value: 'skuUnit'},
         ],
         otherData:[
            {title: '入库单编号',value: item.inHistories && item.inHistories.length > 0 && item.inHistories[0].storageInCode},
            {title: '入库仓',value: item.inHistories && item.inHistories.length > 0 && item.inHistories[0].warehouseName},
            {title: '经办人',value: item.inHistories && item.inHistories.length > 0 && item.inHistories[0].transactionName},
            {title: '入库备注',value: item.inHistories && item.inHistories.length > 0 && item.inHistories[0].storageInNote},
            {title: '采购单编号',value: item.inHistories && item.inHistories.length > 0 && item.inHistories[0].procurementCode},
            {title: '采购员',value: item.inHistories && item.inHistories.length > 0 && item.inHistories[0].buyer},
            {title: '采购日期',value: item.inHistories && item.inHistories.length > 0 && item.inHistories[0].procurementDate},
         ]
      }
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
          title: '采购总数',
          key: 'totalCount',
          dataIndex: 'totalCount'
      },
      {
        title: '待审核的数量',
        key: 'auditCount',
        dataIndex: 'auditCount'
      },
      {
        title: '已入库数',
        key: 'sectionInCount',
        dataIndex: 'sectionInCount'
      },
      {
          title: '本次入库数量',
          key: 'transactionQuantities',
          render:(record,text,index) => (
              <InputNumber min={0} 
                  onChange={(e) => this.onChangeTable(index,e,'remainderCount')}
                  value={record.remainderCount}
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
       <FormIemView {...formItemViewProps}/>
       <Form>
         <Row>
          <Col span={12}>
            <FormItem label='入库仓库' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierId', {
                initialValue: item.supplierId,
                rules: [
                  {
                    required: true,
                    message:'请选择入库仓库'
                  },
                ],
              })(<FieldOptionInput method={query} apiUrl='/api/wms/warehouses' getway={{name: 'warehouseName',value:'id'}} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='入库单号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('field2', {
                initialValue: item.field2,
                rules: [
                  {
                    required: true,
                    message:'请填写入库单号'
                  },
                ],
              })( <Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='操作时间' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('transactionTime', {
                initialValue: item.transactionTime ? moment(item.transactionTime,dataFormat) : '',
                rules: [
                  {
                    required: true,
                    message:'请选择操作时间'
                  },
                ],
              })(
                <DatePicker fromat={dataFormat} />
                )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='经办员' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('transactionBy', {
                initialValue: item.transactionBy,
                rules: [
                  {
                    required: false,
                    message:'请填写经办员'
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='备注' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('procurementNote', {
                initialValue: item.procurementNote,
                rules: [
                  {
                    required: false,
                    message:'请填写备注'
                  },
                ],
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
       <TableInSpin {...tableInspinProps} />
       <div style={{textAlign: 'right',marginTop:'2em'}}>
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit()}>保存</Button>
        <Button onClick={this.props.onBack}>返回</Button>
       </div>
     </div>
   )
 }

}

export default Form.create()(PurchaseOrderPutForm)
