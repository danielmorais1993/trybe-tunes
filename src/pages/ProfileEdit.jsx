import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import Title from '../components/Title';

const INITIAL_STATE = {
  isLoading: true,
  user: [],
  inputName: ' ',
  inputEmail: ' ',
  inputDescription: ' ',
  inputImage: ' ',
  isSaveButtonDisable: true,
  redirect: false,
};
const regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
export default class ProfileEdit extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ isLoading: true }, async () => {
      const userData = await getUser();
      console.log(userData);
      if (userData) {
        this.setState({ isLoading: false,
          inputName: userData.name,
          inputEmail: userData.email,
          inputDescription: userData.description,
          inputImage: userData.image,
        });
      }
    });
  };

  validateButton = () => {
    const {
      inputName,
      inputEmail,
      inputDescription,
      inputImage,

    } = this.state;
    if (inputName
      && inputEmail.match(regExp)
      && inputDescription
      && inputImage
    ) {
      return this.setState({ isSaveButtonDisable: false });
    }

    return this.setState({ isSaveButtonDisable: true });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => this.validateButton());
  };

  onHandleClick = async () => {
    const {
      inputName,
      inputEmail,
      inputDescription,
      inputImage,

    } = this.state;
    const obj = {
      name: inputName,
      email: inputEmail,
      image: inputImage,
      description: inputDescription,
    };
    this.setState({ isLoading: true }, async () => {
      await updateUser(obj);
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { isLoading,
      inputName,
      inputEmail,
      inputDescription,
      inputImage,
      isSaveButtonDisable,
    } = this.state;
    const { history } = this.props;
    if(isLoading){
      return(<Loading/>)
    }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <Title titleReader={''}/>
        
        
              <div className='flex flex-col mb-24  items-center favorite-design   ml-96 h-screen'>
                <label htmlFor="name-input" className='flex flex-col  p-5 mb-2'>
                  Nome: 
                <p className='text-xs	text-black-300 m-2'>
                  Fique à vontade para usar um nome social  
                  </p>

                  <input
                  className='bg-slate-50 border-solid border-b-2 border-black mb-2 '
                    id="name-input"
                    name="inputName"
                    type="text"
                    data-testid="edit-input-name"
                    value={ inputName }
                    onChange={ this.onInputChange }
                  />
                </label>
                <br />

                <label htmlFor="email-input" className='text-xs	text-black-300 m-2'>
                  email :
                  <p className='text-xs	text-black-300 m-2'>
                  Escolha um e-mailque consulte diariamente  
                  </p>
                 
                  <input
                  className='bg-slate-50 border-solid border-b-2 border-black mb-2'
                    id="email-input"
                    name="inputEmail"
                    type="email"
                    data-testid="edit-input-email"
                    value={ inputEmail }
                    onChange={ this.onInputChange }
                  />
                </label>
                <br />
                <label htmlFor="description-input" className='p-5 flex flex-col  p-5 mb-2'>
                  Description :
              
                 
              
                  <textarea
                  className='bg-slate-50 border-solid border-b-2 border-black mb-2'
                    id="description-input"
                    name="inputDescription"
                    type="text"
                    data-testid="edit-input-description"
                    value={ inputDescription }
                    onChange={ this.onInputChange }
                    cols="30"
                    rows="10"
                  />
                </label>
                <br />
                <label htmlFor="image-input">
                  Foto :
                  <input
                    id="image-input"
                    type="text"
                    data-testid="edit-input-image"
                    onChange={ this.onInputChange }
                    name="inputImage"
                    value={ inputImage }
                  />
                </label>
                <img
                  id="image"
                  src={ inputImage }
                  alt={ inputName }
                />
                <br />
                <button
                className='rounded-full p-2 p-4 w-24  button-profile button-login	 .min-w-1/4 '
                  data-testid="edit-button-save"
                  type="button"
                  disabled={ isSaveButtonDisable }
                  onClick={ async () => {
                    await this.onHandleClick();
                    history.push('/profile');
                  } }
                >
                  Salvar
                </button>
              </div>
            
        

      </div>
    );
  }
}
ProfileEdit.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};
