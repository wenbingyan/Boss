import React from 'react'
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux'
import NavLinkBar from '@/component/navLinkBar'

function Boss(){
  return <div>boss</div>
}
function Genius(){
  return <div>Genius</div>
}
function Msg(){
  return <div>Msg</div>
}
function User(){
  return <div>User</div>
}

@connect(
  state=>state
)
class Dashboard extends React.Component{
  render(){
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'Boss',
        icon: 'job',
        title: 'Boss列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg,
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User,
      }
    ]
    return (
      <div>
        <NavBar className='fixd-header' mode='dard'>{navList.find(v=>v.path===pathname).title}</NavBar>
        <h2>Dashboard</h2>
        <NavLinkBar data={navList} ></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard