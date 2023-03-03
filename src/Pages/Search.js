import React, { useState } from 'react';
import AlbumCard from '../Components/AlbumCard';
import Header from '../Components/Header';
import '../Css/search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

function Search() {
  const [search, setSearch] = useState('');
  const [album, setAlbum] = useState();
  const [fetched, setFetched] = useState(false);

  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  const searchAlbum = async () => {
    const request = await searchAlbumsAPI(search);
    setAlbum(request);
    setFetched(true);
  };

  const renderAlbuns = () => {
    if (fetched === true) {
      return (
        album.map(({
          artistName,
          collectionName,
          collectionId,
          artworkUrl100,
        }) => (<AlbumCard
          key={ collectionId }
          artistName={ artistName }
          collectionName={ collectionName }
          collectionId={ collectionId }
          artwork={ artworkUrl100 }
        />))
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="search">
        <input
          type="text"
          name="searchValue"
          value={ search }
          onChange={ handleSearchChange }
          placeholder="O que você quer ouvir?"
        />
        <button
          type="button"
          className="searchButton"
          onClick={ searchAlbum }
        >
          Buscar
        </button>
        <div className="albums">
          {renderAlbuns()}
        </div>
      </div>
    </div>
  );
}

export default Search;
