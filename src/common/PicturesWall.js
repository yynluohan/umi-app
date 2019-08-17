import React from 'react';
import { Upload, Icon, Modal } from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: props.fileList || [],
      maxNumber: props.maxNumber || 1
    }
  }

  componentWillUnmount(a,b) {
    console.log('update',a,b)
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList })
    if (this.props.onChange) {
      let list = [];
      fileList.length > 0 && fileList.map((item,index) => {
        if (item.status === 'done') {
          list[index] = {
            name: item.response && item.response.data ? item.response.data.name : item.name,
            url: item.response && item.response.data ? item.response.data.url : item.url,
            status: item.status,
            uid: index
          }
        }
      })
      this.props.onChange(list)
    }
  };

  render() {
    const { previewVisible, previewImage, fileList,maxNumber } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={`${window.MC.HOST}${this.props.apiUrl || '/api/uploadfile'}`}
          listType="picture-card"
          headers={{
            Authorization: 'Bearer ' + window.localStorage.token,
          }}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.onRemove}
        >
          {fileList.length >= maxNumber ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
