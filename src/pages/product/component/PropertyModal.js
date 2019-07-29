import React from 'react';
import { Modal,Form,Input,Select,Radio,Row,Col } from 'antd';
import { query } from '../../../framework/utils/services'

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
  width: 900,
};

 class PropertyModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item: props.item || {},
      selectedPerm: {}  //选择的权限
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item) {
      this.setState({
        item: nextProps.item,
      })
    }
  }

  handleCancel = () => {
    this.props.onBack()
  }

  handleOk = () => {
    const { getFieldsValue,validateFields } = this.props.form;
    const { item,selectedPerm } = this.state;
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const type = Object.keys(item).length === 0 ? 'add' : 'edit';
      const data = {
        ...getFieldsValue(),
      }
      this.props.onSubmit(data,type)
    })
  }

  onClick = (item) => {
    this.setState({
      selectedPerm: item
    })
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    const { visible } = this.props;
    const { item } = this.state;

    return (
      <Modal
          title={Object.keys(item).length === 0 ? '添加属性' : '修改属性'}
          width = '900px'
          visible
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <Form>
        <Row>
          <Col span={12}>
            <FormItem label="显示名称" hasFeedback {...formItemLayout}>
              {getFieldDecorator('displayName', {
                initialValue: item.displayName,
                rules: [
                  {
                    required: false,
                    message: '请填写名称！',
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="值类型" hasFeedback {...formItemLayout}>
              {getFieldDecorator('valueType', {
                initialValue: item.valueType,
              })(
                <Select>
                  <Select.Option value='STRING'>字符串</Select.Option>
                  <Select.Option value='INTEGER'>整形</Select.Option>
                  <Select.Option value='BOOLEAN'>布尔值</Select.Option>
                  <Select.Option value='DATE'>日期</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="输入类型" hasFeedback {...formItemLayout}>
              {getFieldDecorator('inputType', {
                initialValue: item.inputType,
              })(
                <Select>
                  <Select.Option value='INPUT_TEXT'>文本输入框</Select.Option>
                  <Select.Option value='INPUT_NUMBER'>数字输入框</Select.Option>
                  <Select.Option value='INPUT_DATE'>日期输入框</Select.Option>
                  <Select.Option value='TEXTAREA'>多行文本框</Select.Option>
                  <Select.Option value='CHECKBOX'>多选框</Select.Option>
                  <Select.Option value='RADIO'>单选框</Select.Option>
                  <Select.Option value='SELECT'>下拉框</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="可选值" hasFeedback {...formItemLayout}>
              {getFieldDecorator('candidateValues', {
                initialValue: item.candidateValues,
              })(<TextArea rows={4}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="默认值" hasFeedback {...formItemLayout}>
              {getFieldDecorator('defaultValue', {
                initialValue: item.defaultValue,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="是否必填" hasFeedback {...formItemLayout}>
              {getFieldDecorator('isRequired', {
                initialValue: item.isRequired,
              })(
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="排序号" hasFeedback {...formItemLayout}>
              {getFieldDecorator('sortOrder', {
                initialValue: item.sortOrder,
              })(<Input type='number'/>)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
    )
  }
}

export default Form.create()(PropertyModal)
