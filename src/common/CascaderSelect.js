import React from 'react';
import { Cascader } from 'antd';

export default class CascaderSelect extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: props.data && props.data.length > 0 ? props.data : []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        data: nextProps.data && nextProps.data.length > 0 ? nextProps.data : this.state.data
      })
    }
  }

  componentWillMount(a,b) {
  }

  onChange = (value) => {
    if (this.props.onChange) {
      let text = '';
      value.length > 0 && value.map((item,index) => {
        if (index === 0) {
          text += item
        } else {
          text += `-${item}`
        }
      })
      this.props.onChange(text)
    }
    this.setState({
      data: value
    })
  }

  render() {

    const { list } = this.props;
    const { data } = this.state;

    const value = data.length > 0 ? {
      value: data
    } : {}

    return (
      <div>
        <Cascader
          options={list}
          onChange={this.onChange}
          placeholder="Please select"
          autoFocus={true}
          {...value}
         />
      </div>
    )
  }
}
