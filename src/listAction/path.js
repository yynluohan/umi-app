import React from 'react';
import { Button } from 'antd';

export default (props) => {
  const { title, options } = props;

  function handleClick() {
    window.location.href = '#' + options.path
  }

  return <div>
    <Button onClick={handleClick} type="primary">
      {title}
    </Button>
  </div>
}
