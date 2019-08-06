import React from 'react';
import { Dropdown,Menu,Icon,Button,notification } from 'antd';
import styles from './Common.css';

 class ListLayout extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      oparateList:props.oparateList || [],
      showBulkOprate: props.showBulkOprate || false,
      title: props.title || 'List',  //标题
      selectDiraction:'up',
    }
  }

  onIconChange = () => {
    const { selectDiraction } = this.state;
    this.setState({
      selectDiraction: selectDiraction == 'up' ? 'down' : 'up',
    })
  }

  handleMenuClick = (data) => {
    if(this.props.selectedRows.length < 1){
      notification.error({ message: '请选择需要操作的选项!' });
      return;
    }
    if(this.props.context){
      this.props.context.dispatch({
        type:`${this.props.context.namespace}/save`,
        payload:{
          bulkOperateName:data,
          selectedRowKeys:this.props.context.selectedRowKeys,
          selectedRows:this.props.context.selectedRows
        }
      })
    }
    if(data == '审核通过' && this.props.onApproved){
      this.props.onApproved()
    }
    if(data == '提交银行流水' && this.props.onBankWater){
      this.props.onBankWater()
    }
    if(data == '自动生成收款单' && this.props.onAutoGenerateReceipt){
      this.props.onAutoGenerateReceipt()
    }
    if(data == '删除' && this.props.onBulkDelete){
      this.props.onBulkDelete()
    }
  }

  render(){

    const { children } = this.props;
    const [Batch, List, Pagination] = children;
    const { oparateList,showBulkOprate,title,selectDiraction } = this.state;

    console.log('BBBBB this.props = ',oparateList);

    const menu = (
      <Menu>
        {
          oparateList.length > 0 && oparateList.map((item,index) => {

          })
        }
      </Menu>
    )

    return (
      <div className={styles.outStyle}>
        <div className={styles.continer}>
          <span>{title || 'List'}</span>
          <Icon type={selectDiraction} onClick={() => this.onIconChange()}/>
        </div>
        {
          selectDiraction == 'up' ?
          <div style={{padding:'0.5em'}}>
            {
              showBulkOprate ?
              <Dropdown overlay={menu}>
                <Button style={{ marginLeft: 8 }}>
                  批量操作 <Icon type="down" />
                </Button>
              </Dropdown>
              : null
            }
            {List}
            <div style={{margin:'0.8em 0'}}>
              {Pagination}
            </div>
          </div>
          :
          <div className={styles.noContent}>
            <Icon type="frown-o" />
            <span>收起中</span>
          </div>
        }

      </div>
    )
  }

}

export default ListLayout
