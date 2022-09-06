import { useState } from 'react';
import Directory from './Directory.js';
import Playlist from './Playlist.js';

const MainSection = ({ sections = {} }) => {
  const [activePlaylists, setActivePlaylists] = useState();

  const handlePlaylistSelect = playlists => {
    setActivePlaylists(playlists);
  };

  return (
    <div className="app__main">
      <Directory folders={ sections } handlePlaylistSelect={handlePlaylistSelect} />
      <Playlist activePlaylists={ activePlaylists } />
    </div>
  );
};

export default MainSection;