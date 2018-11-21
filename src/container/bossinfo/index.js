import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import SelectAvater from '@/component/selectAvater'
import { update } from '@/redux/user'

@connect(
  state => state.user,
  { update }
)
class BossInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: ''
    }
  }
  selectAvater = (avatar)=>{
    this.setState({
      avatar
    })
  }
  handleChange = (name, val)=>{
    this.setState({
      [name]: val
    })
  }
  render(){
    const pathname = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        { redirect && pathname !==redirect ? <Redirect to={redirect} /> : null }
        <NavBar mode="dark" >Boss完善信息</NavBar>
        <SelectAvater
          select = {this.selectAvater}
        />
        <InputItem
          onChange={v=>this.handleChange('title', v)}
        >招聘职位</InputItem>
        <InputItem
          onChange={v=>this.handleChange('company', v)}
        >公司名称</InputItem>
        <InputItem
          onChange={v=>this.handleChange('money', v)}
        >职位薪资</InputItem>
        <TextareaItem
            onChange={v=>this.handleChange('desc', v)}
            title="职位要求"
            rows={3}
            autoHeight
          />
        <Button 
					onClick={()=>{
						this.props.update(this.state)
					}}
					type='primary'>保存</Button>
      </div>
      
    )
  }
}

export default BossInfo