import React from 'react';
import '../Css/page-album.css';
import PropTypes from 'prop-types';

class PageAlbum extends React.Component {
  render() {
    const {
      imageUrl,
      artistName,
      collectionName,
    } = this.props;
    return (
      <div className="page-album-info">
        <img src={ imageUrl } alt={ artistName } />
        <h2 data-testid="album-name">{ collectionName }</h2>
        <p data-testid="artist-name">{ artistName }</p>
      </div>
    );
  }
}

export default PageAlbum;

PageAlbum.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
};
