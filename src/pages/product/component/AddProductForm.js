import React from 'react';
import { Form,Col,Row,Input,Button,Select,Radio,Checkbox  } from 'antd';
import { query } from '../../../framework/utils/services';
import UploadFile from '../../../common/UploadFile';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import SelectTree from '../../../common/SelectTree';
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

class AddProductForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      item:props.item || {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item != undefined) {
      if (nextProps.item.productImageList.length > 0) {
        nextProps.item.productImageList.map((item,index) => {
          nextProps.item.productImageList[index] = {
            ...item,
            status: 'done',
            uid:index,
          }
        })
      }
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
      // if (data.productTagList.length > 0) {
      //   data.productTagList.map((item,index) => {
      //     data.productTagList[index] = {
      //       id: item
      //     }
      //   })
      // }
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
   const { item } = this.state;

   const vedioProps = {

   }

   const fieldOptionInputProps = {
      method: query,
      apiUrl: '/api/crud/product/productBrands'
   }

   const treeProps = {
     apiUrl: '/api/crud/product/productCategoryies',
     method: query,
     getway: {
       'children':'subCategoryList',
       'title': 'name',
     },
     getId: item.categoryId,
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
                    message:'请填写缩略名称'
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='品牌' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('brandId', {
                initialValue: item.brandId,
                rules: [
                  {
                    required: true,
                    message:'请填写品牌'
                  },
                ],
              })(
                <FieldOptionInput {...fieldOptionInputProps}/>
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
            <FormItem label='类别' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('categoryId', {
                initialValue: item.categoryId,
                rules: [
                  {
                    required: true,
                    message:'请选择类别'
                  },
                ],
              })(
                <SelectTree {...treeProps}/>
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
                    message:'请填写价格'
                  },
                ],
              })(<Input type='number' />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='产品单位' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('unit', {
                initialValue: item.unit,
                rules: [
                  {
                    required: true,
                    message:'请填写产品单位'
                  },
                ],
              })(<Input  />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='成本价' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('costPrice', {
                initialValue: item.costPrice,
                rules: [
                  {
                    required: true,
                    message:'请填写成本价'
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
                    message:'请填写建议售价'
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
                    message:'请填写重量'
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
            <FormItem label='优惠活动-积分' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('credit', {
                initialValue: item.credit,
                rules: [
                  {
                    required: true,
                    message:'请填写优惠活动-积分'
                  },
                ],
              })(<Input type='number' />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='条形码' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('barCode', {
                initialValue: item.barCode,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
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
              {getFieldDecorator('tagIds', {
                initialValue: item.tagIds,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Checkbox.Group
                  options = {
                    [
                      { label: 'A1 - 美白', value: 1 },
                      { label: 'B1 - 基础护理', value: 5 },
                      { label: 'C1 - 重点区域', value: 6 },
                      { label: 'D1 - 定制精华', value: 7 },
                    ]
                  }
                >
                </Checkbox.Group>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label='封面' hasFeedback {...formItemLayout(3,20)}>
              {getFieldDecorator('productImageList', {
                initialValue: item.productImageList,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<UploadFile value={item.productImageList} max={6}/>)}
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
                initialValue: item.productDescription && BraftEditor.createEditorState(item.productDescription.description),
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
