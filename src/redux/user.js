import axios from 'axios'
import { getRedirectPath } from '@/util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '',
  user: '',
  type: '',
  msg: ''
}
export function user(state=initState, action){
  switch(action.type){
    case AUTH_SUCCESS:
      return {...state,redirectTo: getRedirectPath(action.payload), msg: '', ...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, msg: action.msg}
    default:
      return state
  }
}

export function loadData(data){
  return { type: LOAD_DATA, payload: data}
}

function authSuccess(data){
  return { type: AUTH_SUCCESS, payload: data }
}

function errorMsg(msg){
  return {msg, type: ERROR_MSG}
}

export function update(data){
  return dispatch => {
    axios.post('/user/update', data)
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
  }
}

export function login({user, pwd}){
  if (!user || !pwd ) {
    return errorMsg('账号密码不能为空')
  }
  return dispatch=>{
		axios.post('/user/login',{user, pwd})
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})		
	}
}

export function register({user, pwd, cpwd, type}){
  if (!user || !pwd || !cpwd) {
    return errorMsg('账号密码不能为空')
  }
  if (pwd !== cpwd) {
    return errorMsg('密码和确认密码不同')
  }
  return dispatch=>{
		axios.post('/user/register',{user, pwd, type})
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess({user, pwd, type}))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})		
	}
}