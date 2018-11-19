import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  isAuth: false,
  user: '',
  pwd: '',
  type: '',
  msg: ''
}
export function user(state=initState, action){
  switch(action.type){
    case REGISTER_SUCCESS:
      return {...state, isAuth: true, msg: '', ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    default:
      return state
  }
}

function registerSuccess(data){
  return {type: REGISTER_SUCCESS, payload: data}
}

function errorMsg(msg){
  return {msg, type: ERROR_MSG}
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
					dispatch(registerSuccess({user, pwd, type}))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})		
	}
}