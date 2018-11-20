import React from 'react'
import Logo from '@/component/logo/logo'
import { InputItem, Button, WhiteSpace, WingBlank,Radio ,List } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '@/redux/user'
import { Redirect } from 'react-router-dom'

const RadioItem = Radio.RadioItem;

@connect(
  state=>state.user,
  {register}
)
class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user: '',
      pwd: '',
      cpwd: '',
      type: 'genius'
    }
  }
  handRegister = ()=>{
    this.props.register(this.state)
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
          <List>
            <InputItem
              onChange = {v=>this.handleChange('user',v)}
            >账号</InputItem>
            <WhiteSpace />
            <InputItem
              type = 'password'
              onChange = {v=>this.handleChange('pwd',v)}
            >密码</InputItem>
            <WhiteSpace />
            <InputItem
              type = 'password'
              onChange = {v=>this.handleChange('cpwd',v)}
            >确认密码</InputItem>
            <RadioItem 
              checked={this.state.type === 'genius'}
              onChange = {()=>this.handleChange('type', 'genius')}
            >牛人</RadioItem>
            <RadioItem 
              checked={this.state.type === 'boss'}
              onChange = {()=>this.handleChange('type', 'boss')}
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