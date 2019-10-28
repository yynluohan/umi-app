import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import smallProgramConfig from './config/smallProgramConfig'

const SmallProgram = ({ dispatch, config }) => {
  return (
    <div>
      <ZEle namespace='config' config={smallProgramConfig} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    config: state.config
  }
}

export default connect(mapStateToProps)(SmallProgram)
