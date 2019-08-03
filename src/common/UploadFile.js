import React, { PureComponent } from 'react';
import { Upload, Icon, Modal, Button } from 'antd';

export default class UploadFile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      fileList: format(props.value),
      loading: false,
      url: props.url || '/api/uploadfile'
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return {
        value: nextProps.value,
        reFormat: true,
      }
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    const { reFormat, value } = this.state;
    if (reFormat) {
      this.setState({
        fileList: format(value),
        reFormat: false,
      });
    }
  }

  handleChange = (info) => {
    const { fileList } = info;
    this.setState({ fileList });
    if (info.file.status === 'uploading' && fileList.length > 0) {
      this.setState({
        loading: true,
      });
    }
    if (info.file.status === 'done' || info.file.status === 'error' || info.file.status === 'removed') {
      this.setState({
        loading: false,
      });
      const doneFileList = fileList.filter(file => file.status === 'done');
      const saveFileList = doneFileList.map(file => ({
        url: file.response ? file.response.data.url : file.url,
        name: file.response ? (file.response.data.originalFileName || file.response.data.name) : file.name,
      }));
      this.props.onChange(saveFileList);
    }
  }

  render() {
    const { fileList } = this.state;
    const { max = 1 } = this.props;

    const uploadProps = {
      name: 'file',
      action: `${window.MC.UPLOADHOST}` + this.state.url,
      fileList: fileList,
      showUploadList: true,
      headers: {
        authorization: `Bearer ${window.localStorage.token}`,
      },
      onChange: this.handleChange
    }

    const uploadButton = (
      <Button>
        <Icon type="upload" /> 点击上传
      </Button>
    );

    return (
      <div className="clearfix">
        <Upload
          {...uploadProps}
        >
          {fileList.length >= max ? null : uploadButton}
        </Upload>
      </div>
    )
  }
}

function format(value) {
  let rst = [];
  try {
    if (typeof (value) === 'string') {
      rst = JSON.parse(value);
    } else if (Array.isArray(value)) {
      rst = value;
    }
  } catch (e) {
    // rst.push(value);
  }
  rst.length > 0 && rst.map((item, index) => {
    rst[index] = {
      ...item,
      uid: index,
      status: 'done',
    }
  });
  return rst;
}
