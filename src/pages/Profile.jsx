import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Title from '../components/Title';

const INITIAL_STATE = {
  isLoading: true,
  user: [],
};
export default class Profile extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ isLoading: true }, async () => {
      const userData = await getUser();
      this.setState({ isLoading: false, user: userData });
    });
  };

  render() {
    const { isLoading, user } = this.state;
    const { name, image, description, email } = user;
    if(isLoading){
      return(<Loading/>)
    }
    return (
      <div data-testid="page-profile">
        <Header />
        <Title titleReader={'Profile'}/>
        <div className='flex  justify-around  favorite-design  ml-96 h-screen '>     
        <img className='mt-3 rounded-full  w-64 h-64 relative bottom-32' data-testid="profile-image" src={ image } alt={ name } /> 
              <div className='flex flex-col mt-45 mr-96  '>
                <label className="text-xl font-bold p-5" htmlFor="">
                  Nome 
                  </label>
                <h2 className='mt-3 p-3'>{name}</h2>
              
               
                
                <label className='text-xl font-bold p-5 ' htmlFor="">
                  Description
                  </label>
                <p className='mt-3 font-profile p-3'>{description}</p>
              
                <label className='text-xl font-bold p-5' htmlFor="">
                  Email
                  </label>
                <p className='mt-3 p-3'>{email}</p>
                <Link className='rounded-full p-2 p-4 w-full  button-profile button-login	 .min-w-1/4 ' to="/profile/edit">
          Editar perfil
        </Link>
              
              </div>
              
            

        
        {' '}
    
        </div>

      </div>
    );
  }
}
