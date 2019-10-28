import React from 'react'
import styles from './lineLayout.css'

class LineLayout extends React.Component {
  render () {
    const { children } = this.props

    return (
      <div className={styles.continer}>
        {children}
      </div>
    )
  }
}

export default LineLayout
