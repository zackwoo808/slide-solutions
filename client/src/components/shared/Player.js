import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import '../../stylesheets/Player.css';

export default function Player({
  onNext,
  onPause,
  onPlay,
  onPrev,
}) {
  const currentTrackIndex = useSelector(state => state.currentTrackIndex);
  const isPlayerDisabled = useSelector(state => state.isPlayerDisabled);
  const isPlaying = useSelector(state => state.isPlaying);
  
  return(
    <div className="player">
      <ButtonGroup variant="contained" className='player__buttons' sx={{ boxShadow: 'none' }}>
        <Button aria-label="previous track" disabled={ isPlayerDisabled } onClick={onPrev}><SkipPreviousIcon /></Button>
        {isPlaying
          ? <Button aria-label="pause playlist" disabled={ isPlayerDisabled } onClick={onPause}><PauseIcon /></Button>
          : <Button aria-label="play button" disabled={ isPlayerDisabled } onClick={() => onPlay(currentTrackIndex)}><PlayArrowIcon /></Button>}
        <Button aria-label="next track" disabled={ isPlayerDisabled } onClick={onNext}><SkipNextIcon /></Button>
      </ButtonGroup>
    </div>
  );
};
