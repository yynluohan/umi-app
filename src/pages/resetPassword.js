import React from 'react';
import { Input,Form } from 'antd';
import styles from './css/resetPassword.css';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

class ResetPassword extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  onRegisterOk = () => {
    // window.localStorage.token = '123';
    // window.location.href = '#/'
  }

  onBackLogin = () => {
    this.props.dispatch(routerRedux.push('/login'))
  }

  render() {

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div>重置密码</div>
            <div onClick={() => this.onBackLogin()}>返回登录</div>
          </div>
          <Input style={{width:'70%',height:'45px',fontSize:'18px',margin:'2em 0'}}
           placeholder='Email'
          />
          <Input style={{width:'70%',height:'45px',fontSize:'18px'}}
           type='password'
           placeholder='password'
          />
          <div className={styles.login} onClick={() => this.onRegisterOk()}>提交</div>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

const ReSetForm = Form.create()(ResetPassword)

export default connect(mapStateToProps)(ReSetForm)
