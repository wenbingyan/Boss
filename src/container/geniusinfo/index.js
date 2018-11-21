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
class Geniusinfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
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
        <NavBar mode="dark" >牛人完善信息</NavBar>
        <SelectAvater
          select = {this.selectAvater}
        />
        <InputItem
          onChange={v=>this.handleChange('title', v)}
        >求职岗位</InputItem>
        <TextareaItem
            onChange={v=>this.handleChange('desc', v)}
            title="个人简介"
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

export default Geniusinfo