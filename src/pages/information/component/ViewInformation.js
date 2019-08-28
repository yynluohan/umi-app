import React from 'react';
import { Form,Col,Row,Input,Button,Layout,message,List,Avatar,Skeleton,Pagination,Popconfirm,Modal,Comment } from 'antd';
import { query } from '../../../framework/utils/services';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import PicturesWall from '../../../common/PicturesWall';
import Selection from '../../../common/Selection';

import styles from './ViewInformation.css';
import HtmlContent from '../../../common/parseHtmlJson/ParseHtmlJson';

const FormItem = Form.Item;
const { Sider, Content,Footer } = Layout;
const { TextArea } = Input;
const { confirm } = Modal;
message.config({
  top: 74,
  maxCount: 3,
});
const formItemLayout = (a,b) => {
  return {
    labelCol: {
      span: a || 6,
    },
    wrapperCol: {
      span: b || 18,
    },
  }
}

class ViewInformation extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      item:props.item || {},
      evaluationList:props.evaluationList || [],
      content:'0',
      replyContent:'',
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.item) {
      this.setState({
        item: nextProps.item
      })
    }
    if(nextProps.evaluationList && nextProps.evaluationList.length > 0){
      this.setState({
        evaluationList: nextProps.evaluationList
      })
    }
  }

  onSubmit = () => {
    const { validateFields,getFieldsValue } = this.props.form;
    const { item, content } = this.state;

    if(!content){
      message.warning('评论内容不能为空！');
      return;
    }
    
    let data = {
      content,
      stockType: 'Article',
      stockId: item.id
    };

    this.setState({
      content:''
    })
    
    this.props.onSub(data)
  }

  //评论内容
  setContent = (e) => {
    this.setState({
      content:e.target.value
    })
  }

  //翻页 -- 当前页数
  onPaginationChange = (currentPage, pageSize) => {
    this.props.onPaginationChange(currentPage, pageSize);
  }

  //删除评论
  onConfirm = (evaluationId) => {
    this.props.onDeleteReply(evaluationId)
  }

  onCancel = () => {
    //取消删除
  }
  
  //回复内容
  setReplyContent = (e) => {
    this.setState({
      replyContent:e.target.value
    })
  }

  //提交回复内容
  onReplySub = (item) => {

    const { replyContent } = this.state;

    if(!replyContent){
      message.warning('回复内容不能为空！');
      return;
    }

    let data = {
      content: replyContent,
      originId: item.originId,
      originType: item.originType,
      stockId: item.id,
      stockType: "Evaluation"
    };
    
    this.props.onReplySub(data)
    
  }


 render() {
   const _this =this;
   const { getFieldDecorator } = this.props.form;
   const { item, evaluationList } = this.state;
   const { pageNum, pageSize, pages, pageTotal } = this.props;

   //封面
   const coverHandler = (list) => {
    const jsonData = eval(list);
    if(jsonData && jsonData.length > 0){
      if(jsonData[0] && jsonData[0].url){
        return(
          <img style={{width: '80px'}} src={jsonData[0].url} alt='封面'/>
        )
      }
    }
   }

   //关联产品
   const relativeProductsHandler = (list) => {
    if(list && list.length > 0){
      return (
        list.map((item, index) =>(
          <div className={styles.relativeProductImg} key={index}>
            <img src={item.cover} alt={item.short_name}/>
            <div className={styles.nameStyle}>{item.name}</div>
          </div>
        ))
      )
    }
   }

   //评论列表回复
  const onReply = (item) => {
    confirm({
      icon:'',
      width:'500px',
      title: `回复: ${item.name}`,
      okText:'回复',
      okType:'primary',
      cancelText:'取消',
      content: (
        <TextArea rows={5} style={{ width: '90%',resize:'none'}} placeholder='请输入回复内容...' onChange={(e) => this.setReplyContent(e)}/>
      ),
      onOk() {
        _this.onReplySub(item)
      },
      onCancel() {
      },
    });
  }


   //回复item
   const ReplyContent = ({ children, item, name, isRaply }) => {

    const actionList = [
      <Popconfirm
        title="确定要删除这条评论吗？"
        onConfirm={() => this.onConfirm(item.id)}
        onCancel={() => this.onCancel}
        okText="删除"
        cancelText="取消"
      >
        <a style={{color:'#888888', fontSize:'12px'}}>删除</a>
      </Popconfirm>
    ];
    if(isRaply){
      actionList.push(
        <a style={{color:'#428bca', fontSize:'12px', marginLeft:'20px'}} onClick={() => onReply(item)}>回复</a>
      )
    }
    
    return (
      <Comment
        actions={actionList}
        author={
          <a style={{fontSize:'16px'}}>
            <span>{name}</span>
            <span style={{marginLeft:'20px'}}>{item.createTime}</span>
          </a>
        }
        avatar={
          <Avatar
            src={item.avatar}
            alt={name}
          />
        }
        content={
          <span style={{fontSize:'15px'}}>
            {item.content}
          </span>
        }
      >
        {children}
      </Comment>
    )
    
  };

  const CustLine = () => <div style={{width: '100%', height:'0.0625em', backgroundColor:'#E4E4E4'}}></div>;

   return (
     <div style={{ backgroundColor: '#fff',padding: '20px'}}>
       <h2>{this.props.title}</h2>
       <HtmlContent htmlJson={item.content}/>

      <Layout style={{background:'#FFFFFF', marginBottom:'20px'}}>
        <Layout className={styles.countBody}>
          <Sider className={styles.coverImg}>
              <div>封面</div>
              <div className={styles.imgUrl}>
                {coverHandler(item.cover)}
              </div>
          </Sider>
          <Content className={styles.statistics}>
              <span>评论数: { evaluationList.length || 0 }</span>
              <span>点赞数: { item.likeCount || 0 }</span>
              <span>收藏数: { item.favoriteCount || 0 }</span>
              <span>浏览数: { item.visitCount || 0 }</span>
          </Content>
        </Layout>
        <Footer style={{background:'#FFFFFF', padding:'0'}}>
          <div className={styles.countBody}>
            <div className={styles.coverImg}>
                <div>关联产品</div>
                <div className={styles.relativeProductsContent}>
                  {relativeProductsHandler(item.productRelations)}
                </div>
            </div>
          </div>
        </Footer>
      </Layout>
      
      <CustLine/>
      
      <div style={{textAlign: 'right', margin:'10px'}}>
        <TextArea rows={4} style={{ width: '80%',resize:'none'}} placeholder='请输入评论......' onChange={(e) => this.setContent(e)}/>
      </div>
      <div style={{textAlign: 'right',marginTop:'7px', marginBottom:'25px'}}>
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit()}>添加评论</Button>
      </div>

      <div style={{padding:'0 30px'}}>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={evaluationList}
          renderItem={item => (
            <List.Item>
              <ReplyContent 
                item={item}
                name={item.name}
                isRaply={true}
                >
                {item.replys && item.replys.map((replysItem, index) =>(
                  <ReplyContent
                    key={index}
                    item={replysItem}
                    name={replysItem.memberName}
                    isRaply={false} 
                      />
                ))}
              </ReplyContent>
            </List.Item>
          )}
        />
        {pageTotal && pageTotal > 10 ? (
          <div className={styles.paginationBody}>
            <Pagination
              defaultCurrent={pageNum}
              total={pageTotal}
              onChange={this.onPaginationChange}
            />
          </div>
        ):null}
      </div>

      <div style={{textAlign: 'right',marginTop:'7px', marginBottom:'25px'}}>
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.props.onBack()}>返回</Button>
      </div>

     </div>
   )
 }

}

export default Form.create()(ViewInformation)
