import React from 'react';
import { Form,Col,Row,Input,Button,message,Select,Radio } from 'antd';
import { query } from '../../../framework/utils/services';
import Selection from '../../../common/Selection';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input

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

class CouponTemplateForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      item:props.item || {},
      typeList: [],
      productId: '',  //选择的产品id
      productName: '', // 产品名称
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item) {
      this.setState({
        item: nextProps.item,
      })
    }
  }

  onSubmit = () => {
    const { validateFields,getFieldsValue } = this.props.form;
    const { item } = this.state;
    validateFields((errors) => {
      if (errors) {
        return;
      }
      let data = {
        ...item,
        ...getFieldsValue(),
      };
      this.props.onSave(data)
    });
  }

  onChangeType = (e) => {
    const typeObj = {
      '限制型产品代金券': ['money', 'upTo', 'productId'],
      '无限制型产品代金券': ['money', 'productId'],
      '限制型产品折扣券': ['discount', 'upTo', 'productId'],
      '无限制型产品折扣券': ['discount', 'productId'],
      '限制型订单代金券': ['money', 'upTo'],
      '无限制型订单代金券': ['money'],
      '限制型订单折扣券': ['discount','upTo'],
      '无限制型订单折扣券': ['discount']
    }
    this.setState({
      typeList: typeObj[e]
    })
  }


 render() {

   const { getFieldDecorator } = this.props.form;
   const { item,typeList,productName } = this.state;

   const selectionProps = {
     modalTitle: '选择产品',
     butName:'请选择',
     isButton: true,
     apiUrl: '/api/crud/product/products',
     method: query,
     columns:[
       {
         title: '产品名称',
         key: 'name',
         dataIndex: 'name'
       }
     ],
     selected: (data) => this.setState({ productId: data[0].id,productName:data[0].name })
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
                  <Option value='限制型产品代金券'>限制型产品代金券</Option>
                  <Option value='无限制型产品代金券'>无限制型产品代金券</Option>
                  <Option value='限制型产品折扣券'>限制型产品折扣券</Option>
                  <Option value='无限制型产品折扣券'>无限制型产品折扣券</Option>
                  <Option value='限制型订单代金券'>限制型订单代金券</Option>
                  <Option value='无限制型订单代金券'>无限制型订单代金券</Option>
                  <Option value='限制型订单折扣券'>限制型订单折扣券</Option>
                  <Option value='无限制型订单折扣券'>无限制型订单折扣券</Option>
                </Select>
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
          <Col span={12}>
            <FormItem label='名称' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: false,
                    message:'请填写名称'
                  },
                ],
              })( <Input />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='显示名称' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('displayName', {
                initialValue: item.displayName,
                rules: [
                  {
                    required: false,
                    message:'请填写显示名称'
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='有效天数' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('validDays', {
                initialValue: item.validDays,
                rules: [
                  {
                    required: false,
                    message:'请填写有效天数'
                  },
                ],
              })(<Input
                    placeholder='从领取优惠券后开始计算。建议这个时间设置为30天。'
                    type='number'
                    />
                  )}
            </FormItem>
          </Col>

          {
            typeList.length > 0 && typeList.includes('money') ?
            <Col span={12}>
              <FormItem label='金额' hasFeedback {...formItemLayout()}>
                {getFieldDecorator('money', {
                  initialValue: item.money,
                  rules: [
                    {
                      required: false,
                      message:'请填写金额'
                    },
                  ],
                })(<Input type='number'/>)}
              </FormItem>
            </Col>
            : ''
          }

          {
            typeList.length > 0 && typeList.includes('discount') ?
            <Col span={12}>
              <FormItem label='折扣' hasFeedback {...formItemLayout()}>
                {getFieldDecorator('discount', {
                  initialValue: item.discount,
                  rules: [
                    {
                      required: false,
                      message:'请填写折扣'
                    },
                  ],
                })(<Input type='number' placeholder='如打八折就填写 80'/>)}
              </FormItem>
            </Col>
            : ''
          }

          {
            typeList.length > 0 && typeList.includes('upTo') ?
            <Col span={12}>
              <FormItem label='满多少可用' hasFeedback {...formItemLayout()}>
                {getFieldDecorator('upTo', {
                  initialValue: item.upTo,
                  rules: [
                    {
                      required: false,
                      message:'请填写满多少可用'
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            : ''
          }

          {
            typeList.length > 0 && typeList.includes('productId') ?
            <Col span={24}>
              <FormItem label='选择产品' hasFeedback {...formItemLayout(2,12)}>
                <span style={{marginRight: '1em'}}>{productName || ''}</span>
                <Selection {...selectionProps}/>
              </FormItem>
            </Col>
            : ''
          }

          <Col span={12}>
            <FormItem label='描述' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('description', {
                initialValue: item.description,
                rules: [
                  {
                    required: false,
                    message:'请填写描述'
                  },
                ],
              })(<TextArea rows={3}/>)}
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

export default Form.create()(CouponTemplateForm)
