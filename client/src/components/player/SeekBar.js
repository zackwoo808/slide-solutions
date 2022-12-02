import { useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Slider from '@mui/material/Slider';


import '../../stylesheets/Player.css';

export default function SeekBar({ duration, onSeek, onSeekComplete, timeElapsed, trackProgress }) {
  // #region state management
    const [position, setPosition] = useState(trackProgress);
  // #endregion
  
  // #region lifecycle methods
  useEffect(() => {
    document.querySelector('#seek-bar-slider')
      .addEventListener('drag', onChange);
  }, []);
  // endregion
  
  // #region style setup
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  // #endregion style setup

  // #region helper methods
  const onChangeCommitted = (e, newPosition) => onSeekComplete(newPosition);
  const onChange = (e, newPosition) => {
    setPosition(newPosition);
    onSeek();
  };
  // #endregion helper methods
  
  return (
    <>
      <div className="player__time">{timeElapsed}</div>
      <Slider id="seek-bar-slider" aria-label="Playback progress bar" value={position} onChange={onChange} onChangeCommitted={onChangeCommitted} size={isDesktop ? 'md' : 'sm'} step={0.1} sx={{ margin: '0 30px' }} />
      <div className="player__time">{duration}</div>
    </>
  );
}