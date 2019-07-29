import React from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

export default class TreeList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      list: props.list || [],   //树形数据源
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list) {
      this.setState({
        list: nextProps.list
      })
    }
  }

  onSelect = (a,b) => {
    if (b.selected && this.props.onSelectId) {
      this.props.onSelectId(a[0].split('-')[a[0].split('-').length-1])
    }
  }

  render() {

    const { list } = this.state;

    function createTree(data,pid) {
      return data.length > 0 && data.map((item,index) => {
        return (
          <TreeNode title={item.name} key={`${pid}-${item.id}`}>
            { item.items && item.items.length > 0 ?
              createTree(item.items,`${pid}-${item.id}`)
              : ''
            }
          </TreeNode>
        )
      })
    }

    return (
      <>
        {
          list.length > 0 ?
          <Tree showLine onSelect={(selectedKeys,e) => this.onSelect(selectedKeys,e)}>
            {
              list.map((item,index) => {
                const pid = item.pid ? `${item.pid}-${item.id}` :  item.id;
                return (
                  <TreeNode title={item.name} key={pid} onClick={() => this.onClick(item)}>
                    {
                      item.items && item.items.length > 0 ?
                      createTree(item.items,pid)
                      : null
                    }
                  </TreeNode>
                )
              })
            }

          </Tree>
          : ''
        }
      </>
    )
  }

}
