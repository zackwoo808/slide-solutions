import { useState } from 'react';

import Player from '../shared/Player';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Track = ({ index, track: { title, music_key, bpm, creators, s3_key }, onTrackClick }) => {
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
      // onClick={() => onTrackClick()}
      key={index}
    >
      <IconButton
        className="js-play-pause"
        is-playing="false"
        aria-label="play/pause track"
        onClick={() => Player.playPause([`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/audio/${encodeURIComponent(s3_key)}`]) }
      >
        <PlayCircleIcon />
      </IconButton>
      <p style={{ flexBasis: '10%' }}>{ title }</p>
      <div style={{ flexBasis: '10%' }}>
        <p style={{ maxHeight: '20px', width: '150px', overflow: 'hidden', whiteSpace: 'no-wrap', textOverflow: 'ellipsis' }}>{ creators }</p>
      </div>
      <p style={{ flexBasis: '10%' }}>{ bpm }</p>
      <p style={{ flexBasis: '10%' }}>{ music_key }</p>
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