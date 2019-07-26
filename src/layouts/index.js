import React from 'react';
import PrimaryLayout from '@/framework/PrimaryLayout';

function BasicLayout(props) {
  return (
    <PrimaryLayout {...props}>
      {props.children}
    </PrimaryLayout>
  );
}

export default BasicLayout;
