import React from 'react'
import { Form, Col, Row, Input, Button, Radio } from 'antd'
import { query } from '../../../framework/utils/services'
import PropertyModal from './PropertyModal'
import TableInSpin from '../../../common/TableInSpin'
import UploadFile from '../../../common/UploadFile'
import SelectTree from '../../../common/SelectTree'

const FormItem = Form.Item
const { TextArea } = Input
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}

class AddCategroyForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      item: props.item || {},
      visible: false,
      productCategoryPropertyList: props.item && props.item.productCategoryPropertyList ? props.item.productCategoryPropertyList : [], // 属性列表
      modalItem: {},
      selectIndex: undefined
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onSaveItems = this.onSaveItems.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.item !== undefined) {
      this.setState({
        item: nextProps.item,
        productCategoryPropertyList: nextProps.item.productCategoryPropertyList || this.state.productCategoryPropertyList
      })
    }
  }

  onSubmit () {
    const { validateFields, getFieldsValue } = this.props.form
    const { productCategoryPropertyList } = this.state
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        productCategoryPropertyList
      }
      this.props.onSave(data)
    })
  }

  onSaveItems (data, type) {
    const { productCategoryPropertyList, selectIndex } = this.state
    if (type === 'edit') {
      productCategoryPropertyList[selectIndex] = {
        ...productCategoryPropertyList[selectIndex],
        ...data
      }
    } else {
      productCategoryPropertyList.push(data)
    }
    this.setState({
      productCategoryPropertyList,
      visible: false,
      modalItem: {}
    })
  }

  onRemove (index) {
    const { productCategoryPropertyList } = this.state
    productCategoryPropertyList.splice(index, 1)
    this.setState({
      productCategoryPropertyList
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { item, visible, productCategoryPropertyList, modalItem } = this.state

    const modalProps = {
      item: modalItem,
      visible,
      onBack: () => this.setState({ visible: false, modalItem: {} }),
      onSubmit: (data, type) => this.onSaveItems(data, type)
    }

    const showValueType = {
      STRING: '字符串',
      INTEGER: '整形',
      BOOLEAN: '布尔值',
      DATE: '日期'
    }

    const showInputType = {
      INPUT_TEXT: '文本输入框',
      INPUT_NUMBER: '数字输入框',
      INPUT_DATE: '日期输入框',
      TEXTAREA: '多行文本框',
      CHECKBOX: '多选框',
      RADIO: '单选框',
      SELECT: '下拉框'
    }

    const tableProps = {
      list: productCategoryPropertyList,
      loading: false,
      columns: [
        {
          title: '显示名称',
          key: 'displayName',
          dataIndex: 'displayName'
        },
        {
          title: '值类型',
          key: 'valueType',
          render: (record) => (
            <span>{record.valueType ? showValueType[record.valueType] : ''}</span>
          )
        },
        {
          title: '输入类型',
          key: 'inputType',
          render: (record) => (
            <span>{record.inputType ? showInputType[record.inputType] : ''}</span>
          )
        },
        {
          title: '可选值',
          key: 'candidateValues',
          dataIndex: 'candidateValues'
        },
        {
          title: '默认值',
          key: 'defaultValue',
          dataIndex: 'defaultValue'
        },
        {
          title: '是否必填',
          key: 'isRequired',
          dataIndex: 'isRequired'
        },
        {
          title: '排序号',
          key: 'sortOrder',
          dataIndex: 'sortOrder'
        },
        {
          title: '操作',
          key: 'oprate',
          render: (record, text, index) => (
            <div>
              <a onClick={() => this.onRemove(index)}>移除</a>
            </div>
          )
        }
      ]
    }

    const uploadProps = {

    }

    const treeProps = {
      apiUrl: '/api/crud/product/productCategoryies',
      method: query,
      getway: {
        children: 'subCategoryList',
        title: 'name'
      },
      getId: item.parentId
    }

    return (
      <div style={{ backgroundColor: '#fff', padding: '20px' }}>
        <h2>{this.props.title}</h2>
        <Form>
          <Row>
            <Col span={12}>
              <FormItem label='名称' hasFeedback {...formItemLayout}>
                {getFieldDecorator('name', {
                  initialValue: item.name,
                  rules: [
                    {
                      required: true,
                      message: '请填写名称'
                    }
                  ]
                })(<Input type='text' />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='父类别' hasFeedback {...formItemLayout}>
                {getFieldDecorator('parentId', {
                  initialValue: item.parentId,
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <SelectTree {...treeProps} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='首页展示' hasFeedback {...formItemLayout}>
                {getFieldDecorator('isShowProducts', {
                  initialValue: item.isShowProducts,
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <Radio.Group>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='销售类别' hasFeedback {...formItemLayout}>
                {getFieldDecorator('wholesale', {
                  initialValue: item.wholesale,
                  rules: [
                    {
                      required: true,
                      message: '请选择销售类别'
                    }
                  ]
                })(
                  <Radio.Group>
                    <Radio value={1}>批发</Radio>
                    <Radio value={0}>零售</Radio>
                    <Radio value={2}>试用</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem label='点击类别显示产品详情' hasFeedback {...formItemLayout}>
                {getFieldDecorator('visible', {
                  initialValue: item.visible,
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <Radio.Group>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='首页推荐产品数量' hasFeedback {...formItemLayout}>
                {getFieldDecorator('promotedProductCount', {
                  initialValue: item.promotedProductCount,
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(<Input type='number' />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='排序号' hasFeedback {...formItemLayout}>
                {getFieldDecorator('sortOrder', {
                  initialValue: item.sortOrder,
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(<Input type='number' />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='封面' hasFeedback {...formItemLayout}>
                {getFieldDecorator('cover', {
                  initialValue: item.cover,
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(<UploadFile {...uploadProps} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='描述' hasFeedback {...formItemLayout}>
                {getFieldDecorator('description', {
                  initialValue: item.description,
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(<TextArea rows={4} />)}
              </FormItem>
            </Col>
          </Row>
        </Form>

        <Button type='primary' onClick={() => this.setState({ visible: true })}>添加属性</Button>
        <TableInSpin {...tableProps} />
        <div style={{ textAlign: 'right', marginTop: '2em' }}>
          <Button type='primary' style={{ marginRight: '1em' }} onClick={() => this.onSubmit()}>保存</Button>
          <Button onClick={this.props.onBack}>返回</Button>
        </div>
        {visible ? <PropertyModal {...modalProps} /> : ''}
      </div>
    )
  }
}

export default Form.create()(AddCategroyForm)
