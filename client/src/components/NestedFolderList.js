import { useState } from 'react';

import PlaylistFolder from './PlaylistFolder';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

const NestedFolderList = ({ name, items = [], handlePlaylistSelect }) => {
  const [open, setOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(-1);

  const handleClick = () => {
    setOpen(!open);
  };

  const hasItems = Boolean(items.length);

  return (
    <div>
      {
        hasItems ?
          <div>
            <ListItemButton onClick={handleClick} sx={{ paddingLeft: hasItems ? 0 : '20px' }}>
              {hasItems ? (open ? <ExpandLess /> : <ExpandMore />) : null}
              <ListItemText primary={name} />
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {items.map((item, index) => {
                return <PlaylistFolder key={index} item={item} index={index} isSelected={selectedFolder === index} handlePlaylistSelect={(playlists) => {
                  setSelectedFolder(index);
                  handlePlaylistSelect(playlists);
                }} />;
              })}
            </Collapse>
          </div>
        : 
        <ListItem sx={{ paddingLeft: hasItems ? 0 : '20px' }}>
          <ListItemText primary={name} />
        </ListItem>
      }
    </div>
  );
};

export default NestedFolderList;