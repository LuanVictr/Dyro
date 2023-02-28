import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import PageAlbum from '../Components/PageAlbum';
import MusicCard from '../Components/MusicCard';
import '../Css/album.css';
import Loading from '../Components/Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.FetchMusics = this.FetchMusics.bind(this);
    this.showMusics = this.showMusics.bind(this);
    this.mountPage = this.mountPage.bind(this);

    this.state = {
      fetchDone: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.FetchMusics();
  }

  async FetchMusics() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      musics,
      fetchDone: true,
    });
  }

  mountPage() {
    const { musics } = this.state;
    const info = musics;
    return (
      <PageAlbum
        imageUrl={ info[0].artworkUrl100 }
        artistName={ info[0].artistName }
        collectionName={ info[0].collectionName }
      />
    );
  }

  showMusics() {
    const { musics } = this.state;
    const info = musics.slice([1]);
    return (
      info.map((music) => (<MusicCard
        trackName={ music.trackName }
        previewUrl={ music.previewUrl }
        trackId={ music.trackId }
        key={ music.trackId }
      />))
    );
  }

  render() {
    const { fetchDone, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        {isLoading ? <Loading />
          : (
            <div>
              <Header />
              <div className="album-info">
                {fetchDone ? this.mountPage() : false}
                {fetchDone ? this.showMusics() : false}
              </div>
            </div>) }

      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};
