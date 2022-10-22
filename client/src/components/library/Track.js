import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Track = ({ index, track: { title, musicKey, bpm, creators }, onTrackClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <ListItemButton sx={{
        justifyContent: 'space-between',
        borderTop: index === 0 ? '1px solid rgba(0, 0, 0, 0.25)' : 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
        fontWeight: '700',
      }} onClick={() => onTrackClick()}>
      <p style={{ flexBasis: '20%' }}>{ title }</p>
      <p style={{ flexBasis: '20%', textAlign: 'center' }}>{ creators }</p>
      <p style={{ flexBasis: '20%', textAlign: 'center' }}>{ bpm }</p>
      <p style={{ flexBasis: '20%', textAlign: 'center' }}>{ musicKey }</p>
      <IconButton aria-label="more info" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleClose}>Download</MenuItem>
      <MenuItem onClick={handleClose}>Share</MenuItem>
    </Menu>
    </ListItemButton>
  );
};

export default Track;