import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import Track from './Track';

const PlaylistTracks = ({ activePlaylist, onTrackClick }) => {
  const [tracks, setTracks] = useState(activePlaylist);

  useEffect(() => {
    setTracks(activePlaylist);
}, [activePlaylist]);

  return (
    tracks?.length ?
      <List sx={{ flexBasis: '85%', overflow: 'scroll', paddingLeft: '10px' }}>
        {tracks?.map((track, index) => (
        <Track
            key={track.id}
            index={index}
            track={track}
            onTrackClick={onTrackClick}
        />
        ))}
      </List>
    :
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexBasis: '85%' }}>Select a Playlist to View Contents!</div>
  );
};

export default PlaylistTracks;