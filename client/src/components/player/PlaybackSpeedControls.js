import { useContext, useState } from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { PlayerContext } from '../playlists/PlaylistController';

const PlaybackSpeeds = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

export default function PlaybackSpeedControls() {
  const [playbackMenuAnchor, setPlaybackMenuAnchor] = useState(null);
  const {
    onPlaybackSpeedChange,
    playbackSpeed
  } = useContext(PlayerContext);

  const handlePlaybackOptsClose = (e) => {
    e.stopPropagation();
    setPlaybackMenuAnchor(null);
  };  

  return (
    <>
    <Button onClick={(e) => {
      e.stopPropagation();
      setPlaybackMenuAnchor(e.currentTarget);
    }}>{playbackSpeed}x</Button>
    <Menu
      id="playback-speed"
      anchorEl={playbackMenuAnchor}
      open={Boolean(playbackMenuAnchor)}
      onClose={handlePlaybackOptsClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      {PlaybackSpeeds.map((speed, index) => <MenuItem onClick={(e) => {
        if (+e.currentTarget.dataset.rate !== playbackSpeed) {
          onPlaybackSpeedChange(+e.currentTarget.dataset.rate);
        }
        handlePlaybackOptsClose(e);
      }} key={index} data-rate={speed}>{speed}x</MenuItem>)}
    </Menu>
    </>
  );
}