import React from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.checkFavorite = this.checkFavorite.bind(this);
    this.addFavoriteSong = this.addFavoriteSong.bind(this);
    this.getFavorite = this.getFavorite.bind(this);

    this.state = {
      isLoading: false,
      isFavorite: false,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  async getFavorite() {
    const favorita = await getFavoriteSongs();
    const { trackId } = this.props;
    favorita.some((music) => (music.trackId === trackId
      ? this.setState({
        isFavorite: true,
      }) : false));
  }

  checkFavorite({ target }) {
    const { checked } = target;
    this.setState({
      isFavorite: checked,
    }, this.addFavoriteSong);
  }

  async addFavoriteSong() {
    const { trackName, previewUrl, trackId } = this.props;
    const obj = {
      trackName,
      previewUrl,
      trackId,
    };
    this.setState({
      isLoading: true,
    });
    await addSong(obj);
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isFavorite, isLoading } = this.state;
    return (
      <div>
        {isLoading
          ? <Loading />
          : (
            <div>
              <p>{ trackName }</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <form>
                <label htmlFor="favorites">
                  Favorita
                  <input
                    checked={ isFavorite }
                    onChange={ this.checkFavorite }
                    data-testid={ `checkbox-music-${trackId}` }
                    type="checkbox"
                    name="favorites"
                    id="favorites"
                  />
                </label>
              </form>
            </div>)}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
