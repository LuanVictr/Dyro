import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/album-card.css';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const {
      artistName,
      collectionName,
      artwork,
      collectionId,
    } = this.props;
    return (
      <div className="album-card">
        <img className="image" src={ artwork } alt={ artistName } />
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          { collectionName }
        </Link>
        <p>{ artistName }</p>
      </div>
    );
  }
}

export default AlbumCard;

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  artwork: PropTypes.string.isRequired,
};
