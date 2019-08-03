import React from 'react';
import { TreeSelect } from 'antd';

// 展示树形选择组件

export default class SelectTree extends React.Component {

  constructor(props) {
    super(props);
    console.log('===',props)
    this.state = {
      value: props.getId != undefined ? props.getId : undefined,
      list: []
    }
  }

  componentDidMount() {
    //获取数据源
    const { apiUrl='',method='',queryData={} } = this.props;
    apiUrl && method && method(apiUrl,queryData).then(({ code,data }) => {
      if (code === 200) {
        this.setState({
          list: data.records || data,
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('222',nextProps)
    if (nextProps.getId != undefined) {
      this.setState({
        value: nextProps.getId
      })
    }
  }

  onChange = (value) => {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {

    console.log('kkkk',this.props,this.state.value)

    const { getway = {} } = this.props;
    // getway用于处理某些api返回来的格式不能正确对应label和children是使用
    let { list } = this.state;

    const isGetWay = Object.keys(getway).length > 0 ? true : false;
    //传入getway对象，则说明需要数据处理

    //数据格式处理
    function mapChild(data,b) {
      data.map((item,index) => {
        if (isGetWay) {
          data[index] = {
            label: item[getway['label']],
            value: item.id,
            key: item.id,
            children: item[getway.children]
          }
          const pid = b ? b + item.id : item.id;
          if (data[index].children && data[index].children.length > 0) {
            data[index].children = mapChild(data[index].children,pid)
          }
        } else {
          data[index] = {
            label:item.label,
            value: item.id,
            key: item.id,
            children: item.children
          }
        }
      })
      return data
    }


    return (
      <TreeSelect
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={mapChild(list)}
        placeholder="Please select"
        // treeDefaultExpandAll
        onChange={this.onChange}
      />
    );

  }
}
