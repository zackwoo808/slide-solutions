import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Slider from '@mui/material/Slider';

import '../../stylesheets/Player.css';

export default function SeekBar({
  duration,
  onSeek,
  onSeekComplete,
  timeElapsed,
  trackProgress
}) {
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
        onChange3={(e, newPosition) => onSeek(newPosition)}
        onChangeCommitted={(e, newPosition) => onSeekComplete(newPosition)}
        size={isDesktop ? 'md' : 'sm'}
      />
      <div className="player__time">{duration}</div>
    </>
  );
}