import React from 'react';
import { Form,Col,Row,Input,Button } from 'antd';
import CascaderSelect from '../../../common/CascaderSelect';
import pcd from '../../../config/pcd';

const FormItem = Form.Item;
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

class WarehoseForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      item:props.item || {},
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
            <FormItem label='仓库编号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('warehouseCode', {
                initialValue: item.warehouseCode,
                rules: [
                  {
                    required: true,
                    message:'请填写仓库编号'
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='仓库名称' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('warehouseName', {
                initialValue: item.warehouseName,
                rules: [
                  {
                    required: true,
                    message:'请填写仓库名称'
                  },
                ],
              })( <Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='所在省市' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('warehousePCD', {
                initialValue: item.warehousePCD,
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
              {getFieldDecorator('warehouseAddress', {
                initialValue: item.warehouseAddress,
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

export default Form.create()(WarehoseForm)
