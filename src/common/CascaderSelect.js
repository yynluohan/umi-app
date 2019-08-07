import React from 'react';
import { Cascader } from 'antd';

export default class CascaderSelect extends React.Component {

  onChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {

    const { list } = this.props;

    return (
      <div>
        <Cascader
          options={list}
          onChange={this.onChange}
          placeholder="Please select"
          autoFocus={true}
         />
      </div>
    )
  }
}
