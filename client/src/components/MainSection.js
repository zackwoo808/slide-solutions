import { useState } from 'react';
import Directory from './Directory.js';
import PlaylistGroup from './PlaylistGroup.js';

const MainSection = ({ sections = {}, onPlaylistClick }) => {
  const [activePlaylists, setActivePlaylists] = useState();

  const handlePlaylistSelect = playlists => {
    setActivePlaylists(playlists);
  };

  return (
    <div className="app__main">
      <Directory folders={ sections } handlePlaylistSelect={handlePlaylistSelect} />
      <PlaylistGroup activePlaylists={ activePlaylists } onPlaylistClick={onPlaylistClick} />
    </div>
  );
};

export default MainSection;