import React from 'react'
import { connect } from 'react-redux'
import {getUserList} from '@/redux/chatuser'
import UserCard from '@/component/userCard'

@connect(
  state=>state.chatuser,
  { getUserList }
)
class Genius extends React.Component{
  componentDidMount(){
    this.props.getUserList('boss')
  }
  render(){
    return (
      <div>
        <UserCard userList = {this.props.userList} />
      </div>
    )
  }
}

export default Genius