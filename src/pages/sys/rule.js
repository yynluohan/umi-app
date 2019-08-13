import React from 'react';
import { Tabs,Button,Form } from 'antd';
import { connect } from 'dva';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import htmlToDraft from 'html-to-draftjs';

const { TabPane } = Tabs;
const FormItem = Form.Item;

const formItemLayout  = (a,b) => {
  return {
    labelCol: {
      span: a || 6,
    },
    wrapperCol: {
      span: b || 18,
    },
  }
};

const Rule = ({
  dispatch,
  sys,
  form: {
    getFieldDecorator,
    getFieldsValue
  }
 }) => {

  const { vipItem,credictItem,brandItem,privacyItem,type } = sys;
  console.log('999',vipItem)

  function callback(e) {
    dispatch({
      type: 'sys/save',
      payload:{
        type: e
      }
    })
  }

  function onSave() {
    dispatch({
      type: 'sys/onUpdate',
      payload: {
        content: getFieldsValue().content ? getFieldsValue().content.toHTML() : ''
      }
    })
  }

  function onChange(e){
    console.log('55566',e.toHTML())
    dispatch({
      type: 'sys/save',
      payload:{
        htmlText: e.toHTML()
      }
    })
  }

  const typeList = [
    {title: '会员规则',key: 'VIP_RULES',content: vipItem.content || ''},
    {title: '积分规则',key: 'CREDIT_RULES',content: credictItem.content || ''},
    {title: '品牌故事',key: 'BRAND',content: brandItem.content || ''},
    {title: '隐私策略',key: 'PRIVACY_POLICY',content: privacyItem.content || ''}
  ]

  console.log('222',typeList)

  return (
    <div style={{padding: '20px'}}>
      <h2>规则配置</h2>
        <Form>
          <Tabs defaultActiveKey="VIP_RULES" onChange={callback} activeKey={type}>
            <TabPane tab='会员规则' key='VIP_RULES'>
              <FormItem label='' hasFeedback {...formItemLayout(0,24)}>
                {getFieldDecorator('content', {
                  initialValue: vipItem.content ? BraftEditor.createEditorState(vipItem.content) : '',
                })(
                  <BraftEditor
                    value={BraftEditor.createEditorState(vipItem.value || '')}
                  />
                )}
              </FormItem>
            </TabPane>
            <TabPane tab='积分规则' key='CREDIT_RULES'>
              <FormItem label='' hasFeedback {...formItemLayout(0,24)}>
                {getFieldDecorator('content', {
                  initialValue: credictItem.content ? BraftEditor.createEditorState(credictItem.content) : '',
                })(
                  <BraftEditor
                    value={BraftEditor.createEditorState(credictItem.value || '')}
                  />
                )}
              </FormItem>
            </TabPane>

            <TabPane tab='品牌故事' key='BRAND'>
              <FormItem label='' hasFeedback {...formItemLayout(0,24)}>
                {getFieldDecorator('content', {
                  initialValue: brandItem.content ? BraftEditor.createEditorState(brandItem.content) : '',
                })(
                  <BraftEditor
                    value={BraftEditor.createEditorState(brandItem.value || '')}
                  />
                )}
              </FormItem>
            </TabPane>

            <TabPane tab='隐私策略' key='PRIVACY_POLICY'>
              <FormItem label='' hasFeedback {...formItemLayout(0,24)}>
                {getFieldDecorator('content', {
                  initialValue: privacyItem.content ? BraftEditor.createEditorState(privacyItem.content) : '',
                })(
                  <BraftEditor
                    value={BraftEditor.createEditorState(privacyItem.value || '')}
                  />
                )}
              </FormItem>
            </TabPane>
          </Tabs>
        </Form>
      <Button type='primary' style={{margin: '1em 0'}} onClick={onSave}>保存</Button>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    sys: state.sys
  }
}

const RuleForm = Form.create()(Rule);

export default connect(mapStateToProps)(RuleForm);
