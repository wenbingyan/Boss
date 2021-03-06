import React from 'react'
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import NavLinkBar from '@/component/navLinkBar'
import Boss from '@/container/boss'
import Genius from '@/container/genius'
import UserPage from '@/container/userPage'
import Msg from '@/container/msg'
import { getMsgList, recvMsg } from '@/redux/chat'
import Axios from 'axios';

@connect(
  state=>state,
  {getMsgList, recvMsg}
)
class Dashboard extends React.Component{
  componentDidMount(){
    if(!this.props.chat.chatmsg.length) {
      console.log(11111)
      this.props.getMsgList()
      this.props.recvMsg()
    } 
  }
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
        component: UserPage,
      }
    ]
    return (
      <div>
        <NavBar className='fixd-header' mode='dard'>{navList.find(v=>v.path===pathname).title}</NavBar>
        <div style={{marginTop:45,paddingBottom: 60}}>
        <button onClick={()=>{
          Axios.get('/user/delete')
          .then(res=>{
            console.log(res)
          })
        }}>121232133</button>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component} ></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList} ></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard