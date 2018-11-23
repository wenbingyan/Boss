import React from 'react'
import Logo from '@/component/logo/logo'
import { InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile' 
import { connect } from 'react-redux'
import { login } from '@/redux/user'
import { Redirect } from 'react-router-dom'
import { inputHOC } from '@/component/inputHOC'

@connect(
  state => state.user,
  {login}
)
@inputHOC
class Login extends React.Component{
  goResgister = ()=>{
    this.props.history.push('register')
  }
  handLogin = ()=>{
    this.props.login(this.props.state)
  }
  render(){
    return (
      <div>
        { (this.props.redirectTo && this.props.redirectTo !=='/login') ? <Redirect to = {this.props.redirectTo} /> : null }
        <Logo></Logo>
        <WingBlank>
          { this.props.msg ? <p className='error_msg'>{this.props.msg}</p> : null }
          <InputItem
            onChange = {v=>this.props.handleChange('user',v)}
          >账号</InputItem>
          <WhiteSpace />
          <InputItem
            type = 'password'
            onChange = {v=>this.props.handleChange('pwd',v)}
          >密码</InputItem>
          <WhiteSpace />
          <Button type="primary"
            onClick = {this.handLogin}
          >登录</Button>
          <WhiteSpace />
          <Button onClick={this.goResgister} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login