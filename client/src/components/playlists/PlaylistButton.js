import { useState, useEffect } from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const PlaylistButton = ({ item, index, handlePlaylistSelect, isSelected }) => {
  const [selected, setSelected] = useState(isSelected);

  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  return (
    <List component="div" disablePadding key={index}>
      <ListItemButton sx={{ display: 'flex', alignItems: 'center', pl: 1 }} onClick={() => {
        if (!selected) {
          setSelected(true);
        }
        handlePlaylistSelect(item.playlists);
      }}>
        <ListItemText primary={item.name} />
      </ListItemButton>
    </List>
  );
};

export default PlaylistButton;