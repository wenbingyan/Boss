import React from 'react'
import { connect } from 'react-redux'
import {getUserList} from '@/redux/chatuser'
import UserCard from '@/component/userCard'

@connect(
  state=>state.chatuser,
  { getUserList }
)
class Boss extends React.Component{
  componentDidMount(){
    this.props.getUserList('genius')
  }
  render(){
    return (
      <div>
        <UserCard userList = {this.props.userList} />
      </div>
    )
  }
}

export default Boss