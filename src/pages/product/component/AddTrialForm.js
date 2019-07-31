import React from 'react';
import { Form,Col,Row,Input,Button,message,Divider,Select,Radio,DatePicker } from 'antd';
import { query } from '../../../framework/utils/services';
import UploadFile from '../../../common/UploadFile';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import htmlToDraft from 'html-to-draftjs';
import TableInSpin from '../../../common/TableInSpin';
import Selection from '../../../common/Selection';

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

class AddTrialForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      item:props.item || {},
      productList: [],  // 关联的产品
    }
  }



  componentWillReceiveProps(nextProps) {
    console.log('RRR ',nextProps);
    if (nextProps.item != undefined) {
      this.setState({
        item: nextProps.item,
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
      const productDescription = item && item.productDescription ? item.productDescription : {}
      if (data.description) {
        data.productDescription = {
          ...productDescription,
          description: data.description.toHTML()
        }
      }
      delete data.description
      this.props.onSave(data)
    });
  }


 render() {

   const { getFieldDecorator } = this.props.form;
   const { item,productList } = this.state;

   console.log('mmmmm===',item);

   const uploadProps = {

   }

   const selectionProps = {
     isButton:true,
     modalWidth:800,
     butName:'选择产品',
     modalTitle: '选择产品',
     apiUrl:'/api/crud/product/products',
     fields: ['name'],
     method: query,
     columns:[
       {
         title: '名称',
         key: 'name',
         dataIndex: 'name'
       },
       {
         title: '价格',
         key: 'price',
         dataIndex: 'price'
       }
     ],
     selected:(data) => this.setState({ productList: data }),
   }

   const tableProps = {
     list: productList,
     loading: false,
     columns:[
       {
         title: '',
         key: '',
         render: (record) => (
           <img style={{width: '50px'}} src={record.cover} alt='cover'/>
         )
       },
       {
         title: '产品名称',
         dataIndex: 'name',
         key: 'name'
       },
       {
         title: '成本价',
         dataIndex: 'costPrice',
         key: 'costPrice'
       },
       {
         title: '市场价',
         dataIndex: 'suggestedPrice',
         key: 'suggestedPrice'
       },
       {
         title: '零售价',
         dataIndex: 'price',
         key: 'price'
       },
       {
         title: '操作',
         key: 'oprate',
         render: (record) => (
           <a onClick={() => this.setState({ productList: []})}>移除</a>
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
            <FormItem label='名称' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                    message:'请填写名称'
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='简短描述' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('shortNote', {
                initialValue: item.shortNote,
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
            <FormItem label='开始时间' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('startTime', {
                initialValue: item.startTime,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <DatePicker format={formatDate} style={{width:'200px'}} />
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='结束时间' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('endTime', {
                initialValue: item.endTime,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <DatePicker format={formatDate} style={{width:'200px'}} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='排序号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('index', {
                initialValue: item.index,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Input type='number'/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='是否启用' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('enabled', {
                initialValue: item.enabled,
                rules: [
                  {
                    required: true,
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
            <FormItem label='封面' hasFeedback {...formItemLayout(3,20)}>
              {getFieldDecorator('cover', {
                initialValue: item.cover,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<UploadFile {...uploadProps} />)}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label='关联产品' hasFeedback {...formItemLayout(3,20)}>
              <Selection {...selectionProps}/>
              <TableInSpin {...tableProps}/>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label='描述' hasFeedback {...formItemLayout(3,20)}>
              {getFieldDecorator('description', {
                initialValue: item.productDescription && htmlToDraft(item.productDescription.description),
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

export default Form.create()(AddTrialForm)
