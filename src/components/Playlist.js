import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import Track from './Track';

const Playlist = ({ activePlaylists = [] }) => {
  const [playlists, setPlaylists] = useState(activePlaylists);

  useEffect(() => {
    setPlaylists(activePlaylists);
}, [activePlaylists]);

  return (
    playlists.length ?
      <List sx={{ flexBasis: '85%', overflow: 'scroll', paddingLeft: '10px' }}>
        {playlists.map((track, index) => (
        <Track
            key={track.id}
            index={index}
            name={track.name}
            musicKey={track.musicKey}
            BPM={track.BPM}
            runtime={track.runtime}
        />
        ))}
      </List>
    :
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexBasis: '85%' }}>Select a Playlist to View Contents!</div>
  );
};

export default Playlist;