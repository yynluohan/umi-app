import React from 'react';
import { Input,Form } from 'antd';
import styles from './css/login.css';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'

const FormItem = Form.Item;

class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      codeUrl: `${window.MC.SENDCODE}/auth/captcha`
    }
  }

  onLogin = () => {
    const { validateFields,getFieldsValue } = this.props.form;

    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
      }
      this.props.dispatch({
        type: 'login/create',
        payload:data
      })
    })
  }

  onChangeCode = () => {
    this.setState({
      codeUrl: `${window.MC.SENDCODE}/auth/captcha` + '?d=' + new Date().getTime()
    })
  }

  onRegister = () => {
    this.props.dispatch(routerRedux.push('/register'))
  }

  onForgot = () => {
    this.props.dispatch(routerRedux.push('/resetPassword'))
  }

  render() {

    const { modalVisible,codeUrl } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div>登录</div>
              <div onClick={() => this.onRegister()}>注册</div>
            </div>
            <FormItem style={{width:'70%',marginTop:'0.5em'}}>
              {getFieldDecorator('account', {
                // initialValue:'',
                rules: [
                  {
                    required: true,
                    message: '请输入账户/邮箱/手机号！',
                  },
                ],
              })(
                <Input style={{height:'40px',fontSize:'16px'}}
                 placeholder='账户/邮箱/手机号'
                 onChange={(e) =>this.setState({ account: e.target.value })}
                />
              )}
            </FormItem>
            <FormItem style={{width:'70%',marginTop:'0.5em'}}>
              {getFieldDecorator('password', {
                // initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请填写密码！',
                  },
                  {
                    min:6,
                    message: '密码长度不能少于6位！'
                  }
                ],
              })(
                <Input style={{height:'40px',fontSize:'16px'}}
                 type='password'
                 placeholder='密码'
                 onChange={(e) => this.setState({ password: e.target.value })}
                />
              )}
            </FormItem>
            <FormItem style={{width:'70%',marginTop:'0.5em'}}>
              {getFieldDecorator('captcha', {
                rules: [
                  {
                    required: false,
                    message: '请填写验证码！',
                  }
                ],
              })(
                <div style={{ display: 'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <Input style={{height:'40px',fontSize:'16px',width:'200px'}}
                   placeholder='请填写验证码'
                   onChange={(e) => this.setState({ password: e.target.value })}
                  />
                  <img style={{height: '40px',cursor:'pointer'}} src={codeUrl}
                   onClick={() => this.onChangeCode()}
                  />
                </div>
              )}
            </FormItem>

            <div className={styles.centerBut}>
              <div></div>
              <div onClick={() => this.onForgot()}>忘记密码?</div>
            </div>
            <div className={styles.login} onClick={(e) => this.onLogin(e)}>登录</div>
            <div className={styles.line}>
              <span></span>
              <div>其他方式登录</div>
              <span></span>
            </div>

            <div className={styles.footBut}>
              <a href={`${window.MC.BASEURL}/api/pub/github/login`}>
                <img src='http://www.333cn.com/graphic/hyzx/h005/h28/img201304181451523.png'
                  alt='github账户登录'
                  onMouseEnter = {() => this.setState({modalVisible: true})}
                  onMouseLeave = {() => this.setState({modalVisible: false})}
                />
              </a>
              { modalVisible ? <div>使用github账户登录</div> : ''}
            </div>
          </div>
        </div>
     </Form>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

const LoginForm = Form.create()(Login)

export default connect(mapStateToProps)(LoginForm)
