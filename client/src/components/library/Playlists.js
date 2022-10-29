import { useState, useEffect } from 'react';
import Directory from './Directory.js';
import PlaylistTracks from './PlaylistTracks.js';

const Playlists = ({ playlists, onPlaylistClick, currentPlaylist }) => {
  const [activePlaylist, setActivePlaylist] = useState();

  const handlePlaylistSelect = id => {
    setActivePlaylist(id);
    fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/playlists/${id}/tracks`)
      .then(res => res.json())
      .then((data) => {
        setActivePlaylist(data);
      })
      .catch(err => console.log(err));
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

export default Playlists;