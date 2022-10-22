import { useState, useEffect } from 'react';
import Directory from './Directory.js';
import PlaylistTracks from './PlaylistTracks.js';

const MainSection = ({ playlists, onPlaylistClick, currentPlaylist }) => {
  const [activePlaylist, setActivePlaylist] = useState();

  const handlePlaylistSelect = id => {
    setActivePlaylist(id);
    fetch(`/playlists/${id}/tracks`)
      .then(res => res.json())
      .then((data) => {
        setActivePlaylist(data);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    setActivePlaylist(currentPlaylist);
  }, [currentPlaylist]);

  return (
    <div className="app__main">
      <Directory playlists={ playlists } handlePlaylistSelect={ handlePlaylistSelect } />
      <PlaylistTracks activePlaylist={ activePlaylist } onPlaylistClick={onPlaylistClick} />
    </div>
  );
};

export default MainSection;