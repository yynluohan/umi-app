import React from 'react';
import { Form,Col,Row,Input,Button,message,Select,Radio } from 'antd';
import { query } from '../../../framework/utils/services';
import TableInSpin from '../../../common/TableInSpin'

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = (a,b) => {
  return {
    labelCol: {
      span: a || 4,
    },
    wrapperCol: {
      span: b || 20,
    },
  }
}

class WechatTemplateForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      item:props.item || {},
      list: []
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.item) {
      this.setState({
        item: nextProps.item
      })
    }
  }

  onSubmit = () => {
    const { validateFields,getFieldsValue } = this.props.form;
    const { list,item } = this.state;
    validateFields((errors) => {
      if (errors) {
        return;
      }
      let data = {
        ...item,
        list,
        ...getFieldsValue(),
      };
      this.props.onSave(data)
    });
  }

  onChangeInput = (a,b,c) => {
    let { list } = this.state;
    list[b][c] = a.target.value;
    this.setState({
      list
    })
  }

  onChangeType = (e) => {
    let list = [];
    const typeObj = {
      'orderCreated': ['标题','订单号','订单金额','收货人','收货地址','联系电话','备注'],
      'orderCefunded':['标题','订单号','订单金额','退款时间','备注'],
      'orderCanceled':['标题','订单号','订单金额','取消时间','备注'],
      'orderPayTimeout': ['标题','订单号','备注'],
      'orderDelivering': ['标题','订单号','快递公司','快递单号','收件人','备注'],
      'orderServiceCreated':['标题','订单号','退款金额','备注'],
      'rewardCashApplying': ['标题','订单号','申请时间','备注'],
      'rewardCashHandling': ['标题','备注'],
      'rewardCashRejected': ['标题','拒绝时间','拒绝原因','备注'],
      'rewardCashCompleted': ['标题','金额','提现成功时间','备注'],
      'couponDispatched': ['标题','消息','到期日','备注'],
      'couponOverdue': ['标题','消息','到期日','备注'],
      'tempCrownApproved': ['标题','授权人','被授权人','授权状态','备注'],
      'physicalSellerApproved': ['标题','授权人','被授权人','授权状态','备注'],
      'tempCrownResetted': ['标题','时间','原因','备注'],
    }
    typeObj[e].map((item,index) => {
      list[index] = {
        title: item,
        displayAttr:'',
        displayValue: ''
      }
    })
    this.setState({
      list
    })
  }

 render() {

   const { getFieldDecorator } = this.props.form;
   const { item,list } = this.state;

   console.log('66660',list)

   const tableInSpinProps = {
     loading: false,
     list,
     columns:[
       {
         title: '属性名',
         key:'title',
         dataIndex:'title'
       },
       {
         title: '模板消息属性',
         key:'displayAttr',
         render:(record,text,index) => (
           <Input placeholder='模板消息属性，与公众号的模板对应'
            onChange={(e) => this.onChangeInput(e,index,'displayAttr')}
           />
         )
       },
       {
         title: '属性名',
         key:'displayValue',
         render:(record,text,index) => (
           <Input placeholder='若配置此值，则模板消息按照该值来显示'
            onChange={(e) => this.onChangeInput(e,index,'displayValue')}
           />
         )
       }
     ]
   }

   return (
     <div style={{ backgroundColor: '#fff',padding: '20px'}}>
       <h2>{this.props.title}</h2>
       <Form>
         <Row>
          <Col span={12}>
            <FormItem label='类型' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('type', {
                initialValue: item.type,
                rules: [
                  {
                    required: true,
                    message:'请选择类型'
                  },
                ],
              })(
                <Select onChange={(e) => this.onChangeType(e)}>
                  <Option value='orderCreated'>成功下单通知</Option>
                  <Option value='orderCefunded'>订单退款通知</Option>
                  <Option value='orderCanceled'>取消订单通知</Option>
                  <Option value='orderPayTimeout'>订单支付超时通知</Option>
                  <Option value='orderDelivering'>订单发货通知</Option>
                  <Option value='orderServiceCreated'>订单退款申请通知</Option>
                  <Option value='rewardCashApplying'>提现申请提交成功通知</Option>
                  <Option value='rewardCashHandling'>提现申请处理中通知</Option>
                  <Option value='rewardCashRejected'>提现申请被拒绝通知</Option>
                  <Option value='rewardCashCompleted'>成功提现通知</Option>
                  <Option value='couponDispatched'>优惠券发送通知</Option>
                  <Option value='couponOverdue'>优惠券即将到期通知</Option>
                  <Option value='tempCrownApproved'>成为临时皇冠商通知</Option>
                  <Option value='physicalSellerApproved'>成为星级经销商通知</Option>
                  <Option value='tempCrownResetted'>临时皇冠商撤销通知</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='名称' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                    message:'请填写名称'
                  },
                ],
              })( <Input />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='模板id' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('id', {
                initialValue: item.id,
                rules: [
                  {
                    required: true,
                    message:'请填写模板id'
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='是否启用' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('enabled', {
                initialValue: item.enabled,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          {
            list.length > 0 ?
            <Col span={24}>
              <FormItem label='属性配置' hasFeedback {...formItemLayout(2,22)}>
                <TableInSpin {...tableInSpinProps}/>
              </FormItem>
            </Col>
            : ''
          }
         </Row>
       </Form>

       <div style={{textAlign: 'right',marginTop:'2em'}}>
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit()}>保存</Button>
        <Button onClick={this.props.onBack}>返回</Button>
       </div>
     </div>
   )
 }

}

export default Form.create()(WechatTemplateForm)
