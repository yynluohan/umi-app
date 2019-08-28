import React from 'react';
import { Form,Col,Row,Input,Button } from 'antd';
import { query } from '../../../framework/utils/services';
import FieldOptionInput from '../../../common/FieldOptionInput';



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

class GoodsForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      item:props.item || {},
    }
    this.getProcurementCode()
  }

  getProcurementCode = () => {
    let { item } = this.state;
    query('/api/pub/sn/serial',{prefix: 'P'}).then(({ code,data }) => {
        if (code === 200) {
          item.productCode = data
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
            <FormItem label='商品编号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('productCode', {
                initialValue: item.productCode,
                rules: [
                  {
                    required: true,
                    message:'请填写商品编号'
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='商品分类' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('productCategoryId', {
                initialValue: item.productCategoryId,
                rules: [
                  {
                    required: true,
                    message:'请选择商品分类'
                  },
                ],
              })( <FieldOptionInput apiUrl='/api/product/categories?pageSize=100000' method={query} getway={{name: 'categoryName',value:'id'}} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='条形码' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('barCode', {
                initialValue: item.barCode,
                rules: [
                  {
                    required: true,
                    message:'请填写条形码'
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='商品名称' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                    message:'请填写商品名称'
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='单位' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('field1', {
                initialValue: item.field1,
                rules: [
                  {
                    required: true,
                    message:'请填写单位'
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='参考成本价格' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('costPrice', {
                initialValue: item.costPrice,
                rules: [
                  {
                    required: true,
                    message:'请填写参考成本价格'
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='商品重量' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('weight', {
                initialValue: item.weight,
                rules: [
                  {
                    required: false,
                    message:'请填写商品重量'
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='商品规格' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('spec', {
                initialValue: item.spec,
                rules: [
                  {
                    required: false,
                    message:'请填写商品规格'
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='商品体积' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('volume', {
                initialValue: item.volume,
                rules: [
                  {
                    required: false,
                    message:'请填写商品体积'
                  },
                ],
              })(<Input type="text" />)}
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

export default Form.create()(GoodsForm)
