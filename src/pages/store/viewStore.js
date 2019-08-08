import React from 'react';
import { connect } from 'dva';
import { Form,Col,Row,Button } from 'antd';
import { routerRedux } from 'dva/router';
import FormIemView from '../../common/FormIemView'

const FormItem = Form.Item;

const formItemLayout = (a,b) => {
  return {
    labelCol: {
      span: a || 6,
    },
    wrapperCol: {
      span: b || 18,
    },
  }
};

const ViewStore = ({ dispatch,store }) => {

  const { item } = store;

  const imgStyle = {
    wordWrap: 'break-word'
  }

  const showType = {
    'Store':'店铺',
    'Muaskin':'小屋',
  }

  const showImage = (data) => {
    data && data.map((item,index) => {
      return <img src={item.url} alt='' style={{ width:'50px'}}/>
    })
  }

  const showHtml = (data) => {
    const create = (data) => {
      return {
        __html: data
      }
    }
    return <div dangerouslySetInnerHTML={create(data)}></div>
  }

  const formItemProps = {
    spanNumber: 3,
    title: '店铺详情',
    list: [
      {label:'店铺编号',data: item.code},
      {label:'店铺名称',data:item.name},
      {label:'仓库',data:item.warehouseName},
      {label:'省市区',data:item.pcd},
      {label:'店铺地址',data:item.address},
      {label:'经度',data:item.longitude},
      {label:'纬度',data:item.latitude},
      {label:'店铺类型',data:showType[item.type]},
      {label:'联系电话',data:item.telephone},
      {label:'封面',data:(showImage(item.images)),span:24},
      {label:'描述',data:showHtml(item.introduce),span:24},
    ]
  }

  const createHtml = (text) => {
    return {
      __html: text
    }
  }


  return (
    <div>
      <FormIemView {...formItemProps}/>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    store: state.store
  }
}

export default connect(mapStateToProps)(ViewStore);
