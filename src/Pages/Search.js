import React from 'react';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Components/Loading';
import AlbumCard from '../Components/AlbumCard';
import '../Css/search.css'

class Search extends React.Component {
  constructor() {
    super();

    this.HandleChange = this.HandleChange.bind(this);
    this.EnableButton = this.EnableButton.bind(this);
    this.FetchSearch = this.FetchSearch.bind(this);
    this.showAlbuns = this.showAlbuns.bind(this);

    this.state = {
      search: '',
      isDisabled: true,
      isLoading: false,
      searchDone: false,
      albuns: [],
      artist: ''
    }
  }

  async FetchSearch() {
    const { search } = this.state;
    this.setState({
      isLoading: true,
    });
    const teste = await searchAlbumsAPI(search);
    this.setState({
      isLoading: false,
      searchDone: true,
      albuns: teste,
      artist: search,
      search: ''
    });
  }

  HandleChange({target}) {
    const {name, value} = target
    this.setState({
      [name]:value
    }, () => {this.EnableButton()})
  }

  EnableButton() {
    const { search } = this.state;
    if (search.length >= 2) {
      this.setState({
        isDisabled: false,
      })
    } else {
      this.setState({
        isDisabled: true,
      })
    }
  }

  showAlbuns() {
    const { search, albuns, searchDone } = this.state;
    if (albuns.length === 0 && searchDone === true) {
      return(
        <p>Nenhum álbum foi encontrado</p>
      )
    }
    return(
    <div>
      { albuns.map((album) => <AlbumCard 
        search={ search }
        artistName={ album.artistName }
        collectionName={ album.collectionName }
        artwork={ album.artworkUrl100}
        collectionId= { album.collectionId } />
        )}
    </div> )
  }

  render() {
    const {isDisabled, search, isLoading, searchDone, artist} = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
        { isLoading ? <Loading />
        : <fieldset>
        <form>
          <input
            name="search"
            value={ search }
            data-testid="search-artist-input"
            type="text"
            placeholder="pesquise aqui"
            onChange={this.HandleChange}
          />
          <button
            disabled={ isDisabled }
            onClick={ this.FetchSearch }
            data-testid="search-artist-button"
            type="button"
            >Pesquisar
          </button>
        </form>
      </fieldset> }
      { searchDone ?
        <div>
        <h3>Resultado de álbuns de: { artist }</h3>
          </div> 
          : false
          }
        </div>
        <div className="albuns-section">
          {this.showAlbuns()}
        </div>
      </div>
    );
  }
}

export default Search;
