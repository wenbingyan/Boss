import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class SelectAvater extends React.Component{
  static propTypes = {
		select: PropTypes.func.isRequired
	}
  constructor(props){
    super(props)
    this.state = {}
  }
  render(){
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
												.split(',')
												.map(v=>({
													icon:require(`@/img/${v}.png`),
													text:v
                        }))
    const header = this.state.text ? 
                                (<div>
                                  <span>已选择头像</span>
                                  <img width={18} src={this.state.icon} alt={this.state.text} />
                                </div>) : <span>请选择头像</span>
    return (
      <div>
        {/* {header} */}
        <List renderHeader={() => header}>
          <Grid
            onClick = {elm=>{
              this.setState(elm)
              this.props.select(elm.text)
            }} 
            data={avatarList} 
            activeStyle={{color:'#fff'}} 
            columnNum={5} 
          />
        </List>
      </div>
    )
  }
}

export default SelectAvater