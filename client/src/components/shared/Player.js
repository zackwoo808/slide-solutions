import { useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import '../../stylesheets/Player.css';

export default function Player({
  duration,
  onNext,
  onPause,
  onPlay,
  onPlaybackSpeedChange,
  onPrev,
  onSeek,
  onVolumeChange,
  playbackSpeed,
  timeElapsed,
  trackProgress,
  volumeLevel,
}) {
  const [playbackMenuAnchor, setPlaybackMenuAnchor] = useState(null);

  const currentTrackIndex = useSelector(state => state.currentTrackIndex);
  const isPlayerDisabled = useSelector(state => state.isPlayerDisabled);
  const isPlaying = useSelector(state => state.isPlaying);

  const handlePlaybackOptsClose = (e) => {
    e.stopPropagation();
    setPlaybackMenuAnchor(null);
  };

  const PlaybackSpeeds = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0];
  
  return(
    <div className="player">
      <div className="player__top-controls">
        <div className="player__time">{timeElapsed}</div>
        <Slider sx={{
          flexBasis: '80%',
          margin: '0 20px',
        }} aria-label="Playback progress bar" value={trackProgress} onChange={(e, newPosition) => onSeek(newPosition)} />
        <div className="player__time">{duration}</div>
      </div>
      <div className="player__bottom-controls">
        <ButtonGroup variant="contained" className='player__buttons' sx={{ boxShadow: 'none' }}>
          <Button aria-label="previous track" disabled={ isPlayerDisabled } onClick={onPrev} sx={{ marginRight: '5px' }}><SkipPreviousIcon /></Button>
          {isPlaying
            ? <Button aria-label="pause playlist" disabled={ isPlayerDisabled } onClick={onPause}><PauseIcon /></Button>
            : <Button aria-label="play button" disabled={ isPlayerDisabled } onClick={() => onPlay(currentTrackIndex)}><PlayArrowIcon /></Button>}
          <Button aria-label="next track" disabled={ isPlayerDisabled } onClick={onNext} sx={{ marginLeft: '5px' }}><SkipNextIcon /></Button>
        </ButtonGroup>
        <div className="player__volume-controls">
          <VolumeDown />
          <Slider aria-label="Volume" value={volumeLevel} onChange={(e, newPosition) => onVolumeChange(newPosition)} />
          <VolumeUp />
        </div>
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
        >
          {PlaybackSpeeds.map((speed, index) => <MenuItem onClick={(e) => {
            if (+e.currentTarget.dataset.rate !== playbackSpeed) {
              onPlaybackSpeedChange(+e.currentTarget.dataset.rate);
            }
            handlePlaybackOptsClose(e);
          }} key={index} data-rate={speed}>{speed}x</MenuItem>)}
        </Menu>
      </div>
    </div>
  );
};
