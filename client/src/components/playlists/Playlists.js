import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Player from '../shared/Player';
import Directory from './Directory.js';
import PlaylistTracks from './PlaylistTracks.js';

const Playlists = () => {
  const dispatch = useDispatch();
  const activePlaylist = useSelector(state => state.activePlaylist);
  const isPlayerDisabled = useSelector(state => state.isPlayerDisabled);
  const currentPlaylists = useSelector(state => state.currentPlaylists);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/playlists/${queryParams.get('userId') || 2}`)
      .then(res => res.json())
      .then(data => dispatch({ type: 'UPDATE_CURRENT_PLAYLISTS', data: data?.playlists }))
      .catch(err => console.log(err));
  });

  const handlePlaylistSelect = id => {
    fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/playlists/${id}/tracks`)
      .then(res => res.json())
      .then((data) => {
        dispatch({ type: 'UPDATE_ACTIVE_PLAYLIST', data });
        dispatch({ type: 'TOGGLE_PLAYER_DISABLED', isPlayerDisabled: false });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="app__main">
      <Directory playlists={ currentPlaylists } handlePlaylistSelect={ handlePlaylistSelect } />
      <PlaylistTracks
        activePlaylist={ activePlaylist }
        isPlayerDisabled={ isPlayerDisabled }
      />
    </div>
  );
};

export default Playlists;