import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function Directory({ playlists, handlePlaylistSelect }) {
  return (
    <List
      sx={{ borderRight: '2px solid grey', flexBasis: '15%', overflow: 'clip' }}
      component='nav'
      aria-labelledby='nested-sub-header'
      subheader='Playlists'
    >
      {playlists?.map(({ playlist_id, title }, index) => {
        return (
          <ListItemButton
            onClick={() => {
              handlePlaylistSelect(playlist_id);
            }}
            sx={{ paddingLeft: '20px' }}
            key={ index }
          >
            <ListItemText primary={ title } />
          </ListItemButton>
        );
      })}
    </List>
  );
};
