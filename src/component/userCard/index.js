import React from 'react'
import { Card, List } from 'antd-mobile'
import propTypes  from 'prop-types'
import './index.css'

class UserCard extends React.Component{
  static propTypes = {
    userList: propTypes.array.isRequired
  }
  render(){
    const Header = Card.Header
    const Body = Card.Body
    const Item = List.Item
    const Brief = Item.Brief
    return (
      <div>
        {this.props.userList.map(v=>(
            v.avatar?(
            <div key={v._id}>
              <Card>
                <Header 
                  title = {v.user}
                  thumb = { require(`@/img/${v.avatar}.png`)}
                  extra = {<span>{v.title}</span>}
                />
                <Body>
                  <List>
                    <Item>
                      <Brief>
                        {v.type==='boss'?<div>公司：{v.company}</div>:null}
                        {v.type==='boss'?<div>薪资：{v.money}</div>:null}
                        {v.desc.split('\n').map(d=><div style={{marginTop:5}} key={d}>{d}</div>)}
                      </Brief>
                    </Item>
                  </List>
                  
                </Body>
              </Card>
            </div>
            ):null
        ))}
      </div>
    )
  }
}

export default UserCard