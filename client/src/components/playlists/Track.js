import { useState } from 'react';
import { useSelector } from 'react-redux';

import '../../stylesheets/Track.css';

import PauseIcon from '@mui/icons-material/Pause';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Track({ index, track: { title, music_key, bpm, creators }, onPause, onPlay }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const currentTrackIndex = useSelector(state => state.currentTrackIndex);
  const isPlaying = useSelector(state => state.isPlaying);

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
        onClick={() => index === currentTrackIndex && isPlaying ? onPause() : onPlay(index)}
      >
        {index === currentTrackIndex && isPlaying
          ? <PauseIcon />
          : <PlayCircleIcon />}
      </IconButton>
      <p title={ title } style={{ flexBasis: '10%' }}>{ title }</p>
     <div
        style={{ maxHeight: '20px', width: '250px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        title={ creators }
      >
        { creators }
      </div>
      <p style={{ flexBasis: '5%' }}>{ bpm }</p>
      <p style={{ flexBasis: '5%' }}>{ music_key }</p>
      <IconButton aria-label="more info" onClick={(e) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
      }}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
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
