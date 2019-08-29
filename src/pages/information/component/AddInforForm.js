import React from 'react';
import { Form,Col,Row,Input,Button } from 'antd';
import { query } from '../../../framework/utils/services';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import PicturesWall from '../../../common/PicturesWall';
// import Selection from '../../../common/Selection';

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

class AddInforForm extends React.Component {

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
    const { validateFields,getFieldsValue } = this.props.form;
    validateFields((errors) => {
      if (errors) {
        return;
      }
      let data = {
        ...getFieldsValue(),
        content: getFieldsValue().content && getFieldsValue().content.toHTML()
      };
      this.props.onSave(data)
    });
  }


 render() {

   const { getFieldDecorator } = this.props.form;
   const { item } = this.state;
   

   const statusConvert = (typeValue) => {
    if(typeValue == 'ONSELL'){
      return <span style={{color:'rgb(82, 196, 26)'}}>在售</span>;
    }else if(typeValue == 'OFFSELL'){
      return <span style={{color:'red'}}>下架</span>;
    }
   }


   const seletionProps = {
      modalTitle: '选择产品',
      butName:'请选择',
      isButton:true,
      method:query,
      apiUrl:'/rest/product_search',
      columns:[
        { title: '货品编号', key: 'id', dataIndex: 'id' },
        { title: '货品类型', key: 'category_name', dataIndex: 'category_name' },
        { title: '货品名称', key: 'name', dataIndex: 'name' },
        {
          title: '图片',
          key: 'cover',
          render: (record) => (
            <img style={{width: '50px'}} src={record.cover} alt='cover'/>
          )
        },
        { title: '库存数量', key: 'stock_balance', dataIndex: 'stock_balance' },
        {
          title: '状态',
          key: 'status',
          render: (record,text,index) => (
            <>{record.status != undefined ? statusConvert(record.status) : ''}</>
          )
        },
      ],
      fields: [{
        labelName:'名称',
        fieldName: 'name'
      }],
      selected(selectedData){
        console.log('选中的项 === ', selectedData)
        //TODO
        //提交的字段 productRelations
      }
   }

   const strToJson = (jsonStr) => {
    return jsonStr && jsonStr.length > 0 && eval(jsonStr);
   }

   return (
     <div style={{ backgroundColor: '#fff',padding: '20px'}}>
       <h2>{this.props.title}</h2>
       <Form>
         <Row>
          <Col span={24}>
            <FormItem label='标题' hasFeedback {...formItemLayout(3,21)}>
              {getFieldDecorator('title', {
                initialValue: item.title,
                rules: [
                  {
                    required: true,
                    message:'请填写标题'
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='子标题' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('subTitle', {
                initialValue: item.subTitle,
                rules: [
                  {
                    required: true,
                    message:'请填写子标题'
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='排序号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('sticky', {
                initialValue: item.sticky,
                rules: [
                  {
                    required: true,
                    message:'请填写排序号'
                  },
                ],
              })(<Input type="number"/>)}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label='封面' hasFeedback {...formItemLayout(3,21)}>
              {getFieldDecorator('cover', {
                initialValue: item.cover,
                rules: [
                  {
                    required: true,
                    message:'请上传封面'
                  },
                ],
              })(<PicturesWall maxNumber={1} fileList={strToJson(item.cover) || []}/>)}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label='描述' hasFeedback {...formItemLayout(3,21)}>
              {getFieldDecorator('content', {
                initialValue:item.content ? BraftEditor.createEditorState(item.content) : '',
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<BraftEditor />)}
            </FormItem>
          </Col>
          
          {/* <Col span={24}>
            <FormItem label='推荐相关产品' hasFeedback {...formItemLayout(3,21)}>
              <Selection {...seletionProps}/>
            </FormItem>
          </Col> */}
         </Row>
       </Form>

       <div style={{textAlign: 'right',marginTop:'2em'}}>
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit()}>提交</Button>
        <Button onClick={this.props.onBack}>返回</Button>
       </div>
     </div>
   )
 }

}

export default Form.create()(AddInforForm)
