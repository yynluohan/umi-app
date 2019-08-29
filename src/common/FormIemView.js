import React from 'react';
import { Form,Row,Col,Button,Table } from 'antd';
import CardLayout from './layout/CardLayout';

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

class FormIemView extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      spanNumber: props.spanNumber || 2,
      list: props.list || [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== undefined) {
      this.setState({
        list: nextProps.list
      })
    }
  }

  render() {

    const { title, isHiddenBackBut=false } = this.props;
    const { spanNumber } = this.state;
    let { list } = this.state;
    let newList = [];
    list.length > 0 && list.map((item) => {
      if (list.length < spanNumber) {
        newList.push({ list: list.splice(0)})
      } else {
        newList.push({ list: list.splice(0,spanNumber)})
      }
    })
    if (list.length > 0) {
      newList.push({ list: list.splice(0)})
    }

    const createColmns = (data) => {
      data.map((item,index) => {
        if (item.valueMap) {
          data[index] = {
            ...item,
            key: item.value,
            render: (record) => (
              <span>{item.valueMap[record[item.value]]}</span>
            )
          }
        } else if (item.type && item.type === 'image') {
          data[index] = {
            ...item,
            key: item.value,
            render: (record) => (
              <img style={{width: '50px'}} src={record[item.value]} alt=''/>
            )
          }
        } else {
          data[index] = {
            ...item,
            dataIndex: item.value,
            key: item.value,
          }
        }
      })
      return data
    }

    return (
      <div style={{ background: '#fff',padding: title ? '20px' : '0'}}>
        <h2>{title || ''}</h2>
        <Form>
            {
              newList.length > 0 && newList.map((item,index) => (
                <Row key={index} style={{display:'flex',flexWrap:'wrap'}}>
                  {
                    item.list.length > 0 && item.list.map((k,i) => {
                      if (k.columns) {
                        return (
                          <Col span={24} key={i} style ={{ marginBottom: '2em'}}>
                            <CardLayout title={k.label}>
                              <Table columns={createColmns(k.columns)} dataSource={k.data} pagination={false}/>
                              <div style={k.otherData ? {padding: '1em'} : {}}>
                                {
                                  k.otherData && k.otherData.length > 0 && k.otherData.map((m,n) => (
                                    <div key={n}>
                                      <span>{m.title}</span>: <span>{m.value}</span>
                                    </div>
                                  ))
                                }
                              </div>
                            </CardLayout>
                          </Col>
                        )
                      } else {
                        let a = 6,
                            b= 18;
                        if (k.span && k.span === 24) {
                          a = 2;
                          b = 22
                        }
                        return (
                          <Col key={i} span={k.span || 24/spanNumber}>
                            <FormItem label={k.label} hasFeedback {...formItemLayout(a,b)}>
                              {k.data || ''}
                            </FormItem>
                          </Col>
                        )
                      }
                    })
                  }
                </Row>
              ))
            }
        </Form>
        {this.props.children || ''}
        {
          !isHiddenBackBut ?
          <div style={{textAlign:'right',marginTop:'2em'}}>
            <Button type='primary' onClick={() => window.history.go(-1)}>返回</Button>
          </div>
          : null
        }

     </div>
    )
  }
}

export default FormIemView
