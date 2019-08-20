import React from 'react';
import { Form,Col,Row,Input,Button,message,Divider,Select,Radio,DatePicker } from 'antd';
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
    let list = ['标题','订单号','订单金额','收货人','收货地址','联系电话','备注'];
    list.map((item,index) => {
      list[index] = {
        title: item,
        value: '',
        name: ''
      }
    })

    this.state = {
      item:props.item || {},
      list
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

  onChange = (a,b,c) => {
    let { list } = this.state;
    list[b][c] = a.target.value;
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
         key:'name',
         render:(record,text,index) => (
           <Input placeholder='模板消息属性，与公众号的模板对应'
            onChange={(e) => this.onChange(e,index,'name')}
           />
         )
       },
       {
         title: '属性名',
         key:'value',
         render:(record,text,index) => (
           <Input placeholder='若配置此值，则模板消息按照该值来显示'
            onChange={(e) => this.onChange(e,index,'value')}
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
                    message:'请填写店铺编号'
                  },
                ],
              })(
                <Select>
                  <Option value='成功下单通知'>成功下单通知</Option>
                  <Option value='订单退款通知'>订单退款通知</Option>
                  <Option value='取消订单通知'>取消订单通知</Option>
                  <Option value='订单支付超时通知'>订单支付超时通知</Option>
                  <Option value='订单发货通知'>订单发货通知</Option>
                  <Option value='订单退款申请通知'>订单退款申请通知</Option>
                  <Option value='提现申请提交成功通知'>提现申请提交成功通知</Option>
                  <Option value='提现申请处理中通知'>提现申请处理中通知</Option>
                  <Option value='提现申请被拒绝通知'>提现申请被拒绝通知</Option>
                  <Option value='成功提现通知'>成功提现通知</Option>
                  <Option value='优惠券发送通知'>优惠券发送通知</Option>
                  <Option value='优惠券即将到期通知'>优惠券即将到期通知</Option>
                  <Option value='成为临时皇冠商通知'>成为临时皇冠商通知</Option>
                  <Option value='成为星级经销商通知'>成为星级经销商通知</Option>
                  <Option value='临时皇冠商撤销通知'>临时皇冠商撤销通知</Option>
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
          <Col span={24}>
            <FormItem label='属性配置' hasFeedback {...formItemLayout(2,22)}>
              <TableInSpin {...tableInSpinProps}/>
            </FormItem>
          </Col>
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
