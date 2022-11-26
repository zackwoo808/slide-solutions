import { useContext } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Slider from '@mui/material/Slider';

import { PlayerContext } from '../playlists/PlaylistController';

import '../../stylesheets/Player.css';

export default function SeekBar() {
  const {
    duration,
    onSeek,
    onSeekComplete,
    timeElapsed,
    trackProgress
  } = useContext(PlayerContext);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  
  return (
    <>
      <div className="player__time">{timeElapsed}</div>
      <Slider
        sx={{
          margin: '0 30px',
        }}
        aria-label="Playback progress bar"
        value={trackProgress}
        onChange={(e, newPosition) => onSeek(newPosition)}
        onChangeCommitted={(e, newPosition) => onSeekComplete(newPosition)}
        size={isDesktop ? 'md' : 'sm'}
        step={0.1}
      />
      <div className="player__time">{duration}</div>
    </>
  );
}