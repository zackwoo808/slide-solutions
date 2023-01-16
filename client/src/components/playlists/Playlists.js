import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import '../../stylesheets/App.css';

import PlaylistDirectory from './PlaylistDirectory.js';
import PlaylistController from './PlaylistController.js';

export default function Playlists() {
  // #region state management
  const dispatch = useDispatch();
  const currentPlaylists = useSelector(state => state.currentPlaylists);
  const isPlayerVisible = useSelector(state => state.isPlayerVisible);
  const { user, isAuthenticated, isLoading } = useAuth0();
  // #endregion state management

  // #region lifecycle methods
  useEffect(() => {
    fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/playlists`)
      .then(res => res.json())
      .then(data => dispatch({ type: 'UPDATE_CURRENT_PLAYLISTS', data: data?.playlists }))
      .catch(err => console.log(err));
  }, []);
  // #endregion lifecycle methods


  // #region helper methods
  const handlePlaylistSelect = useCallback((id, title) => {
    return fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/playlists/${id}/tracks`)
      .then(res => res.json())
      .then((data) => {
        dispatch({ type: 'UPDATE_ACTIVE_PLAYLIST', data: { tracks: data, title, id } });
        dispatch({ type: 'TOGGLE_PLAYER_DISABLED', isPlayerDisabled: false });
        dispatch({ type: 'TOGGLE_PLAYER_VISIBLE', isPlayerVisible: true });
      })
      .catch(err => console.log(err));
  }, []);

  const handlePlaylistCreate = useCallback((title) => {
    return fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/playlists/add`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json',
      },
      body: JSON.stringify({ title })
    })
      .then(res => res.json())
      .then(data => dispatch({ type: 'UPDATE_CURRENT_PLAYLISTS', data: data?.playlists }))
      .catch(err => console.log(err));
  }, []);
  // #endregion helper methods

  return (
    <div className="app__main">
      {isPlayerVisible
        ? <></> 
        : <PlaylistDirectory playlists={currentPlaylists} handlePlaylistSelect={handlePlaylistSelect} handlePlaylistCreate={handlePlaylistCreate} />}
      <PlaylistController />
    </div>
  );
};
