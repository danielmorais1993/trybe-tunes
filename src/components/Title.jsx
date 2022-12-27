import React, { Component } from 'react'

 class Title extends Component {
  render() {
    const {titleReader} = this.props;
    return (
      <div className='h-64 text-favorites'>
        <h1 className='ml-64 w-full h-full  flex justify-center items-center content-center'>{titleReader}</h1>
      </div>
    )
  }
}
export default  Title
