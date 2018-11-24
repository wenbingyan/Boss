import io from 'socket.io-client'
import axios from "axios";

const socket = io('ws://localhost:9093')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  unread: 0
}

export function chat(state=initState, action){
  switch (action.type) {
    case MSG_LIST:
      return {...state, chatmsg: action.payload}
    case MSG_RECV:
      return {...state, chatmsg: [...this.state.chatmsg,...action.payload]}
    case MSG_LIST:
      return 
    default:
      return state
  }
}

function msgList(msg){
  return { type: MSG_LIST, payload: msg}
}

function recvMsg(data){
  return { type: MSG_RECV, payload: data}
}

export function recvMsg(){
  return dispatch=>{
    socket.on('recvmsg', (data)=>{
      console.log('recvMsg',data)
      dispatch(recvMsg(data))
    })
  }
}

export function sendMsg(data){
  const { from, to, content} = data
  return dispatch=>{
    console.log('sendmsg', { from, to, content})
    socket.emit('sendMsg', { from, to, content})
  }
}

export function getMsgList(){
  return dispatch =>{
    axios.get('/user/getmsglist')
      .then((res)=>{
        console.log(res)
        if(res.status===200&&res.data.code===0){
          dispatch(msgList(res.data.data))
        }
      })
  }
}