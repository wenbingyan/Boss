import React from 'react'
import Logo from '@/component/logo/logo'
import { InputItem, Button, WhiteSpace, WingBlank,Radio ,List } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '@/redux/user'
import { Redirect } from 'react-router-dom'
import { inputHOC } from '@/component/inputHOC'

const RadioItem = Radio.RadioItem;

@connect(
  state=>state.user,
  {register}
)
@inputHOC
class Register extends React.Component{
  componentDidMount(){
    this.props.handleChange('type', 'genius')
  }
  handRegister = ()=>{
    this.props.register(this.props.state)
  }
  render(){
    return (
      <div>
        { (this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to = {this.props.redirectTo} /> : null }
        <Logo></Logo>
        <WingBlank>
          { this.props.msg ? <p className='error_msg'>{this.props.msg}</p> : null }
          <List>
            <InputItem
              onChange = {v=>this.props.handleChange('user',v)}
            >账号</InputItem>
            <WhiteSpace />
            <InputItem
              type = 'password'
              onChange = {v=>this.props.handleChange('pwd',v)}
            >密码</InputItem>
            <WhiteSpace />
            <InputItem
              type = 'password'
              onChange = {v=>this.props.handleChange('cpwd',v)}
            >确认密码</InputItem>
            <RadioItem 
              checked={this.props.state.type === 'genius'}
              onChange = {()=>this.props.handleChange('type', 'genius')}
            >牛人</RadioItem>
            <RadioItem 
              checked={this.props.state.type === 'boss'}
              onChange = {()=>this.props.handleChange('type', 'boss')}
            >BOSS</RadioItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handRegister} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register