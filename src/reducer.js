import { combineReducers } from 'redux'
import { user } from './redux/user'
import { chat } from './redux/chat'
import { chatuser } from './redux/chatuser'

export default combineReducers({user, chatuser, chat})