import React from 'react';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import PageAlbum from '../Components/PageAlbum';
import MusicCard from '../Components/MusicCard';
import '../Css/album.css';

class Album extends React.Component {
  constructor() {
    super();

    this.FetchMusics = this.FetchMusics.bind(this);
    this.showMusics = this.showMusics.bind(this);
    this.mountPage = this.mountPage.bind(this);

    this.state = {
      musics: [],
      fetchDone: false,
      favoriteMusics: [],
    }
  }

  async FetchMusics() {
    const { id } = this.props.match.params;
    const musics = await getMusics(id)
    this.setState({
      musics: musics,
      fetchDone: true
    });
  }

  mountPage() {
    const { musics } = this.state
    const info = musics
    return (
      <PageAlbum 
      imageUrl={ info[0].artworkUrl100 }
      artistName= { info[0].artistName }
      collectionName= { info[0].collectionName }
      />
    ); 
  }

  showMusics() {
    const { musics } = this.state;
    const info = musics;
    info.shift()
    return (
      info.map((music) => <MusicCard trackName={ music.trackName } previewUrl={ music.previewUrl } trackId={ music.trackId } />)
    )
  }

  componentDidMount() {
    this.FetchMusics()
  }
  
  render() {
    const { fetchDone } = this.state
    return (
      <div data-testid="page-album">
        <Header />
          <div className="album-info">
            {fetchDone ? this.mountPage() : false}
            {fetchDone ? this.showMusics() : false}
          </div>
      </div>
      );
    }
  }

export default Album;
