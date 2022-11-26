import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeMute from '@mui/icons-material/VolumeMute';
import VolumeUp from '@mui/icons-material/VolumeUp';

export default function VolumeControls({
  onVolumeChange,
  volumeLevel,
}) {
  const [volumeAnchor, setVolumeAnchor] = useState(null);

  const handleVolumeMenuClose = (e) => {
    e.stopPropagation();
    setVolumeAnchor(null);
  };

  return (
    <>
      <IconButton id="volume-button" onClick={(e) => {
        e.stopPropagation();
        setVolumeAnchor(e.currentTarget);
      }}>
        {volumeLevel === 0 ?
          <VolumeMute />
          : volumeLevel < 51 ?
            <VolumeDown />
            : <VolumeUp />
        }
      </IconButton>
      <Menu
        id="mobile-volume-control"
        anchorEl={volumeAnchor}
        open={Boolean(volumeAnchor)}
        onClose={handleVolumeMenuClose}
        MenuListProps={{
          'aria-labelledby': 'volume-button',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        // sx={{ width: '50px' }}
      >
        <Slider
          aria-label="Volume"
          onChange={(e, newPosition) => onVolumeChange(newPosition)}
          orientation="vertical"
          value={volumeLevel}
          sx={{
            height: '120px',
          }}
        />
      </Menu>
    </>
  );
};
