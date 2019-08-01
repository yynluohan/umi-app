import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import { routerRedux } from 'dva/router';
import FormIemView from '../../common/FormIemView';

const FreightView = ({ dispatch,product }) => {

  const { item } = product;

  const showIsInclPostage = {
    '1':'卖家承担运费 ',
    '0':'自定义运费  ',
    undefined: ''
  }

  const showValuationModel = {
    '0':'按件数 ',
    '1':'按重量',
    '2':'按体积',
    undefined: ''
  }

  const showIsIncPostageBIf = {
    0: '否',
    1:'是',
    undefined: ''
  }

  const showCarryWay = {
    0:'快递',
    1:'EMS',
    2:'平邮'
  }

  const formItemProps = {
    title: '运费模板详情',
    list: [
      {label:'模板名称',data: item.name},
      {label:'标题',data:item.title},
      {label:'内容',data:item.content},
      {label:'销售类别',data:item.messageFormat},
      {label:'发货时间',data:item.dispatchTime},
      {label:'地址',data:item.shopAddr},
      {label:'是否包邮',data:showIsInclPostage[item.isInclPostage]},
      {label:'计价方式',data:showValuationModel[item.valuationModel]},
      {label:'是否指定条件包邮',data:showIsIncPostageBIf[item.isInclPostageByIf]},
      {label: '运送方式',data: item.carryModeList,
        columns:[
          {title: '类型',value: 'carryWay',valueMap: showCarryWay},
          {title: '地区',value: 'region'},
          {title: '首件数量',value: 'firstPiece'},
          {title: '首费',value: 'firstAmount'},
          {title: '续件',value: 'secondPiece'},
          {title: '续费',value: 'secondAmount'},
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
    product: state.product
  }
}

export default connect(mapStateToProps)(FreightView);
