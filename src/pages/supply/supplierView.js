import React from 'react';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView'

const SupplierView = ({ supply }) => {

  const { item } = supply;

  const statusMap = {
      'Normal': '启用',
      'Forbidden': '禁用'
  }

  const formItemProps = {
    title: '供应商详情',
    list: [
      {label:'供应商编号',data: item.supplierCode},
      {label:'供应商名称',data:item.supplierName},
      {label:'所在省市',data:item.supplierPCD},
      {label:'详细地址',data:item.supplierAddress},
      {label:'邮政编码',data:item.supplierPostcode},
      {label:'状态',data:statusMap[item.supplierStatus]},
      {label:'联系人',data:item.supplierContactName},
      {label:'联系人电话',data:item.supplierContactPhone},
      {label:'联系人邮箱',data:item.supplierContactEmail},
      {label:'联系人职位',data:item.supplierContactPosition},
      {label:'联系人手机',data:item.supplierContactCellPhone},
      {label:'供应商开户名称',data:item.supplierAccountName},
      {label:'供应商开户银行',data:item.supplierAccountBank},
      {label:'供应商银行账号',data:item.supplierAccountBankNo},
      {label:'供应商发票抬头',data:item.supplierInvoiceTitle},
      {label:'备注',data:item.supplierNote},
      {label:'供应商注册时间',data:item.supplierRegisterTime},
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

export default connect(mapStateToProps)(SupplierView);
