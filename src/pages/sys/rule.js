import React from 'react';
import { Tabs } from 'antd';
import { connect } from 'dva';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import htmlToDraft from 'html-to-draftjs';

const { TabPane } = Tabs;

class Rule extends React.Component {

  render() {

    function callback(e) {
      console.log('111',e)
    }

    return (
      <div style={{padding: '20px'}}>
        <h2>规则配置</h2>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="会员规则" key="1">
            <BraftEditor />
          </TabPane>
          <TabPane tab="积分规则" key="2">
            <BraftEditor />
          </TabPane>
          <TabPane tab="品牌故事" key="3">
            <BraftEditor />
          </TabPane>
          <TabPane tab="隐私策略" key="4">
            <BraftEditor />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(Rule);
