import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
  state=>state
)
class Msg extends React.Component{
  getLastArr(arr){
    return arr[arr.length - 1]
  }
  render(){
    const Item = List.Item
    const Brief = Item.Brief
    const msgGroup = {}
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    });
    const chatList = Object.values(msgGroup).sort((a, b)=>{
      const last_a = this.getLastArr(a).create_time
      const last_b = this.getLastArr(b).create_time
      return last_b -last_a
    })
    return (
      <div>
        {chatList.map(v=>{
          const targetid = v[0].from !== userid ? v[0].from : v[0].to
          const unreadNum = v.filter(e=>!e.read&&e.to===userid).length
          const lastMsg = this.getLastArr(v)
          if (!userinfo[targetid]) {
            return null
          }
          return (
            <List key={v[0]._id}>
              <Item
                extra={<Badge text={unreadNum} />}
                thumb = {require(`@/img/${userinfo[targetid].avatar}.png`)}
                onClick = {()=>{
                  this.props.history.push(`/chat/${targetid}`)
                }}
              >
                {userinfo[targetid].name}
                <Brief>{lastMsg.content}</Brief>
              </Item>
            </List>  
          )
        })}
      </div>
    )
  }
}

export default Msg