import React from 'react'
import { Select } from 'antd'

class FieldOptionInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      apiUrl: props.apiUrl,
      value: props.value || ''
    }
    this.onFocus = this.onFocus.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onFocus()
  }

  onFocus () {
    if (this.state.list.length > 0) {

    } else {
      this.props.method(this.state.apiUrl).then(({ code, data }) => { // 查询api，获取数据
        if (code && code === 200) {
          this.setState({
            list: data.records || data // 更新list
          })
          if (this.props.onSave) {
            this.props.onSave(data.records || data)
          }
        }
      })
    }
  }

  onClick (data) {
    if (this.props.onSelected) {
      this.props.onSelected(data)
    }
  }

  render () {
    const { list } = this.state
    let { getway = {} } = this.props
    if (Object.keys(getway).length === 0) {
      getway = {
        name: 'name',
        value: 'id'
      }
    }

    return (
      <Select
        onChange={this.props.onChange}
        value={this.props.value}
        onFocus={() => this.onFocus()}
        placeholder='请选择'
      >
        {
          list.length > 0 && list.map((item, index) => (
            <Select.Option
              key={index} value={item[getway.value]}
              onClick={() => this.onClick(item)}
            >
              {item[getway.name]}
            </Select.Option>
          ))
        }
      </Select>
    )
  }
}

export default FieldOptionInput
