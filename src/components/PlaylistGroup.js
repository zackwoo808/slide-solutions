import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import Playlist from './Playlist';

const PlaylistGroup = ({ activePlaylists = [], onPlaylistClick }) => {
  const [playlists, setPlaylists] = useState(activePlaylists);

  useEffect(() => {
    setPlaylists(activePlaylists);
}, [activePlaylists]);

  return (
    playlists.length ?
      <List sx={{ flexBasis: '85%', overflow: 'scroll', paddingLeft: '10px' }}>
        {playlists.map((track, index) => (
        <Playlist
            key={track.id}
            index={index}
            name={track.name}
            musicKey={track.musicKey}
            BPM={track.BPM}
            runtime={track.runtime}
            onPlaylistClick={onPlaylistClick}
        />
        ))}
      </List>
    :
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexBasis: '85%' }}>Select a Playlist to View Contents!</div>
  );
};

export default PlaylistGroup;