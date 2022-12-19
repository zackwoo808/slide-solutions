import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeMute from '@mui/icons-material/VolumeMute';
import VolumeUp from '@mui/icons-material/VolumeUp';

export default function VolumeControls({ onVolumeChange, volumeLevel }) {
  // #region state management
  const [volumeAnchor, setVolumeAnchor] = useState(null);
  const isPlayerDisabled = useSelector(state => state.isPlayerDisabled);
  // #endregion state management

  // #region helper methods
  const onVolumeMenuClose = useCallback((e) => {
    e.stopPropagation();
    setVolumeAnchor(null);
  }, []);

  const onVolumeMenuOpen = useCallback((e) => {
    e.stopPropagation();
    setVolumeAnchor(e.currentTarget);
  }, []);

  const handleVolumeChange = useCallback((e, newPosition) => onVolumeChange(newPosition), [onVolumeChange]);
  // #endregion helper methods

  return (
    <>
      <IconButton id="volume-button" onClick={onVolumeMenuOpen} disabled={isPlayerDisabled}>
        {volumeLevel === 0 ?
          <VolumeMute />
          : volumeLevel < 51 ?
            <VolumeDown />
            : <VolumeUp />
        }
      </IconButton>
      <Menu id="mobile-volume-control" anchorEl={volumeAnchor} open={Boolean(volumeAnchor)} onClose={onVolumeMenuClose} MenuListProps={{ 'aria-labelledby': 'volume-button' }} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Slider aria-label="Volume" onChange={handleVolumeChange} orientation="vertical" value={volumeLevel} sx={{ height: '120px' }} />
      </Menu>
    </>
  );
};
