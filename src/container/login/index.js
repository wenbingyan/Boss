import React from 'react'
import Logo from '@/component/logo/logo'
import { InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile'

class Login extends React.Component{
  goResgister = ()=>{
    this.props.history.push('register')
  }
  render(){
    return (
      <div>
        <Logo></Logo>
        <WingBlank>
          <InputItem>账号</InputItem>
          <WhiteSpace />
          <InputItem>密码</InputItem>
          <WhiteSpace />
          <Button type="primary">登录</Button>
          <WhiteSpace />
          <Button onClick={this.goResgister} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login