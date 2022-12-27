import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";


const INITIAL_STATE = {
  isLoading: false,
  favorite: false,
};

export default class MusicCard extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.fetchSongs();
  }

  fetchSongs = async () => {
    const { music } = this.props;
    this.setState({ isLoading: true }, async () => {
      const data = await getFavoriteSongs();
      if (data.some((e) => e.trackId === music.trackId)) {
        return this.setState({ isLoading: false, favorite: true });
      }
      return this.setState({ isLoading: false, favorite: false });
    });
  };

  validateButton = async () => {
    const { music, action } = this.props;
    const { favorite } = this.state;
    if (favorite) {
      return this.setState({ isLoading: true }, async () => {
        await addSong(music);
        this.setState({ isLoading: false }, action);
      });
    }
    return this.setState({ isLoading: true }, async () => {
      await removeSong(music);
      this.setState({ isLoading: false }, action);
    });
  };

  onHandleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => {
      this.validateButton();
    });
  };

  render() {
    const { music } = this.props;
    const {  favorite } = this.state;

    
    return (
      <div className='audio-card flex flex-col ml-2 justify-around ' >
        


                <h3 className='text-center w-96'>{ music.trackName }</h3>
                <div className='flex'>
                <audio  className=""data-testid="audio-component" src={ music.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor={`checkbox-music-${music.trackId}`}>
                  {
                   favorite ? <AiFillHeart  className='animationHeart text-red-600 mt-4 ml-2' />:
                   <AiOutlineHeart  className='animationHeart mt-4 ml-2' />
                  }
               
                  <input
                  className='w-0'
                    type="checkbox"
                    id={`checkbox-music-${music.trackId}`}
                    checked={ favorite }
                    data-testid={ `checkbox-music-${music.trackId}` }
                    name="favorite"
                    onChange={ this.onHandleChange }
                  />
                </label>
                </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  action: PropTypes.func.isRequired,
};
