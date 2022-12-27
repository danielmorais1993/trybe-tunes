import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import TrybeTunes from '../images/logo.png'
import { AiOutlineSearch, AiOutlineStar  } from "react-icons/ai"
import {BiUserCircle } from "react-icons/bi"


const INITIAL_STATE = {
  isLoading: true,
  name: '',

};

export default class Header extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.getUserForHeader();
  }

  getUserForHeader = async () => {
    const user = await getUser();
    this.setState({ isLoading: false, name: user.name });
  };

  render() {
    const { isLoading, name } = this.state;
    if(isLoading){
      return (<Loading />)
    }

    return (
      <header data-testid="header-component" className='flex flex-col items-center justify-between bg-white w-96 h-720 h-screen header-fixed	'>
        <img className='flex align-self w-64 mt-24' src={TrybeTunes} alt="TrybeTunes logo" />
        <div className="flex flex-col justify-start items-start    ">
          <button
            className=""
            type="button"
          >
            <Link to="/search" data-testid="link-to-search" className='flex header-text p-6 '><AiOutlineSearch 
            className=' mb-1 mr-2'/>Search</Link>
          </button>
          {' '}
          <button
            className=""
            type="button"
          >
            <Link to="/favorites" data-testid="link-to-favorites" className='flex header-text p-6 '><AiOutlineStar
            className=' mb-1 mr-2'/>  Favorites</Link>
          </button>
          {' '}
          <button
            className=""
            type="button"
          >
            <Link to="/profile" data-testid="link-to-profile" className='flex header-text p-6 '><BiUserCircle
            className=' mb-1 mr-2'/>  Profile</Link>
          </button>
         
        </div>
        <div>
        <h1 className='mb-24' data-testid="header-user-name">{name}</h1>
        </div>


      </header>

    );
  }
}
