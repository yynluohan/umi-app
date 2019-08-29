import React from 'react';
import { Tabs } from 'antd';
import { connect } from 'dva';
import RichText from '../../common/RichText';

const { TabPane } = Tabs;

const Rule = ({ dispatch,sys }) => {

  const { vipItem,credictItem,brandItem,privacyItem,type } = sys;

  function callback(e) {
    dispatch({
      type: 'sys/save',
      payload:{
        type: e
      }
    })
  }

  function onGetValue(e){
    dispatch({
      type: 'sys/onUpdate',
      payload:{
        content: e
      }
    })
  }

  const typeList = [
    {title: '会员规则',key: 'VIP_RULES',content: vipItem.content || ''},
    {title: '积分规则',key: 'CREDIT_RULES',content: credictItem.content || ''},
    {title: '品牌故事',key: 'BRAND',content: brandItem.content || ''},
    {title: '隐私策略',key: 'PRIVACY_POLICY',content: privacyItem.content || ''}
  ]

  return (
    <div style={{padding: '20px'}}>
      <h2>规则配置</h2>
      <Tabs defaultActiveKey="VIP_RULES" onChange={callback} activeKey={type}>
        {
          typeList.map((item) => (
            <TabPane tab={item.title} key={item.key}>
              <RichText onGetValue={onGetValue} value={item.content} />
            </TabPane>
          ))
        }
      </Tabs>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(Rule);
