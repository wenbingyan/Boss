import React from 'react'

export function inputHOC(CompName){
  return class InputHandle extends React.Component{
    constructor(props){
      super(props)
      this.state = {}
    }
    handleChange = (name,v) =>{
      this.setState({
        [name]: v
      })
    }
    render(){
      return (
        <CompName handleChange={this.handleChange} state = {this.state} {...this.props} />
      )
    }
  }
}