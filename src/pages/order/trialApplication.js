import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import trialApplicationConfig from './config/trialApplicationConfig.js'

class TrialApplication extends React.Component {
  render () {
    return (
      <div>
        <ZEle namespace='order' config={trialApplicationConfig} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    order: state.order
  }
}

export default connect(mapStateToProps)(TrialApplication)
