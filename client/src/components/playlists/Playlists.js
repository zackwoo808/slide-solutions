import { useState, useEffect } from 'react';

// import Player from '../shared/Player';
import Directory from './Directory.js';
import PlaylistTracks from './PlaylistTracks.js';

const Playlists = ({ playlists, currentPlaylist }) => {
  const [activePlaylist, setActivePlaylist] = useState();
  const [isPlayerDisabled, setIsPlayerDisabled] = useState(true);

  const handlePlaylistSelect = id => {
    fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/playlists/${id}/tracks`)
    .then(res => res.json())
    .then((data) => {
        setActivePlaylist(data);
        setIsPlayerDisabled(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setActivePlaylist(currentPlaylist);
  }, [currentPlaylist]);

  return (
    <div className="app__main">
      <Directory playlists={ playlists } handlePlaylistSelect={ handlePlaylistSelect } />
      <PlaylistTracks
        activePlaylist={ activePlaylist }
        isPlayerDisabled={ isPlayerDisabled }
      />
    </div>
  );
};

export default Playlists;