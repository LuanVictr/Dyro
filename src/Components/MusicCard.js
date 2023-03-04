import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../Css/music-card.css';
import { FaPlay, FaPause } from 'react-icons/fa';

function MusicCard({ trackName, previewUrl }) {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const music = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  const onLoadedMetadata = () => {
    const seconds = Math.floor(music.current.duration);
    setDuration(`0:${seconds}`);
    setCurrent(`0:${current}`);
    progressBar.current.max = seconds;
  };

  const whilePlaying = () => {
    progressBar.current.value = music.current.currentTime;
    progressBar.current.style.setProperty(
      '--seek-before-width', `${(progressBar.current.value / duration) * 100}%`,
    );
    setCurrent(`0:${progressBar.current.value}`);
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const playAndPauseSong = () => {
    const prevValue = playing;
    setPlaying(!prevValue);
    if (!prevValue) {
      music.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      music.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const changeRange = () => {
    music.current.currentTime = progressBar.current.value;
    progressBar.current.style.setProperty(
      '--seek-before-width', `${(progressBar.current.value / duration) * 100}%`,
    );
    setCurrent(`0:${progressBar.current.value}`);
  };

  return (
    <div className="music-card">
      <p>{trackName}</p>
      <div className="audio-player">
        <audio
          onLoadedMetadata={ onLoadedMetadata }
          ref={ music }
          className="audio"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <div className="custom-audio">
          <button
            className="play-button"
            onClick={ playAndPauseSong }
            type="button"
          >
            {playing ? <FaPause /> : <FaPlay />}

          </button>
          <div>{current}</div>
          <input
            onChange={ changeRange }
            ref={ progressBar }
            className="progressBar"
            type="range"
          />
          <div>{ duration }</div>
        </div>
      </div>
    </div>
  );
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};
