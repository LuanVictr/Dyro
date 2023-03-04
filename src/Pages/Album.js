import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import '../Css/album.css';
import MusicCard from '../Components/MusicCard';

function Album() {
  const [musics, setMusics] = useState();
  const [fetched, setFetched] = useState(false);
  const { id } = useParams();

  useEffect(async () => {
    const musicsInfo = await getMusics(id);
    await setMusics(musicsInfo);
    setFetched(true);
  }, [id]);

  return (
    <div>
      <Header />
      {fetched ? (
        <div className="album">
          <div className="album-info">
            <img src={ musics[0].artworkUrl100 } alt="album" />
            <div>
              <h1>{musics[0].collectionName}</h1>
              <h4>{musics[0].artistName}</h4>
            </div>
          </div>
          <div className="musics">
            {musics.slice(1).map((music) => (<MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />))}
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default Album;
