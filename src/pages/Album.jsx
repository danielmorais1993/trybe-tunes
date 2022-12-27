import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

const INITIAL_STATE = {
  musicData: [],
  onlyDataMusic: {},
};

export default class Album extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.getMusicsById(id);
  }

  getMusicsById = async (id) => {
    const data = await getMusics(id);
    const musics = data.filter((music) => music.previewUrl);
    this.setState({ musicData: musics, onlyDataMusic: data[0] });
  };

  render() {
    const { musicData, onlyDataMusic } = this.state;

    return (
      <div data-testid="page-album" className=''>
        <Header />
        <section className='flex justify-center self-center items-center disks   ml-96 h-screen'>
          {

            musicData.length > 0 ? (
              <div className=''>
                <div className='neon-text '>
                <h1 className='mt-3 text-xl'>Tracks</h1>
                <h1 className='text-center mt-4  ' data-testid="artist-name">
                  {onlyDataMusic.artistName}

                </h1>
                <h2 className='text-center mt-5  ' data-testid="album-name">
                  {onlyDataMusic.collectionName}
                </h2>
                </div>
                <div className='flex justify-center self-center items-center w-full flex-wrap   h-screen'>
                {
                  musicData.map((music) => (<MusicCard
                    key={ music.trackId }
                    music={ music }
                  />
                  ))
                }
                </div>
              </div>
            )
              : ''
          }
        </section>

      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
