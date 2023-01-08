import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';

import NewPlaylistDialog from './NewPlaylistDialog';

import '../../stylesheets/App.css';
import '../../stylesheets/Playlists.css';

export default function Directory({ playlists, handlePlaylistSelect, handlePlaylistCreate }) {
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
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
