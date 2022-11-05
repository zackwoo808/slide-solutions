import { useState, useEffect } from 'react';

import List from '@mui/material/List';

import Player from '../shared/Player';
import Track from './Track';

const PlaylistTracks = ({ activePlaylist, isPlayerDisabled }) => {
  const [tracks, setTracks] = useState(activePlaylist);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setTracks(activePlaylist);
  }, [activePlaylist]);

  return (
    <>
      {
        tracks?.length ?
          <List sx={{ flexBasis: '85%', overflow: 'scroll', paddingLeft: '10px' }}>
            {tracks?.map((track, index) => (
            <Track
                key={ track.id }
                index={ index }
                track={ track }
                onTrackClick={(index) => {
                  setCurrentTrackIndex(index);
                  setIsPlaying(!isPlaying);
                }}
                isTrackPaused={ !isPlaying || currentTrackIndex !== index }
            />
            ))}
          </List>
        :
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexBasis: '85%' }}>Select a Playlist to View Contents!</div>
      }
      <Player
        currentPlaylist={ activePlaylist }
        currentTrackIndex={ currentTrackIndex }
        isDisabled={ isPlayerDisabled }
        isPlaying={ isPlaying }
        setCurrentTrackIndex={ setCurrentTrackIndex }
        setIsPlaying={ setIsPlaying }
      />
    </>
  );
};

export default PlaylistTracks;