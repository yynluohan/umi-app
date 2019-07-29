import React from 'react';
import styles from './baseFormLayout.css';

class BaseFormLayout extends React.Component {

  render(){

    const { children } = this.props;

    return (
      <div className={ styles.continer }>
        {children}
      </div>
    )
  }
}

export default BaseFormLayout
