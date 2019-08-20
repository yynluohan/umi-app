import React from 'react';
import { Input,message,Form,Select,Button,Radio } from 'antd';
import styles from './css/register.css';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { create } from '../framework/utils/services'


const FormItem = Form.Item;

class Register extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      password: '',
      passwordAgain: '',
      registerType: 'email',  //注册类型
      code: '', //验证码
      isShowTime: false,
    }
  }

  //点击注册按钮
  onRegisterOk = () => {
    const { validateFields,getFieldsValue } = this.props.form;
    const { password,passwordAgain,registerType } = this.state;
    let data = {};
    if (registerType == 'email') {
      data = {
        email: getFieldsValue().email,
      }
    } else {
      data = {
        phone: getFieldsValue().phone
      }
    }
    validateFields((errors) => {
      if (errors) {
        return;
      }
      this.props.dispatch({
        type: 'login/onRegister',
        payload:{
          ...data,
          password: getFieldsValue().password,
          validateCode: getFieldsValue().validateCode,
        }
      })
    })
  }

  //点击登录按钮
  onBackLogin = () => {
    this.props.dispatch(routerRedux.push('/login'))
  }

  //获取验证码
  onGetCode = () => {
    const { getFieldsValue } = this.props.form;
    const { registerType } = this.state;
    const _this = this;
    const value = registerType == 'email' ? getFieldsValue().email : getFieldsValue().phone;
    if (value) {
      let data = {};
      if (registerType == 'email') {
        data = {
          receiver: getFieldsValue().email,
          type: 'EmailValidate'
        }
      } else {
        data = {
          receiver: getFieldsValue().phone,
          type: 'PhoneValidate'
        }
      }
      create(`${window.MC.BASEURL}/api/pub/validateCodes/send`,data).then(({ code,data,message }) => {
        if (code === 200) {
          _this.setState({
            isShowTime: true
          })
          _this.getInter()
        } else {
          message.error(message)
        }
      })
    } else {
       message.error(`请填写${ registerType == 'email' ? '邮箱' : '手机号码'}！`)
    }
  }

  getInter = () => {
    const _this = this;
    let setInter = window.setInterval(function() {
      var time = document.getElementById("time");
      console.log('BBB');
      if (time.innerHTML == 0){
        window.clearInterval(setInter)
        _this.setState({
          isShowTime: false
        })
      } else {
        time.innerHTML -= 1;
      }
    },1000)
  }

  onChangeType = (e) => {
    const { setFieldsValue } = this.props.form;
    this.setState({
      isShowTime: false
    })
    window.clearInterval()
    this.setState({
      registerType: e.target.value,
      password: '',
      passwordAgain: '',
      code: ''
    })
    setFieldsValue({'password': ''})
    setFieldsValue({'passwordAgain': ''})
    setFieldsValue({'emailValidateCode': ''})
  }

  handleConfirmPassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    if (value && value !== getFieldValue('password')) {
        callback('两次输入不一致！')
    }
    callback()
  }

  render() {

    const { password,registerType,isShowTime } = this.state;
    const { registeredGithubUsername } = this.props.login;
    const { getFieldDecorator } = this.props.form;


    return (
      <Form>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div>{ registeredGithubUsername ? '账号绑定' : '注册' }</div>
              <div>已有账号？<span onClick={() => this.onBackLogin()}>登录</span></div>
            </div>
            <FormItem style={{width:'70%',marginTop:'1em'}}>
              <Radio.Group value={registerType} buttonStyle="solid" style={{ width:'100%',display:'flex'}}
                onChange={(e) => this.onChangeType(e)}
              >
                <Radio.Button value="email" style={{width: '50%',height:'40px',textAlign:'center' }}>
                  <span style={{marginTop:'0.4em',display:'inline-block'}}>邮箱注册</span>
                </Radio.Button>
                <Radio.Button value="phone" style={{width: '50%',height:'40px',textAlign:'center' }}>
                  <span style={{ marginTop: '0.4em',display:'inline-block'}}>手机注册</span>
                </Radio.Button>
              </Radio.Group>
            </FormItem>

            {
              registerType == 'email' ?
              <FormItem style={{width:'70%',marginTop:'0.5em'}}>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: true,
                      message: '请填写邮箱！',
                    },
                    {
                      type:'email',
                      message:'请填写正确的邮箱！'
                    }
                  ],
                })(
                  <Input style={{height:'40px',fontSize:'16px'}}
                   type='email'
                   placeholder='邮箱'
                  />
                )}
              </FormItem>
              :
              <FormItem style={{width:'70%',marginTop:'0.5em'}}>
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true,
                      message: '请填写手机号码！',
                    },
                    {
                      pattern: '^(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$',
                      message: '请填写正确的手机号码！'
                    }
                  ],
                })(
                  <Input style={{height:'40px',fontSize:'16px'}}
                   placeholder='手机号码'
                  />
                )}
              </FormItem>
            }

            <FormItem style={{width:'70%',marginTop:'0.5em'}}>
              {getFieldDecorator('password', {
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
                 onChange={(e) => this.setState({ password: e.target.value })}
                 type='password'
                 placeholder='密码'
                />
              )}
            </FormItem>

            {
              password ?
              <FormItem style={{width:'70%',marginTop:'0.5em'}}>
                {getFieldDecorator('passwordAgain', {
                  rules: [
                    {
                      required: true,
                      message: '请填写密码！',
                    },
                    {
                      validator:this.handleConfirmPassword
                    }
                  ],
                })(
                  <Input style={{height:'40px',fontSize:'16px'}}
                   onChange={(e) => this.setState({ passwordAgain: e.target.value })}
                   type='password'
                   placeholder='再次确认密码'
                  />
                )}
              </FormItem>
              :
              ''
            }

            <FormItem style={{width:'70%',marginTop:'0.5em'}}>
              {getFieldDecorator('validateCode', {
                rules: [
                  {
                    required: true,
                    message: '请填写验证码！',
                  }
                ],
              })(
                <div style={{ display: 'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <Input style={{height:'40px',fontSize:'16px',width:'200px'}}
                    onChange={(e) => this.setState({ code: e.target.value })}
                    value={this.state.code}
                    placeholder='请填写验证码'
                  />
                  {
                    !isShowTime ?
                    <Button style={{height:'40px'}} onClick={() => this.onGetCode()}>
                      <span id='time' style={{display:'none'}}></span>点我获取验证码
                    </Button>
                    :
                    <Button style={{height:'40px'}}><span id='time'>10</span>s后可重新获取</Button>
                  }
                </div>
              )}
            </FormItem>

            <div className={styles.login} onClick={() => this.onRegisterOk()}
              style={{ marginTop: password ? '0.5em' : '2em'}}
            >
              {
                registeredGithubUsername ?
                '账号绑定'
                :
                '注册'
              }
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

const RegisterForm = Form.create()(Register)

export default connect(mapStateToProps)(RegisterForm)
