import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import TrybeTunes from '../images/logo.png'

const INITIAL_STATE = {
  isSaveSubmitDisabled: true,
  inputName: '',
  isLoading: false,
  redirect: false,
};
export default class Login extends Component {
  state = INITIAL_STATE;

  handleSubmit = async (event) => {
    event.preventDefault();
    const { inputName } = this.state;
    const obj = {
      name: inputName,
    };
    this.setState({ isLoading: true });
    await createUser(obj);
    this.setState({ redirect: true });
  };

  validateButton = () => {
    const { inputName } = this.state;
    const numberMin = 3;
    if (inputName.length >= numberMin) {
      return this.setState({ isSaveSubmitDisabled: false });
    }
    return this.setState({ isSaveSubmitDisabled: true });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => {
      this.validateButton();
    });
  };

  render() {
    const { isSaveSubmitDisabled, inputName, isLoading, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/search" />;
    }
    
      if(isLoading){
      return (<Loading />)
    } 
    
    return (
      <div className=' flex justify-center mt-48 .min-w-1/4' data-testid="page-login">
        <div className='login-page  flex justify-center flex-col align-center self-center .min-w-1/2'>
          <img className='w-48   h-24    flex self-center mb-24 .min-w-1/4' src={TrybeTunes} alt="TrybeTunes logo"/>
        <form className='flex flex-col w-3/4  self-center .max-w-xl' action="">
         
            
            <input
            className='rounded-full py-2 px-4 bg-white-200 w-full  text-login .min-w-1/4'

            placeholder='Please write your name'
              type="text"
              data-testid="login-name-input"
              onChange={ this.onInputChange }
              name="inputName"
              value={ inputName }
            />
         
          <br />
          <button
          className='rounded-full py-2 px-4 w-full button-login  text-login .min-w-1/4 disabled:opacity-50  '
            type="submit" 
            data-testid="login-submit-button"
            disabled={ isSaveSubmitDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar

          </button>
          

        </form>
        </div>
      </div>
    );
  }
}
