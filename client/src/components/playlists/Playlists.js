import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Directory from './Directory.js';
import PlaylistController from './PlaylistController.js';

export default function Playlists() {
  // #region state management
  const dispatch = useDispatch();
  const activePlaylist = useSelector(state => state.activePlaylist);
  const isPlayerDisabled = useSelector(state => state.isPlayerDisabled);
  const currentPlaylists = useSelector(state => state.currentPlaylists);
  // #endregion state management

  // #region lifecycle methods
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/playlists/${queryParams.get('userId') || 2}`)
      .then(res => res.json())
      .then(data => dispatch({ type: 'UPDATE_CURRENT_PLAYLISTS', data: data?.playlists }))
      .catch(err => console.log(err));
  });
  // #endregion lifecycle methods


  // #region helper methods
  const handlePlaylistSelect = useCallback((id) => {
    return fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/playlists/${id}/tracks`)
      .then(res => res.json())
      .then((data) => {
        dispatch({ type: 'UPDATE_ACTIVE_PLAYLIST', data });
        dispatch({ type: 'TOGGLE_PLAYER_DISABLED', isPlayerDisabled: false });
      })
      .catch(err => console.log(err));
  }, []);
  // #endregion helper methods

  return (
    <div className="app__main">
      <Directory playlists={currentPlaylists} handlePlaylistSelect={handlePlaylistSelect} />
      <PlaylistController
        activePlaylist={activePlaylist}
        isPlayerDisabled={isPlayerDisabled}
      />
    </div>
  );
};
