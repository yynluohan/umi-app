import React, { Component } from 'react'
import QRCode from 'qrcode.react'
import { Modal } from 'antd'

export default class QRCodeView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({
      visible: !this.state.visible
    })
  }

  render () {
    const { dataPool } = this.context
    const { data = {} } = this.props
    const { visible } = this.state
    let baseUrl = ''
    if (dataPool) {
      baseUrl = dataPool.getToTemp('BaseUrl')
    }
    return (
      <div onClick={this.handleClick}>
        <QRCode value={`${baseUrl}?${data.prefix}=${data.code}`} size={40} />
        <Modal
          visible={visible}
          width={300}
          footer={null}
          closable={false}
          onCancel={this.handleClick}
        >
          <QRCode value={`${baseUrl}?${data.prefix}=${data.code}`} size={256} />
        </Modal>
      </div>
    )
  }
}
