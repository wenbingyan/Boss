import io from 'socket.io-client'
import axios from "axios";

const socket = io('ws://localhost:9093')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'
const LOGOUT = 'LOGOUT'

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export function chat(state=initState, action){
  switch (action.type) {
    case MSG_LIST:
      return { ...state,users: action.payload.users, chatmsg: action.payload.msg, unread:action.payload.msg.filter(v=>!v.read&&v.to===action.payload.userid).length}
    case MSG_RECV:
      const num = action.payload.to === action.userid? 1 : 0
      return { ...state, chatmsg: [...state.chatmsg,action.payload], unread:state.unread + num }
    case MSG_READ:
      return {...state, chatmsg: state.chatmsg.map(v=>({...v, read:action.payload.from===v.from?true:v.read})), unread: state.unread - action.payload.num}
    case LOGOUT:
      return {...initState}
    default:
      return state
  }
}

function msgList(msg, users, userid){
  return { type: MSG_LIST, payload: {msg, users, userid}}
}

function recvMSG(data, userid){
  return {userid, type: MSG_RECV, payload: data}
}

function readMsg(from, num){
  return {type: MSG_READ, payload:{from, num}}
}

export function getMsgRead(from){
  return ( dispatch, getState )=>{
    axios.post('/user/readmsg',{from})
      .then((res)=>{
        if(res.status ===200 && res.data.code===0){
          dispatch(readMsg(from, res.data.num))
        }
      })
  }
}

export function recvMsg(){
  return (dispatch, getState)=>{
    socket.removeAllListeners('recvmsg')
    socket.on('recvmsg', (data)=>{
      const userid = getState().user._id
      dispatch(recvMSG(data, userid))
    })
  }
}

export function sendMsg(data){
  const { from, to, content} = data
  return dispatch=>{
    socket.emit('sendMsg', { from, to, content})
  }
}

export function getMsgList(){
  return (dispatch, getState) =>{
    axios.get('/user/getmsglist')
      .then((res)=>{
        if(res.status===200&&res.data.code===0){
          const userid = getState().user._id
					dispatch(msgList(res.data.msgs, res.data.users, userid))
        }
      })
  }
}

export function logoutlist(){
  return { type: LOGOUT }
}