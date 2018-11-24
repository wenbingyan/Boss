import React from 'react'
import { List, InputItem} from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '@/redux/chat'

@connect(
  state=>state,
  {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: '',
      textArr: []
    }
  }
  componentDidMount(){
    this.props.getMsgList()
    this.props.recvMsg()
  }
  sendMsgSubmit = ()=>{
    const from = this.props.user._id
    const to = this.props.match.params.user
    const content = this.state.text
    this.props.sendMsg({from, to, content})
    this.setState({text: ''})
    
  }
  render(){
    // console.log(this.props)
    return (
      <div>
        <div>
          {this.state.textArr.map(v=>(
            <p key={v}>{v}</p>
          ))}
        </div>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder = '请输入'
              value = {this.state.text}
              onChange = {v=>{
                this.setState({text: v})
              }}
              extra ={<span onClick={this.sendMsgSubmit}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>   
    )
  }
}

export default Chat