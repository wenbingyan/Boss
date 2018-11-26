import React from 'react'
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
@connect(
  state=>state.chat
)
class Navlinkbar extends React.Component{
  static propTypes = {
		data: PropTypes.array.isRequired
	}
  render(){
    const navList = this.props.data.filter(v=>!v.hide)
    const {pathname} = this.props.location
    return (
      <div>
        <TabBar>
          {navList.map(v=>(
            <TabBar.Item 
              badge = {v.path==='/msg'?this.props.unread:0}
              title={v.title}
              key={v.path}
              icon={{uri: require(`@/img/navimg/${v.icon}.png`)}}
              selectedIcon={{uri: require(`@/img/navimg/${v.icon}-active.png`)}}
              selected = {pathname===v.path}
              onPress={() => {
                this.props.history.push(v.path)
              }}
            />
          ))}
        </TabBar>
      </div>
    )
  }
}

export default Navlinkbar