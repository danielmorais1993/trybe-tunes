import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { TbPlayerPlay } from "react-icons/tb";





const INITIAL_STATE = {
  isSaveSubmitDisabled: true,
  inputName: '',
  isLoading: false,
  artistName: '',
  artistList: [],
};

export default class Search extends Component {
  state = INITIAL_STATE;

  validateButton = () => {
    const { inputName } = this.state;
    const numberMin = 2;
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

  handleClick = async () => {
    const { inputName } = this.state;
    this.setState({ isLoading: true, artistName: inputName }, async () => {
      const data = await searchAlbumsAPI(inputName);
      this.setState({
        inputName: '',
        isLoading: false,
        artistList: data,

      });
    });
  };

  render() {
    const { isSaveSubmitDisabled,
      inputName,
      isLoading,
      artistName,
      artistList } = this.state;
    const resultElement = `Resultado de álbuns de: ${artistName}`;
    if(isLoading){
      return (<Loading />)

    }
    return (
      <div data-testid="page-search" className='flex flex-col-reverse  '>
           <section className='flex justify-center self-center items-center flex-wrap  disks ml-96 h-screen  '>
            

        {
          artistList.length !== 0 || artistName.length === 0
            ? artistList.map((albumCard) => (
              <div className='p-3 mt-12 ' key={ albumCard.collectionId }>
                <img className='disk-unit   ' src={ albumCard.artworkUrl100 } alt={ albumCard.collectionName } />
                { <h2 className='collecton-title mt-2 w-48'>{albumCard.collectionName}</h2> }
                { <h3 className='artist-title mt-2'>{albumCard.artistName}</h3> }
                <Link
                className='flex justify-center  items-center'
                  data-testid={ `link-to-album-${albumCard.collectionId}` }
                  to={ `/album/${albumCard.collectionId}` }
                >
                  <TbPlayerPlay/>
                </Link>

              </div>
            ))
            : <h2>Nenhum álbum foi encontrado</h2>
        }
        </section> 
        {
          artistName
          && (
            <h2 className='flex self-center text-title ml-24'>
              {resultElement}
            </h2>
          )
        } 
        <Header  />
        <br />

              <section className='flex self-center w-96 mt-16 search-header'>
              <FontAwesomeIcon icon={faSearch} className='search-icon-position' />
                <input
                className='rounded-full py-2 px-4 bg-white-200  w-full    text-login .min-w-1/4 input-search'
                  type="text"
                  placeholder="Artist name"
                  onChange={ this.onInputChange }
                  value={ inputName }
                  name="inputName"
                  data-testid="search-artist-input"
                  
                />
              
                <button
                className='rounded-full py-2 px-4 search-button   text-login .min-w-1/4 disabled:opacity-50'
                  type="button"
                  disabled={ isSaveSubmitDisabled }
                  data-testid="search-artist-button"
                  onClick={ this.handleClick }
                >
                  Search
                </button>
              </section>
       
      </div>
    );
  }
}
