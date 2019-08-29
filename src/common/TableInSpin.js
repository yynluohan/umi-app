import React from 'react';
import { Form, Spin, Table, Pagination } from 'antd';

const TableInSpin = ({ loading, current = 1, total, pageSize = 10,
  columns = [], list = [], onPageChange,
  rowSelection, scrollX = false, onSorter, sortAll = false,rowKey='id' }) => {

  const onNewSort = (name) => {
    return function (o, p) {
      let a, b;
      if (typeof o === 'object' && typeof p === 'object' && o && p) {
        a = o[name];
        b = p[name];
        if (typeof a === 'string' && typeof b === 'string') {
          return a.localeCompare(b);
        }
        if (typeof a === 'number' && typeof b === 'number') {
          if (a > b) return 1;
          if (a === b) return 0;
          if (a < b) return -1;
        }
      }
    };
  };

  const handleTableChange = (sorter) => {
    if (sortAll) {
      onSorter(sorter);
    } else if (sorter.order) {
      if (sorter.order === 'descend') {
        const newList = list.sort(onNewSort(sorter.columnKey));
        list = newList.reverse();
      } else {
        list.sort(onNewSort(sorter.columnKey));
      }
    }
  };


  const createByColumns = columns => columns.length > 0 && columns.map((item) => {
    if (typeof (item) === 'object') {
      item.width = item.fixed ? 150 : '';
      item.sorter = onSorter ? (!(item.key === 'action' || item.key === 'desc' || item.key === 'associateStaff')) : false;
      return item;
    } else {
      return ({
        title: item,
        dataIndex: item,
        key: item.key,
        sorter: !!onSorter,
      });
    }
  });

  const allWidth = (columns.length + 1) * 150 - 50;

  const paginate = () => {
    if (total && onPageChange) {
      return <Pagination className="ant-table-pagination" current={current} total={total} pageSize={pageSize} onChange={onPageChange} />;
    }
  };

  return (
    <Spin spinning={loading}>
      {scrollX ? (
        <Table
          dataSource={list}
          columns={createByColumns(columns)}
          pagination={false}
          onChange={handleTableChange}
          rowKey={rowKey}
          rowSelection={rowSelection}
          scroll={{ x: allWidth }}
        />
) : (
  <Table
    dataSource={list}
    columns={createByColumns(columns)}
    pagination={false}
    onChange={handleTableChange}
    rowKey={rowKey}
    rowSelection={rowSelection}
  />
)}
      {paginate()}
    </Spin>
  );
};

export default Form.create()(TableInSpin);
