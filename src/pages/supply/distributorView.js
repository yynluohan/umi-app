import React from 'react';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView'

const DistributorView = ({ dispatch,supply }) => {

  const { item } = supply;

  const statusMap = {
      'Normal': '启用',
      'Forbidden': '禁用'
  }

  const formItemProps = {
    title: '分销商详情',
    list: [
      {label:'分销商编号',data: item.traderCode},
      {label:'分销商名称',data:item.traderName},
      {label:'所在省市',data:item.traderPCD},
      {label:'详细地址',data:item.traderAddress},
      {label:'邮政编码',data:item.traderPostcode},
      {label:'状态',data:statusMap[item.traderStatus]},
      {label:'联系人',data:item.traderContactName},
      {label:'联系人电话',data:item.traderContactPhone},
      {label:'联系人邮箱',data:item.traderContactEmail},
      {label:'联系人职位',data:item.traderContactPosition},
      {label:'联系人手机',data:item.traderContactCellPhone},
      {label:'分销商开户名称',data:item.traderAccountName},
      {label:'分销商开户银行',data:item.traderAccountBank},
      {label:'分销商银行账号',data:item.traderAccountBankNo},
      {label:'分销商发票抬头',data:item.traderInvoiceTitle},
      {label:'备注',data:item.traderNote},
      {label:'分销商注册时间',data:item.traderRegisterTime},
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
    supply: state.supply
  }
}

export default connect(mapStateToProps)(DistributorView);
