import React from 'react';
import { Form,Col,Row,Input,Button,message,Divider,Select,Radio } from 'antd';
import { query } from '../../../framework/utils/services';
import UploadFile from '../../../common/UploadFile';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import htmlToDraft from 'html-to-draftjs';

const FormItem = Form.Item;
const { TextArea } = Input
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

class AddProductForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      item:props.item || {},
      visible: false,
      typeList: [],  //产品类别
    }
  }

  componentDidMount() {
    query('/api/crud/product/productCategoryies',{pageSize: 1000000}).then(({ code,data }) => {
      if (code && code === 200) {
        this.setState({
          typeList: data.records
        })
      }
    })
  }


  componentWillReceiveProps(nextProps) {
    console.log('RRR ',nextProps);
    if (nextProps.item != undefined) {
      this.setState({
        item: nextProps.item,
      })
    }
  }

  onSubmit = (e) => {
    const { validateFields,getFieldsValue,item } = this.props.form;
    validateFields((errors) => {
      if (errors) {
        return;
      }
      let data = {
        ...item,
        ...getFieldsValue(),
      };
      if (e) {
        data.status = e
      }
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
   const { item,visible,typeList } = this.state;

   console.log('mmmmm===',item);

   const uploadProps = {

   }

   const vedioProps = {

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
            <FormItem label='缩略名称' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('shortName', {
                initialValue: item.shortName,
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
            <FormItem label='排序号' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('sortOrder', {
                initialValue: item.sortOrder,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Input type='number' />
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='推荐' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('promoted', {
                initialValue: item.promoted,
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
            <FormItem label='分区' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('partnerLevelZone', {
                initialValue: item.partnerLevelZone,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={1}>零元区</Radio>
                  <Radio value={2}>精品区</Radio>
                  <Radio value={3}>特价区</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='价格' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('price', {
                initialValue: item.price,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input type='number' />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='成本价' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('costPrice', {
                initialValue: item.costPrice,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input type='number' />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='建议售价' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('suggestedPrice', {
                initialValue: item.suggestedPrice,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input type='number' />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='重量(克)' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('weight', {
                initialValue: item.weight,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input type='number' />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='体积' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('bulk', {
                initialValue: item.bulk,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input type='number' />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='类别' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('categoryId', {
                initialValue: item.categoryId,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Select>
                  {
                    typeList.length > 0 && typeList.map((item,index) => (
                      <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                    ))
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='产品单位' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('unit', {
                initialValue: item.unit,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input  />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='运费模版' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('fareId', {
                initialValue: item.fareId,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Select>
                  <Select.Option value={1}>包邮</Select.Option>
                  <Select.Option value={2}>Copy_包邮</Select.Option>
                  <Select.Option value={4}>到付</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='需要检测才可购买' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('requiredParticipateExam', {
                initialValue: item.requiredParticipateExam,
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
            <FormItem label='优惠活动-积分' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('credit', {
                initialValue: item.credit,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input type='number' />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='优惠活动-优惠券' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('allowCoupon', {
                initialValue: item.allowCoupon,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={1}>允许使用</Radio>
                  <Radio value={0}>不允许使用</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label='标签' hasFeedback {...formItemLayout(3,20)}>
              {getFieldDecorator('tags', {
                initialValue: item.tags,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={1}> A1 - 美白</Radio>
                  <Radio value={5}> B1 - 基础护理</Radio>
                  <Radio value={6}> C1 - 重点区域</Radio>
                  <Radio value={7}> D1 - 定制精华</Radio>
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
            <FormItem label='视频' hasFeedback {...formItemLayout(3,20)}>
              {getFieldDecorator('vedio', {
                initialValue: item.vedio,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<UploadFile {...vedioProps} />)}
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
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit('ONSELL')}>直接发布</Button>
        <Button onClick={this.props.onBack}>返回</Button>
       </div>
     </div>
   )
 }

}

export default Form.create()(AddProductForm)