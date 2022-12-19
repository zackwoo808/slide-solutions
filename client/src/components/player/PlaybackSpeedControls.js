import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const PlaybackSpeeds = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

export default function PlaybackSpeedControls({ onPlaybackSpeedChange, playbackSpeed }) {
  // #region state management
  const [playbackMenuAnchor, setPlaybackMenuAnchor] = useState(null);
  const isPlayerDisabled = useSelector(state => state.isPlayerDisabled);
  // #endregion state management

  // #region helper methods
  const onPlaybackOptsClose = useCallback((e) => {
    e.stopPropagation();
    setPlaybackMenuAnchor(null);
  }, []);  

  const onPlaybackOptsOpen = useCallback((e) => {
    e.stopPropagation();
    setPlaybackMenuAnchor(e.currentTarget);
  }, []);  

  const onPlaybackSpeedClick = useCallback((e) => {
    const selectedSpeed = +e?.currentTarget?.dataset?.rate;
    if (selectedSpeed !== playbackSpeed) {
      onPlaybackSpeedChange(selectedSpeed);
    }
    onPlaybackOptsClose(e);
  }, [onPlaybackSpeedChange, playbackSpeed]);
  // #endregion helper methods

  return (
    <>
    <Button onClick={onPlaybackOptsOpen} disabled={isPlayerDisabled}>{playbackSpeed}x</Button>
    <Menu id="playback-speed" anchorEl={playbackMenuAnchor} open={Boolean(playbackMenuAnchor)} onClose={onPlaybackOptsClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      {PlaybackSpeeds.map((speed, index) => <MenuItem onClick={onPlaybackSpeedClick} key={index} data-rate={speed}>{speed}x</MenuItem>)}
    </Menu>
    </>
  );
}