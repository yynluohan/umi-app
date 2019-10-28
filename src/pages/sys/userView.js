import React from 'react'
import { connect } from 'dva'
import FormIemView from '../../common/FormIemView'

const UserView = ({ sys }) => {
  const { item } = sys

  const statusMap = {
    NORMAL: '正常',
    LOCKED: '锁定'
  }

  const sexMap = {
    1: '男',
    2: '女'
  }

  const formItemProps = {
    title: '用户详情',
    list: [
      { label: 'UID', data: item.uid },
      { label: '微信开放平台UnionID', data: item.wxUnionid },
      { label: '移动应用OpenID', data: item.wxappOpenid },
      { label: '微信公众号OpenID', data: item.weixin },
      { label: '微信小程序OpenID', data: item.wxaOpenid },
      { label: '我的邀请码', data: item.invitationCode },
      { label: '注册时间', data: item.registerDate },
      { label: '上次登录时间', data: item.tokenExpiredDate },
      { label: '登录名', data: item.loginName },
      { label: '昵称', data: item.wechatName },
      { label: '真实姓名', data: item.realName },
      { label: '手机', data: item.phone },
      { label: '电子邮箱', data: item.email },
      { label: '状态', data: statusMap[item.status] },
      { label: '性别', data: sexMap[item.sex] },
      { label: '生日', data: item.birthday },
      { label: '详情', data: item.details }
    ]
  }

  return (
    <div>
      <FormIemView {...formItemProps} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(UserView)
