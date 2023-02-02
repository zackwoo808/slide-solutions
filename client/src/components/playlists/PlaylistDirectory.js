import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';

import NewPlaylistDialog from './NewPlaylistDialog';

import '../../stylesheets/App.css';
import '../../stylesheets/Playlists.css';

export default function Directory({ playlists, handlePlaylistSelect, handlePlaylistCreate }) {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  const onDeleteClick = useCallback(async (title) => {
    try {
      const token = await getAccessTokenSilently();

      const res = await fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/playlists/delete`, {
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
    } catch (err) {
      return err;
    }
  });

  return (
    <div className="flex--column">
      <h2 style={{ marginTop: 0, display: 'flex', justifyContent: 'space-between' }}>
        <span>Playlists</span>
        <NewPlaylistDialog handlePlaylistCreate={handlePlaylistCreate} />
      </h2>
      <List sx={{ overflow: 'clip', width: '100%' }} component='nav' aria-labelledby='nested-sub-header' className="playlist__directory">
        {playlists?.map(({ playlist_id, title }, index) => {
          return (
            <ListItem sx={{ maxHeight: '50px', padding: '0', marginBottom: '10px' }} key={index}>
              <Button sx={{ width: '100%', background: 'teal' }} variant="contained" onClick={() => {

                handlePlaylistSelect(playlist_id, title);
              }}>
                <ListItemText primary={title} />
              </Button>
              <Button onClick={onDeleteClick.bind(this, title)}>Delete</Button>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
