import React from 'react';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView'

class categroyView extends React.Component {

  render() {

    const { item } = this.props.product;

    const imgStyle = {
      wordWrap: 'break-word'
    }

    const showValueType = {
      'STRING':'字符串',
      'INTEGER':'整形',
      'BOOLEAN':'布尔值',
      'DATE': '日期'
    }

    const showInputType = {
      'INPUT_TEXT':'文本输入框',
      'INPUT_NUMBER':'数字输入框',
      'INPUT_DATE':'日期输入框',
      'TEXTAREA':'多行文本框',
      'CHECKBOX':'多选框',
      'RADIO':'单选框',
      'SELECT':'下拉框'
    }

    const formItemProps = {
      title: '产品类型详情',
      list: [
        {label:'名称',data: item.name},
        {label:'父类别',data:item.parentId},
        {label:'首页展示',data:item.isShowProducts == '1' ? '是' : '否'},
        {label:'销售类别',data:item.wholesale},
        {label:'点击类别显示产品详情',data:item.visible == '1' ? '是' : '否'},
        {label:'首页推荐产品数量',data:item.promotedProductCount},
        {label:'排序号',data:item.sortOrder},
        {label:'封面',data:(<a target='_black' style={imgStyle} href={item.cover}>{item.cover}</a>)},
        {label: '描述',data: item.description},
        {label: '属性',data: item.productCategoryPropertyList,
          columns:[
            {title: '显示名称',value: 'displayName'},
            {title: '值类型',value: 'valueType',valueMap: showValueType},
            {title: '输入类型',value: 'inputType',valueMap: showInputType},
            {title: '可选值',value: 'candidateValues'},
            {title: '默认值',value: 'defaultValue'},
            {title: '是否必填',value: 'isRequired'},
            {title: '排序号',value: 'sortOrder'},
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
}

function mapStateToProps(state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(categroyView);
