import React from 'react'
import Logo from '@/component/logo/logo'
import { InputItem, Button, WhiteSpace, WingBlank,Radio ,List } from 'antd-mobile'

const RadioItem = Radio.RadioItem;

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
    console.log(this.state)
  }
  handleChange(name,v){
    this.setState({
      [name]: v
    })
  }
  render(){
    return (
      <div>
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem
              onChange = {v=>this.handleChange('user',v)}
            >账号</InputItem>
            <WhiteSpace />
            <InputItem
              onChange = {v=>this.handleChange('pwd',v)}
            >密码</InputItem>
            <WhiteSpace />
            <InputItem
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