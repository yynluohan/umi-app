import React from 'react';
import { Form,Col,Row,Input,Button,message,Divider,Select,Radio,DatePicker } from 'antd';
import { query } from '../../../framework/utils/services';
import UploadFile from '../../../common/UploadFile';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import htmlToDraft from 'html-to-draftjs';
import moment from 'moment';
import FieldOptionInput from '../../../common/FieldOptionInput';
import CascaderSelect from '../../../common/CascaderSelect';
import pcd from '../../../config/pcd';


const FormItem = Form.Item;
const { TextArea } = Input;
const formatDate = window.MC.DATETIMEFORMAT;
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

class AddStoreForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      item:props.item || {},
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
      data.note = data.note.toHTML()
      this.props.onSave(data)
    });
  }


 render() {

   const { getFieldDecorator } = this.props.form;
   const { item } = this.state;

   const fieldOptionInputProps = {
     apiUrl: '/api/wms/warehouses',
     method: query,
     getway:{
       'name': 'warehouseName',
       'value': 'id'
     }
   }

   return (
     <div style={{ backgroundColor: '#fff',padding: '20px'}}>
       <h2>{this.props.title}</h2>
       <Form>
         <Row>
          <Col span={12}>
            <FormItem label='店铺编号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('code', {
                initialValue: item.code,
                rules: [
                  {
                    required: true,
                    message:'请填写店铺编号'
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='店铺名称' hasFeedback {...formItemLayout()}>
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
            <FormItem label='仓库' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('warehouseName', {
                initialValue: item.warehouseName,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <FieldOptionInput {...fieldOptionInputProps}/>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='省市区' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('pcd', {
                initialValue: item.pcd,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <CascaderSelect list={pcd}/>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label='店铺地址' hasFeedback {...formItemLayout(3,21)}>
              {getFieldDecorator('address', {
                initialValue: item.address,
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
            <FormItem label='经度' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('longitude', {
                initialValue: item.longitude,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='纬度' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('latitude', {
                initialValue: item.latitude,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='店铺类型' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('type', {
                initialValue: item.type,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value='Store'>店铺</Radio>
                  <Radio value='Muaskin'>小屋</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='联系电话' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('telephone', {
                initialValue: item.telephone,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label='描述' hasFeedback {...formItemLayout(3,21)}>
              {getFieldDecorator('note', {
                initialValue:item.note ? BraftEditor.createEditorState(item.note) : '',
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<BraftEditor />)}
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

export default Form.create()(AddStoreForm)
