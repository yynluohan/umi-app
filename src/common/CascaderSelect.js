import React from 'react';
import { Cascader } from 'antd';

export default class CascaderSelect extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: props.data || []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        data: nextProps.data
      })
    }
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
  }

  render() {

    const { list } = this.props;
    const { data } = this.state;

    console.log('YYY',data)

    return (
      <div>
        <Cascader
          options={list}
          onChange={this.onChange}
          placeholder="Please select"
          autoFocus={true}
          value={data}
         />
      </div>
    )
  }
}
