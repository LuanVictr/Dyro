import React from 'react';
import '../Css/album-card.css';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function AlbumCard({ artistName, collectionName, collectionId, artwork }) {
  const history = useHistory();

  return (
    <div
      aria-hidden
      onClick={ () => history.push(`/album/${collectionId}`) }
      className="card"
    >
      <img
        src={ artwork }
        alt="Collection Thumb"
      />
      <div className="card-infos">
        <h4>
          {collectionName}
        </h4>
        <p>{artistName}</p>
      </div>
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
