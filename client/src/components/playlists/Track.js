import { useState } from 'react';

import '../../stylesheets/Track.css';

import PauseIcon from '@mui/icons-material/Pause';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Track = ({ index, track: { title, music_key, bpm, creators, s3_key }, onTrackClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
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
    <ListItem
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: index === 0 ? '1px solid rgba(0, 0, 0, 0.25)' : 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
        fontWeight: '700',
        fontSize: '16px',
        height: '60px',
      }}
      key={index}
    >
      <IconButton
        id="js-track-play-pause"
        aria-label="play/pause track"
        onClick={() => {
          setIsPlaying(!isPlaying);
          // onTrackClick(index, s3_key);
        }}
      >
        {isPlaying
          ? <PauseIcon />
          : <PlayCircleIcon />}
      </IconButton>
      <p title={ title } style={{ flexBasis: '10%' }}>{ title }</p>
      <div style={{ flexBasis: '30%' }}>
        <div
          style={{ maxHeight: '20px', maxWidth: '250px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          title={ creators }
        >
          { creators }
        </div>
      </div>
      <p style={{ flexBasis: '5%' }}>{ bpm }</p>
      <p style={{ flexBasis: '5%' }}>{ music_key }</p>
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
    </ListItem>
  );
};

export default Track;