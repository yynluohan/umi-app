import React from 'react';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView';

const NoticeView = ({ dispatch,notice }) => {

  const { item } = notice;

  const typeObj = {
    'C端用户及门店':'System',
    '门店员工': 'Internal',
    'C端用户':'External'
  }

  const formItemProps = {
    title: '通知详情',
    list: [
      {label:'标题',data: item.title},
      {label:'作者',data: item.author},
      {label:'组名',data: typeObj[item.type]},
      {label:'通知人员',data: item.name},
      {label:'排序号',data: item.orderNum},
      {label:'内容',data: item.content},
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
    notice: state.notice
  }
}

export default connect(mapStateToProps)(NoticeView);
