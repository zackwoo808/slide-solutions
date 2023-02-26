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
  const { getAccessTokenSilently } = useAuth0();
  // #endregion state management

  // #region lifecycle methods
  useEffect(() => {
    async function getPlaylists() {
      try {
        const token = await getAccessTokenSilently();

        const res = await fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/playlists`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        dispatch({ type: 'UPDATE_CURRENT_PLAYLISTS', data: data?.playlists });
      } catch(err) {
        console.log(err);
      }   
    } 
    getPlaylists();
  }, []);
  // #endregion lifecycle methods


  // #region helper methods
  const handlePlaylistSelect = useCallback(async (id, title) => {
    try {
      const token = await getAccessTokenSilently();
  
      const res = await fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/playlists/${id}/tracks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      dispatch({ type: 'UPDATE_ACTIVE_PLAYLIST', data: { tracks: data, title, id } });
      dispatch({ type: 'TOGGLE_PLAYER_DISABLED', isPlayerDisabled: false });
      dispatch({ type: 'TOGGLE_PLAYER_VISIBLE', isPlayerVisible: true });
    } catch(err) {
      console.log(err);
    }
  }, []);

  const handlePlaylistCreate = useCallback(async (title) => {
    try {
      const token = await getAccessTokenSilently();

      const res = await fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/playlists/add`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Accept:'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title
        })
      });
      const data = await res.json();
      dispatch({ type: 'UPDATE_CURRENT_PLAYLISTS', data: data?.playlists });
    } catch(err) {
      console.log(err);
    }
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
