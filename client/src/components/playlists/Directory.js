import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';

import '../../stylesheets/Playlists.css';

export default function Directory({ playlists, handlePlaylistSelect }) {
  return (
    <List sx={{ overflow: 'clip', width: '100%' }} component='nav' aria-labelledby='nested-sub-header' subheader='Playlists' className="playlist__directory">
      {playlists?.map(({ playlist_id, title }, index) => {
        return (
          <ListItem sx={{ maxHeight: '50px', padding: '0' }} key={ index }>
            <Button sx={{ width: '100%' }} variant="outlined" onClick={() => {
              
              handlePlaylistSelect(playlist_id, title);
            }}>
              <ListItemText primary={ title } />
            </Button>
          </ListItem>
        );
      })}
    </List>
  );
};
