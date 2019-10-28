import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import putStorageConfig from './config/putStorageConfig.js'

class PutStorage extends React.Component {
  render () {
    return (
      <div>
        <ZEle namespace='supply' config={putStorageConfig} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(PutStorage)
