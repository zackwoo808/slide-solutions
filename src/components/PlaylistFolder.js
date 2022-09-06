import { useState, useEffect } from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const PlaylistFolder = ({ item, index, handlePlaylistSelect, isSelected }) => {
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
        <ListItemIcon sx={{ minWidth: 'unset', marginRight: '5px' }}>
          {selected ? <FolderOpenIcon /> : <FolderIcon />}
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItemButton>
    </List>
  );
};

export default PlaylistFolder;