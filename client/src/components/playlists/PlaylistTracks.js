import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Howl } from 'howler';

import List from '@mui/material/List';

import Player from '../shared/Player';
import Track from './Track';

export default function PlaylistTracks() {
  const [currentTrack, setCurrentTrack] = useState();
  const [activeSoundsPlaylist, setActiveSoundsPlaylist] = useState([]);

  const dispatch = useDispatch();
  const activePlaylist = useSelector(state => state.activePlaylist);
  const currentTrackIndex = useSelector(state => state.currentTrackIndex);

  useEffect(() => {
    setActiveSoundsPlaylist(activePlaylist.map(() => ({})));
  }, [activePlaylist]);

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
      });
      
      setActiveSoundsPlaylist(activeSoundsPlaylist.map((item, itemIndex) => itemIndex === index ? { howl: track } : item));
    }

    setCurrentTrack(track);
    return track;
  }

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
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
        onPlay={onPlay}
        onPause={onPause}
      />
    </>
  );
};
