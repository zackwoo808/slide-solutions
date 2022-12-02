import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import '../../stylesheets/Player.css';

export default function PlaybackControls({ onNext, onPause, onPlay, onPrev }) {
  const currentTrackIndex = useSelector(state => state.currentTrackIndex);
  const isPlayerDisabled = useSelector(state => state.isPlayerDisabled);
  const isPlaying = useSelector(state => state.isPlaying);

  const onPlaybackClick = isPlaying ? onPause : onPlay.bind(this, currentTrackIndex);

  return (
    <ButtonGroup id="playback-buttons" disabled={isPlayerDisabled} variant="contained" className='player__buttons' sx={{ boxShadow: 'none' }}>
      <Button aria-label="previous track" onClick={onPrev} sx={{ marginRight: '5px' }}><SkipPreviousIcon /></Button>
      <Button aria-label={`${isPlaying ? 'pause' : 'play'} playlist`} onClick={onPlaybackClick}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </Button>
      <Button aria-label="next track" onClick={onNext} sx={{ marginLeft: '5px' }}><SkipNextIcon /></Button>
    </ButtonGroup>
  );
}
