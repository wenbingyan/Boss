import React from 'react'
import { connect } from 'react-redux'
import { Result, WhiteSpace, List, Modal } from 'antd-mobile'
import browserCookies  from 'browser-cookies'
import { logout } from '@/redux/user'
import { Redirect } from 'react-router-dom'

@connect(
  state=>state.user,
  { logout }
)
class UserPage extends React.Component{
  logout = () => {
    const alert = Modal.alert
    alert('注销', '确定退出登录吗?', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => {
        console.log('logout')
        browserCookies.erase('userid')
        this.props.logout()
      }},
    ])
  }
  render(){
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    console.log(props)
    return this.props.user?(
      <div>
        <Result
          title = {props.user}
          img = {<img src={require(`@/img/${props.avatar}.png`)} alt='' style={{width: 50}} />}
          message = {props.type==='boss'?props.company:null}
        />
        <List onClick = {()=>console.log(123)} renderHeader={()=>props.type==='genius'?'简介':'招聘岗位'}>
          <Item>
            {props.title}
            {props.desc.split('\n').map((v)=>(
              <Brief key={v}>{v}</Brief> 
            ))}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    ): (this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null) 
  }
}

export default UserPage