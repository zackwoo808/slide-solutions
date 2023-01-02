import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';

import '../../stylesheets/App.css';
import '../../stylesheets/Playlists.css';

export default function Directory({ playlists, handlePlaylistSelect }) {
  return (
    <div className="flex--column">
      <h2 style={{ marginTop: 0 }}>Playlists</h2>
      <List sx={{ overflow: 'clip', width: '100%' }} component='nav' aria-labelledby='nested-sub-header' className="playlist__directory">
        {playlists?.map(({ playlist_id, title }, index) => {
          return (
            <ListItem sx={{ maxHeight: '50px', padding: '0' }} key={index}>
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
