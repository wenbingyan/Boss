import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMsg, getMsgList, recvMsg } from '@/redux/chat'
import { getChatID } from '@/util'
import './index.css'

@connect(
  state=>state,
  { sendMsg, getMsgList, recvMsg }
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: '',
      showEmoji: false
    }
  }
  componentDidMount(){
    
    if(!this.props.chat.chatmsg.length) {
      console.log(2)
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  fixCarousel(){
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
	}
  sendMsgSubmit = ()=>{
    const from = this.props.user._id
    const to = this.props.match.params.user
    const content = this.state.text
    console.log({from, to})
    this.props.sendMsg({from, to, content})
    this.setState({text: ''})
  }
  render(){
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))
    const usersMap = this.props.chat.users
    const user = this.props.match.params.user
    const Item = List.Item
    const chatId = getChatID(user,this.props.user._id)
    const chatMsg = this.props.chat.chatmsg.filter(v=>v.chatid===chatId)
    if(!usersMap[user]){
			return null
		}
    return (
      <div id='chat-page'>
        <NavBar
          mode='dark'
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >{usersMap[user].name}</NavBar>
        <div>
          {chatMsg.map(v=>{
            const avater = require(`@/img/${usersMap[v.from].avatar}.png`)
            return v.from === user ? (
              <List key={v._id}>
                <Item
                  thumb = {avater}
                >
                  {v.content}
                </Item>
              </List>  
            ) : (
              <List key={v._id}>
                <Item
                  className='chat-me'
                  extra = {<img src={avater} alt=''/>}
                >{v.content}</Item>
              </List>  
            )
          })}
        </div>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder = '请输入'
              value = {this.state.text}
              onChange = {v=>{
                this.setState({text: v})
              }}
              extra ={
                <div>
                  <span style={{marginRight:10}} onClick={()=>{
                    this.setState({showEmoji: !this.state.showEmoji})
                    this.fixCarousel()
                  }}>😀</span>  
                  <span onClick={this.sendMsgSubmit}>发送</span>
                </div>
              }
            ></InputItem>
          </List>
          {this.state.showEmoji?<Grid 
            data = {emoji}
            columnNum={9}
						carouselMaxRow={4}
            isCarousel={true}
            onClick={(el)=>{
              this.setState({
                text: this.state.text + el.text
              })
            }}
          />:null}
        </div>
      </div>   
    )
  }
}

export default Chat