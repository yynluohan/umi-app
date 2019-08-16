import React from 'react';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView';

const AdGroupView = ({ dispatch,sys }) => {

  const { item } = sys;

  const formItemProps = {
    title: '广告组详情',
    list: [
      {label:'组名',data: item.name},
      {label: '相关广告',data: item.ads,
        columns:[
          {title: '广告名',value: 'name'},
          {title: '是否启用',value: 'enabled',valueMap: {0:'禁用',1:'启用'}},
          {title: '轮播策略',value: 'strategyStr'},
          {title: '类型',value: 'type'},
          {title: '图片',value: 'logo'},
          {title: '目标链接',value: 'targetUrl'},
        ]
      }
    ]
  }

  return (
    <div>
      <FormIemView {...formItemProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(AdGroupView);
