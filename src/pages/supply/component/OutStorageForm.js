import React from 'react'
import { Form, Col, Row, Input, Button, DatePicker, InputNumber, message, Select } from 'antd'
import { query } from '../../../framework/utils/services'
import FieldOptionInput from '../../../common/FieldOptionInput'
import moment from 'moment'
import Selection from '../../../common/Selection'
import TableInSpin from '../../../common/TableInSpin'

const FormItem = Form.Item
const dataFormat = window.MC.DATETIMEFORMAT
const formItemLayout = (a, b) => {
  return {
    labelCol: {
      span: a || 6
    },
    wrapperCol: {
      span: b || 18
    }
  }
}

class OutStorageForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      item: {},
      storageOutItems: [] // 选中的产品
    }

    this.onChangeTable = this.onChangeTable.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    if (!this.props.title.includes('编辑')) {
      this.getProcurementCode()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.item) {
      this.setState({
        item: nextProps.item,
        storageOutItems: this.state.storageOutItems.length > 0 ? this.state.storageOutItems : nextProps.item.storageOutItems
      })
    }
  }

  // 获取入库编号
  getProcurementCode () {
    const { item } = this.state
    query('/api/pub/sn/serial', { prefix: 'OUT' }).then(({ code, data }) => {
      if (code === 200) {
        item.transactionCode = data
        this.setState({
          item
        })
      }
    })
  }

  // 表格入库数量发生改变时触发
  onChangeTable (a, b, c) {
    const { storageOutItems } = this.state
    storageOutItems[a][c] = b
    this.setState({
      storageOutItems
    })
  }

  onSubmit (statusData) {
    const { validateFields, getFieldsValue } = this.props.form
    const { storageOutItems, item } = this.state
    validateFields((errors) => {
      if (errors) {
        return
      }
      if (storageOutItems.length === 0) {
        message.error('请选择需要入库的商品！')
        return
      }
      let procurementTotal = 0
      let productRefundQuantities = 0
      storageOutItems.length > 0 && storageOutItems.map((item, index) => {
        storageOutItems[index] = {
          ...item,
          skuId: item.id
        }
        procurementTotal += (item.transactionQuantities || 0) * (item.transactionSkuPrice || 0)
        productRefundQuantities += item.transactionQuantities
      })
      const data = {
        ...item,
        storageOutItems,
        originatorName: window.localStorage.username || '',
        procurementTotal,
        productRefundQuantities,
        ...getFieldsValue()
      }
      this.props.onSave(data, statusData)
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { item, storageOutItems } = this.state

    const selectionProps = {
      type: 'checkbox',
      butName: '+ 添加',
      isButton: true,
      method: query,
      apiUrl: '/api/wms/skus',
      selected: (data) => this.setState({ storageOutItems: storageOutItems.concat(data) }),
      columns: [
        {
          title: '商品条码',
          key: 'barCode',
          dataIndex: 'barCode'
        },
        {
          title: '商品编号',
          key: 'skuCode',
          dataIndex: 'skuCode'
        },
        {
          title: '商品名称',
          key: 'skuName',
          dataIndex: 'skuName'
        },
        {
          title: '单位',
          key: 'field1',
          dataIndex: 'field1'
        }
      ]
    }

    const tableInspinProps = {
      list: storageOutItems,
      loading: false,
      columns: [
        {
          title: '商品条码',
          key: 'barCode',
          dataIndex: 'barCode'
        },
        {
          title: '出库时间',
          key: 'createTime',
          dataIndex: 'createTime'
        },
        {
          title: '商品编号',
          key: 'skuCode',
          dataIndex: 'skuCode'
        },
        {
          title: '商品名称',
          key: 'skuName',
          dataIndex: 'skuName'
        },
        {
          title: '出库数量',
          key: 'transactionQuantities',
          render: (record, text, index) => (
            <InputNumber
              min={0}
              onChange={(e) => this.onChangeTable(index, e, 'transactionQuantities')}
              value={record.transactionQuantities}
            />
          )
        },
        {
          title: '出库价格',
          key: 'transactionSkuPrice',
          render: (record, text, index) => (
            <InputNumber
              min={0}
              onChange={(e) => this.onChangeTable(index, e, 'transactionSkuPrice')}
              value={record.transactionSkuPrice}
            />
          )
        },
        {
          title: '单位',
          key: 'field1',
          dataIndex: 'field1'
        }
      ]
    }

    return (
      <div style={{ backgroundColor: '#fff', padding: '20px' }}>
        <h2>{this.props.title}</h2>
        <Form>
          <Row>
            <Col span={12}>
              <FormItem label='出库编号' hasFeedback {...formItemLayout()}>
                {getFieldDecorator('transactionCode', {
                  initialValue: item.transactionCode,
                  rules: [
                    {
                      required: true,
                      message: '请填写出库编号'
                    }
                  ]
                })(<Input type='text' />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='操作类型' hasFeedback {...formItemLayout()}>
                {getFieldDecorator('transactionType', {
                  initialValue: item.transactionType,
                  rules: [
                    {
                      required: true,
                      message: '请选择操作类型'
                    }
                  ]
                })(
                  <Select>
                    <Select.Option value='CustomerStorageOut'>分销商出库</Select.Option>
                    <Select.Option value='OthersStorageOut'>其他出库</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='仓库' hasFeedback {...formItemLayout()}>
                {getFieldDecorator('warehouseId', {
                  initialValue: item.warehouseId,
                  rules: [
                    {
                      required: false,
                      message: '请仓库'
                    }
                  ]
                })(
                  <FieldOptionInput method={query} apiUrl='/api/wms/warehouses?pageSize=100000' getway={{ name: 'warehouseName', value: 'id' }} />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem label='经办员' hasFeedback {...formItemLayout()}>
                {getFieldDecorator('transactionBy', {
                  initialValue: item.transactionBy
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='订单号信息' hasFeedback {...formItemLayout()}>
                {getFieldDecorator('outOrderNum', {
                  initialValue: item.outOrderNum
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label='客户' hasFeedback {...formItemLayout()}>
                {getFieldDecorator('distributorCustomer', {
                  initialValue: item.distributorCustomer
                })(
                  <Input />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem label='操作时间' hasFeedback {...formItemLayout()}>
                {getFieldDecorator('transactionTime', {
                  initialValue: item.transactionTime ? moment(item.transactionTime, dataFormat) : '',
                  rules: [
                    {
                      required: false,
                      message: '请选择操作时间'
                    }
                  ]
                })(
                  <DatePicker format={dataFormat} />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem label='制单人' hasFeedback {...formItemLayout()}>
                {window.localStorage.username}
              </FormItem>
            </Col>

            <Col span={24}>
              <FormItem label='备注' hasFeedback {...formItemLayout(3, 21)}>
                {getFieldDecorator('note', {
                  initialValue: item.note
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>

        <Selection {...selectionProps} />
        <TableInSpin {...tableInspinProps} />

        <div style={{ textAlign: 'right', marginTop: '2em' }}>
          {
            this.props.title.includes('编辑')
              ? <Button type='primary' style={{ marginRight: '1em' }} onClick={() => this.onSubmit('审核')}>提交审核</Button>
              : ''
          }
          <Button type='primary' style={{ marginRight: '1em' }} onClick={() => this.onSubmit()}>保存</Button>
          <Button onClick={this.props.onBack}>返回</Button>
        </div>
      </div>
    )
  }
}

export default Form.create()(OutStorageForm)
