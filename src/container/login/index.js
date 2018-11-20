import React from 'react'
import Logo from '@/component/logo/logo'
import { InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile' 
import { connect } from 'react-redux'
import { login } from '@/redux/user'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  {login}
)
class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
  }
  goResgister = ()=>{
    this.props.history.push('register')
  }
  handLogin = ()=>{
    this.props.login(this.state)
  }
  handleChange(name,v){
    this.setState({
      [name]: v
    })
  }
  render(){
    return (
      <div>
        { this.props.redirectTo ? <Redirect to = {this.props.redirectTo} /> : null }
        <Logo></Logo>
        <WingBlank>
          { this.props.msg ? <p className='error_msg'>{this.props.msg}</p> : null }
          <InputItem
            onChange = {v=>this.handleChange('user',v)}
          >账号</InputItem>
          <WhiteSpace />
          <InputItem
            type = 'password'
            onChange = {v=>this.handleChange('pwd',v)}
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