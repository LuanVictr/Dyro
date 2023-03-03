import React from 'react';
import '../Css/album-card.css';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function AlbumCard({ artistName, collectionName, collectionId, artwork }) {
  const history = useHistory();

  return (
    <div>
      <img
        aria-hidden
        onClick={ () => history.push(`/album/${collectionId}`) }
        src={ artwork }
        alt="Collection Thumb"
      />
      <h4
        aria-hidden
        onClick={ () => history.push(`/album/${collectionId}`) }
      >
        {collectionName}

      </h4>
      <p>{artistName}</p>
    </div>
  );
}

export default AlbumCard;

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  artwork: PropTypes.string.isRequired,
};
