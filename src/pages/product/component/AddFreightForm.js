import React from 'react';
import { Form,Col,Row,Input,Button,message,Divider,Select,Radio,DatePicker,Checkbox,InputNumber   } from 'antd';
import { query } from '../../../framework/utils/services';
import UploadFile from '../../../common/UploadFile';
import htmlToDraft from 'html-to-draftjs';
import TableInSpin from '../../../common/TableInSpin';

const FormItem = Form.Item;
const formatDate = window.MC.DATETIMEFORMAT;
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

class AddFreightForm extends React.Component {

  constructor(props){
    super(props);
    let fastList = [];
    let emsList = [];
    let mailList = [];
    if (props.item != undefined) {
      if (props.item.carryModeList && props.item.carryModeList.length > 0) {
        props.item.carryModeList.map((k,i) => {
          if (k.carryWay == 0) {
            fastList.push(k)
          }else if (k.carryWay == 1) {
            emsList.push(k)
          } else {
            mailList.push(k)
          }
        })
      }
    }

    this.state = {
      item:props.item || {},
      fastType: '', //快递
      fastList,
      emsType: '',  //EMS
      emsList,
      mailType: '', //平邮
      mailList
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('RRR ',nextProps);
    let { fastList,emsList,mailList } = this.state;
    // if (nextProps.item != undefined) {
    //   if (nextProps.item.carryModeList && nextProps.item.carryModeList.length > 0) {
    //     nextProps.item.carryModeList.map((k,i) => {
    //       if (k.carryWay == 0) {
    //         fastList.push(k)
    //       }else if (k.carryWay == 1) {
    //         emsList.push(k)
    //       } else {
    //         mailList.push(k)
    //       }
    //     })
    //   }
    //   console.log('OOOO',fastList,emsList)
    //   this.setState({
    //     item: nextProps.item,
    //     fastList,emsList,mailList
    //   })
    // }

  }

  updateItem = (e,field,record,index) => {
    console.log('hhhh',e,field,record,index);
    let { fastList,emsList,mailList } = this.state;
    if (record.carryWay == 0) {
      fastList[index][field] = e
    }
    if (record.carryWay == 1) {
      emsList[index][field] = e
    }
    if (record.carryWay == 2) {
      mailList[index][field] = e
    }
    this.setState({
      fastList,emsList,mailList
    })
  }

  onSubmit = () => {
    const { validateFields,getFieldsValue,item } = this.props.form;
    const { fastList,emsList,mailList } = this.state;

    validateFields((errors) => {
      if (errors) {
        return;
      }
      let data = {
        ...item,
        carryModeList: fastList.concat(emsList,mailList),
        ...getFieldsValue(),
      };
      console.log('mmmmm',data)
      this.props.onSave(data)
    });
  }

  onMove = (data,index) => {
    let { fastList,emsList,mailList } = this.state;
    if (data.carryWay == 0) {
      fastList.splice(index,1)
    }
    if (data.carryWay == 1) {
      emsList.splice(index,1)
    }
    if (data.carryWay == 2) {
      mailList.splice(index,1)
    }
    this.setState({
      fastList,emsList,mailList
    })
  }

  onAdd = (type) => {
    let { fastList,emsList,mailList } = this.state;
    const data = [
      {
        region: '',
        firstPiece: '',
        firstAmount: '',
        secondPiece: '',
        secondAmount: '',
        carryWay: type == 'fast' ? 0 : type == 'ems' ? 1 : 2
      }
    ]
    if (type == 'fast') {
      fastList = fastList.concat(data)
    }
    if (type == 'ems') {
      emsList = emsList.concat(data)
    }
    if (type == 'mail') {
      mailList = mailList.concat(data)
    }
    this.setState({
      fastList,emsList,mailList
    })
  }

  onChange = (e,type) => {
    let { fastType,fastList,emsType,emsList,mailType,mailList } = this.state;
    let data = {};
    if (e.target.checked) {
      data = {
        region: '',
        firstPiece: 1,
        firstAmount: 0,
        secondPiece: 1,
        secondAmount: 0,
        carryWay: type == 'fast' ? 0 : type == 'ems' ? 1 : 2
      }
    } else {
      data = {}
    }

    if (type === 'fast') {
      fastType = type;
      if (e.target.checked) {
        fastList = [{...data}]
      } else {
        fastList = [];
        fastType = '';
      }
    }
    if (type === 'ems') {
      emsType = type;
      if (e.target.checked) {
        emsList = [{...data}]
      } else {
        emsList = [];
        emsType = '';
      }
    }

    if (type === 'mail') {
      mailType = type;
      if (e.target.checked) {
        mailList = [{...data}]
      } else {
        mailList = [];
        mailType = '';
      }
    }
    this.setState({
      fastType,fastList,emsType,emsList,mailType,mailList
    })
  }

 render() {

   const { getFieldDecorator } = this.props.form;
   const { item,fastType,fastList,emsType,emsList,mailType,mailList } = this.state;
   console.log('kkklll',fastType,fastList,emsType,emsList)

   const columnsObj = [
     {
       title: '地区',
       key: 'region',
       render: (record,text,index) => (
         <span>
          {
            index !== 0 ?
            <Input value={record.region != undefined ? record.region : ''}
              onChange={(e) => this.updateItem(e.target.value,'region',record,index)}
            />
            :
            <span>默认运费</span>
          }
         </span>
       )
     },
     {
       title: '首件数量',
       key: 'firstPiece',
       render: (record,text,index) => (
         <InputNumber value={record.firstPiece != undefined ? record.firstPiece : ''}
          onChange={(e) => this.updateItem(e,'firstPiece',record,index)}
          min={0}
         />
       )
     },
     {
       title: '首费',
       key: 'firstAmount',
       render: (record,text,index) => (
         <InputNumber value={record.firstAmount != undefined ? record.firstAmount : ''}
         onChange={(e) => this.updateItem(e,'firstAmount',record,index)}
         min={0}
         />
       )
     },
     {
       title: '续件',
       key: 'secondPiece',
       render: (record,text,index) => (
         <InputNumber value={record.secondPiece != undefined ? record.secondPiece : ''}
         onChange={(e) => this.updateItem(e,'secondPiece',record,index)}
         min={0}
         />
       )
     },
     {
       title:'续费',
       key:'secondAmount',
       render: (record,text,index) => (
         <InputNumber value={record.secondAmount != undefined ? record.secondAmount :  ''}
         onChange={(e) => this.updateItem(e,'secondAmount',record,index)}
         min={0}
         />
       )
     },
     {
       title: '操作',
       key: 'oprate',
       render: (record,text,index) => (
         <span>
          {
            index !== 0 ?
            <a onClick={() => this.onMove(record,index)}>移除</a>
            : ''
          }
         </span>
       )
     }
   ]

   const fastProps = {
     list: fastList,
     loading: false,
     columns:[
       ...columnsObj
     ]
   }

   const emsProps = {
     list: emsList,
     loading: false,
     columns:[
       ...columnsObj
     ]
   }

   const mailProps = {
     list: mailList,
     loading: false,
     columns:[
       ...columnsObj
     ]
   }

   return (
     <div style={{ backgroundColor: '#fff',padding: '20px'}}>
       <h2>{this.props.title}</h2>
       <Form>
         <Row>
          <Col span={12}>
            <FormItem label='模板名称' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                    message:'请填写名称'
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='标题' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('title', {
                initialValue: item.title,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='内容' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('content', {
                initialValue: item.content,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label='消息格式' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('messageFormat', {
                initialValue: item.messageFormat,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='地址' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('shopAddr', {
                initialValue: item.shopAddr,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='发货时间' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('dispatchTime', {
                initialValue: item.dispatchTime,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input type='number'/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='是否包邮' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('isInclPostage', {
                initialValue: item.isInclPostage,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={1}>卖家承担运费 </Radio>
                  <Radio value={0}>自定义运费  </Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='计价方式' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('valuationModel', {
                initialValue: item.valuationModel,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={0}>按件数 </Radio>
                  <Radio value={1}>按重量 </Radio>
                  <Radio value={2}>按体积 </Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='是否指定条件包邮' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('IsInclPostageByIf', {
                initialValue: item.IsInclPostageByIf,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={0}>否</Radio>
                  <Radio value={1}>是</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='是否指定条件包邮' hasFeedback {...formItemLayout()}>
              {getFieldDecorator('isInclPostageByIf', {
                initialValue: item.isInclPostageByIf,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label='运送方式' hasFeedback {...formItemLayout(3,20)}>
              <Checkbox onChange={(e) => this.onChange(e,'fast')}
                checked={fastList.length > 0 ? true : false }
              >快递</Checkbox>
              {
                fastList.length > 0 ?
                <div>
                  <Button onClick={() => this.onAdd('fast')}>为指定城市设置运费</Button>
                  <TableInSpin {...fastProps}/>
                </div>
                : ''
              }
              <br/>
              <Checkbox onChange={(e) => this.onChange(e,'ems')}
                checked={emsList.length > 0 ? true : false }
              >EMS</Checkbox>
              {
                emsList.length > 0 ?
                <div>
                  <Button onClick={() => this.onAdd('ems')}>为指定城市设置运费</Button>
                  <TableInSpin {...emsProps}/>
                </div>
                : ''
              }
              <br/>
              <Checkbox onChange={(e) => this.onChange(e,'mail')}
                checked={mailList.length > 0 ? true : false }
              >平邮</Checkbox>
              {
                mailList.length > 0 ?
                <div>
                  <Button onClick={() => this.onAdd('mail')}>为指定城市设置运费</Button>
                  <TableInSpin {...mailProps}/>
                </div>
                : ''
              }
              <br/>

            </FormItem>
          </Col>
         </Row>
       </Form>

       <div style={{textAlign: 'right',marginTop:'2em'}}>
        <Button type='primary' style={{ marginRight: '1em'}} onClick={()=> this.onSubmit()}>保存</Button>
        <Button onClick={this.props.onBack}>返回</Button>
       </div>
     </div>
   )
 }

}

export default Form.create()(AddFreightForm)
