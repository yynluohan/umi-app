import React from 'react';
import { Form,Button } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

const FormItem = Form.Item;
const formItemLayout = (a,b) => {
  return {
    labelCol: {
      span: a || 0,
    },
    wrapperCol: {
      span: b || 24,
    },
  }
};

 class RichText extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      value: props.value || null
    }
  }

  // componentDidUpdate(a,b) {
  //   const { getFieldsValue } = this.props.form;
  //   const content = getFieldsValue().content;
  //   if (this.props.onGetValue) {
  //     this.props.onGetValue(content.toHTML())
  //   }
  // }

  onSave = () => {
    const { getFieldsValue } = this.props.form;
    const content = getFieldsValue().content;
    if (this.props.onGetValue) {
      this.props.onGetValue(content.toHTML())
    }
  }

  render() {

    const { value } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <FormItem label='名称' hasFeedback {...formItemLayout()}>
          {getFieldDecorator('content', {
            initialValue: BraftEditor.createEditorState(value),
          })(
            <BraftEditor />
          )}
        </FormItem>
        <Button type='primary' style={{margin: '1em 0'}} onClick={this.onSave}>保存</Button>
      </Form>
    )
  }
}


export default Form.create()(RichText)
