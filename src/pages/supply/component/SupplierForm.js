import React from 'react';
import { Form,Col,Row,Input,Button,Radio,DatePicker  } from 'antd';
import CascaderSelect from '../../../common/CascaderSelect';
import pcd from '../../../config/pcd';
import moment from 'moment';
import { query } from '../../../framework/utils/services';

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

class DistributorForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      item:props.item || {},
    }
    this.getProcurementCode()
  }

  getProcurementCode = () => {
    let { item } = this.state;
    query('/api/pub/sn/serial',{prefix: 'SEL'}).then(({ code,data }) => {
        if (code === 200) {
          item.supplierCode = data
          this.setState({
              item
          })
        }
    }) 
}

  componentWillReceiveProps(nextProps){
    if (nextProps.item) {
      this.setState({
        item: nextProps.item
      })
    }
  }

  onSubmit = () => {
    const { validateFields,getFieldsValue,item } = this.props.form;
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


 render() {

   const { getFieldDecorator } = this.props.form;
   const { item } = this.state;

   return (
     <div style={{ backgroundColor: '#fff',padding: '20px'}}>
       <h2>{this.props.title}</h2>
       <Form>
         <Row>
          <Col span={12}>
            <FormItem label='供应商编号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierCode', {
                initialValue: item.supplierCode,
                rules: [
                  {
                    required: true,
                    message:'请填写供应商编号'
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='供应商名称' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierName', {
                initialValue: item.supplierName,
                rules: [
                  {
                    required: true,
                    message:'请填写供应商名称'
                  },
                ],
              })( <Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='所在省市' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierPCD', {
                initialValue: item.supplierPCD,
                rules: [
                  {
                    required: true,
                    message:'请选择省市'
                  },
                ],
              })(
                <CascaderSelect list={pcd} data={item.warehousePCD ? item.warehousePCD.split('-') : []}/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label='详细地址' hasFeedback {...formItemLayout(3,21)}>
              {getFieldDecorator('supplierAddress', {
                initialValue: item.supplierAddress,
                rules: [
                  {
                    required: true,
                    message:'请填写详细地址'
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='邮政编码' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierPostcode', {
                initialValue: item.supplierPostcode,
                rules: [
                  {
                    required: false,
                    message:'请填写邮政编码'
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='状态' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierStatus', {
                initialValue: item.supplierStatus,
                rules: [
                  {
                    required: false,
                    message:'请选择状态'
                  },
                ],
              })(
                <Radio.Group>
                    <Radio value='Normal'>启用</Radio>
                    <Radio value='Forbidden'>禁用</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          {/* 个人信息 */}
          <Col span={12}>
            <FormItem label='联系人' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierContactName', {
                initialValue: item.supplierContactName,
                rules: [
                  {
                    required: true,
                    message:'请填写联系人'
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='联系人电话' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierContactPhone', {
                initialValue: item.supplierContactPhone,
                rules: [
                  {
                    required: false,
                    message:'请填写联系人电话'
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='联系人邮箱' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierContactEmail', {
                initialValue: item.supplierContactEmail,
                rules: [
                  {
                    required: false,
                    message:'请填写联系人邮箱'
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='联系人职位' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierContactPosition', {
                initialValue: item.supplierContactPosition,
                rules: [
                  {
                    required: false,
                    message:'请填写联系人职位'
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='联系人手机' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierContactCellPhone', {
                initialValue: item.supplierContactCellPhone,
                rules: [
                  {
                    required: false,
                    message:'请填写联系人手机'
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='供应商开户名称' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierAccountName', {
                initialValue: item.supplierAccountName,
                rules: [
                  {
                    required: false,
                    message:'请填写供应商开户名称'
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='供应商开户银行' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierAccountBank', {
                initialValue: item.supplierAccountBank,
                rules: [
                  {
                    required: false,
                    message:'请填写供应商开户银行'
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='供应商银行账号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierAccountBankNo', {
                initialValue: item.supplierAccountBankNo,
                rules: [
                  {
                    required: false,
                    message:'请填写供应商银行账号'
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='供应商发票抬头' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierInvoiceTitle', {
                initialValue: item.supplierInvoiceTitle,
                rules: [
                  {
                    required: false,
                    message:'请填写供应商发票抬头'
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='备注' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierNote', {
                initialValue: item.supplierNote,
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
            <FormItem label='供应商注册时间' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('supplierRegisterTime', {
                initialValue: item.supplierRegisterTime ? moment(item.supplierRegisterTime,dataFormat) : '',
                rules: [
                  {
                    required: false,
                    message:'请填写供应商注册时间'
                  },
                ],
              })(
                <DatePicker format={dataFormat}/>
              )}
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

export default Form.create()(DistributorForm)
