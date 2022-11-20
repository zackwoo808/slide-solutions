import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Howl, Howler } from 'howler';

import List from '@mui/material/List';

import Player from '../shared/Player';
import Track from './Track';

export default function PlaylistTracks() {
  const [currentTrack, setCurrentTrack] = useState();
  const [activeSoundsPlaylist, setActiveSoundsPlaylist] = useState([]);
  const [volumeLevel, setVolumeLevel] = useState(10);
  const [trackProgress, setTrackProgress] = useState(0);
  const [duration, setDuration] = useState();
  const [timeElapsed, setTimeElapsed] = useState();

  const dispatch = useDispatch();
  const activePlaylist = useSelector(state => state.activePlaylist);
  const currentTrackIndex = useSelector(state => state.currentTrackIndex);

  useEffect(() => {
    setActiveSoundsPlaylist(activePlaylist.map(() => ({})));
  }, [activePlaylist]);

  useEffect(() => {
    window.addEventListener('updateSlideTrackProgress', e => {
      const { newProgress = 0 } = e.detail || {};
      setTrackProgress(newProgress);
    });
  }, []);

  // #region helper methods
  function getTrack(index) {
    let track;
    index = typeof index === 'number' ? index : currentTrackIndex;
    const data = activeSoundsPlaylist[index];

    if (data.howl) {
      track = data.howl;
    } else {
      track = new Howl({
        src: `${process.env.REACT_APP_AWS_EC2_ENDPOINT}/audio/${activePlaylist[index]?.s3_key}`,
        html5: true,
        onplay() {
          requestAnimationFrame(onStep.bind(this, track));
        },
        onseek() {
          requestAnimationFrame(onStep.bind(this, track));
        },
        onload() {
          setDuration(formatTime(track.duration()));
        }
      });
      
      setActiveSoundsPlaylist(activeSoundsPlaylist.map((item, itemIndex) => itemIndex === index ? { howl: track } : item));
    }

    setCurrentTrack(track);
    return track;
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
  // #endregion helper methods

  // #region player methods
  function onPlay(index) {
    if (index !== currentTrackIndex) {
      if (currentTrack) {
        currentTrack.stop();
      }
      dispatch({ type: 'UPDATE_CURRENT_TRACK_INDEX', index: index || 0 });
    }

    if (!currentTrack || index !== currentTrackIndex) {
      getTrack(index).play();
    } else {
      currentTrack.play();
    }

    dispatch({ type: 'TOGGLE_PLAYER_PLAYING', isPlaying: true });
  }

  function onPause() {
    if (!currentTrack) {
      return;
    }

    currentTrack.pause();
    dispatch({ type: 'TOGGLE_PLAYER_PLAYING', isPlaying: false });
  }

  function onNext() {
    let newIndex = 0;
    if (currentTrack) {
      newIndex = currentTrackIndex === activePlaylist.length - 1 ? 0 : currentTrackIndex + 1;
    } 

    onPlay(newIndex);
    dispatch({ type: 'UPDATE_CURRENT_TRACK_INDEX', index: newIndex });
  }

  function onPrev() {
    let newIndex = activePlaylist.length - 1;
    if (currentTrack) {
      newIndex = currentTrackIndex === 0 ? activePlaylist.length - 1 : currentTrackIndex - 1;
    }

    onPlay(newIndex);
    dispatch({ type: 'UPDATE_CURRENT_TRACK_INDEX', index: newIndex });
  }

  function onVolumeChange(value) {
    setVolumeLevel(value);
    Howler.volume(value/100);
  }

  function onSeek(newPosition) {
    if (!currentTrack) {
      return;
    }
    
    currentTrack.seek(currentTrack.duration() * newPosition / 100);
    setTrackProgress((newPosition / currentTrack.duration()) * 100);
  }

  function onStep(track, setTrackProgress) {
    if (!track) {
      console.log('no track');
      return;
    }

    const newTrackPosition = track.seek() || 0;
    setTimeElapsed(formatTime(newTrackPosition));

    const n = ((newTrackPosition / track.duration()) * 100 || 0).toFixed(1);
    console.log(n);
    const updateTrackProgress = new CustomEvent('updateSlideTrackProgress', {
      detail: {
        newProgress: n
      }
    });
    window.dispatchEvent(updateTrackProgress);

    if (track.playing()) {
      requestAnimationFrame(onStep.bind(this, track, setTrackProgress));
    }
  }
  // #endregion player methods
  
  return (
    <>
      {
        activePlaylist?.length ?
          <List sx={{ flexBasis: '85%', overflow: 'scroll', paddingLeft: '10px' }}>
            {activePlaylist?.map((track, index) => (
              <Track
                  key={track.track_id}
                  index={index}
                  track={track}
                  currentTrack={currentTrack}
                  onPlay={onPlay}
                  onPause={onPause}
              />
            ))}
          </List>
        :
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexBasis: '85%' }}>Select a Playlist to View Contents!</div>
      }
      <Player
        duration={duration}
        onPlay={onPlay}
        onPause={onPause}
        onPrev={onPrev}
        onNext={onNext}
        onSeek={onSeek}
        onVolumeChange={onVolumeChange}
        timeElapsed={timeElapsed}
        trackProgress={trackProgress}
        volumeLevel={volumeLevel}
      />
    </>
  );
};
