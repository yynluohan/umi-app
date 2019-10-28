import React from 'react'
import { Tabs } from 'antd'
import { connect } from 'dva'

const { TabPane } = Tabs

class AutoReplay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeKey: '1'
    }
  }

  render () {
    const { activeKey } = this.state

    return (
      <div style={{ padding: '20px' }}>
        <h2>自动回复</h2>
        <Tabs
          defaultActiveKey='1' onChange={(e) => { this.setState({ activeKey: e }) }}
          activeKey={activeKey}
        >
          <TabPane tab='添加自动回复' key='1'>
            aaa
          </TabPane>
          <TabPane tab='消息自动回复' key='2'>
            qqqqqqqqq
          </TabPane>
          <TabPane tab='关键词自动回复' key='3'>
            ccc
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(AutoReplay)
