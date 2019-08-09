import React from 'react';
import { connect } from 'dva';
import { Form,Col,Row,Button,Tabs } from 'antd';
import { routerRedux } from 'dva/router';
import FormIemView from '../../common/FormIemView';
import ZEle from 'zero-element';
import assistantConfig from './config/assistantConfig';
import inwentoryConfig from './config/inwentoryConfig';
import cashierConfig from './config/cashierConfig';
import styles from './viewStore.css';

const { TabPane } = Tabs;

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
    isHiddenBackBut:true,
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
    ]
  }

  const createHtml = (text) => {
    return {
      __html: text
    }
  }

  function callback(key) {
    console.log(key);
  }

  return (
    <div>
      <FormIemView {...formItemProps}/>
      <Tabs defaultActiveKey="1" onChange={callback} style={{ padding: '0 3%'}}>
        <TabPane tab="店铺详情" key="1">
          <div dangerouslySetInnerHTML={createHtml(item.introduce)} className={styles.richHtml}/>
        </TabPane>
        <TabPane tab="店员管理" key="2">
          <ZEle namespace='store'  config={assistantConfig} />
        </TabPane>
        <TabPane tab="店铺库存" key="3">
          <ZEle namespace='store'  config={inwentoryConfig} />
        </TabPane>
        <TabPane tab="收银终端" key="4">
          <ZEle namespace='store'  config={cashierConfig} />
        </TabPane>
      </Tabs>
      <div style={{textAlign:'right',margin:'2em'}}>
        <Button type='primary' onClick={() => window.history.go(-1)}>返回</Button>
      </div>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    store: state.store
  }
}

export default connect(mapStateToProps)(ViewStore);
