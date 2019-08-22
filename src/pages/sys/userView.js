import React from 'react';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView';

const UserView = ({ dispatch,sys }) => {

  const { item } = sys;


  const formItemProps = {
    title: '用户详情',
    list: [
      {label:'UID',data: item.uid},
      {label:'微信开放平台UnionID',data: item.wxUnionid},
      {label:'移动应用OpenID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},
      {label:'UID',data: item.uid},

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

export default connect(mapStateToProps)(UserView);
