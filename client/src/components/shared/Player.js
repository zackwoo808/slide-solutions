import { useState } from 'react';
import { Howl, Howler } from 'howler';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import '../../stylesheets/Player.css';

const Player = () => {
  const [playingTrack, setPlayingTrack] = useState();

  function toggleVisibility(id, show) {
    if (show) {
      document.querySelector(id).classList.remove('hide');
    } else {
      document.querySelector(id).classList.add('hide');
    }
  }
  
  function playPause(src) {
    setPlayingTrack(new Howl({
      src,
      html5: true
    }));
    
    playingTrack.play();
  }
  
  return(
    <div class="player">
      <ButtonGroup variant="contained" className='player__buttons' sx={{
        boxShadow: 'none',
      }}>
        <Button aria-label="previous track" onClick={() => {}}><SkipPreviousIcon /></Button>
        <Button className="js-play-pause" is-playing="false" aria-label="play/pause playlist" onClick={playPause}><PlayCircleIcon /></Button>
        <Button aria-label="next track" onClick={() => {}}><SkipNextIcon /></Button>
      </ButtonGroup>
    </div>
  );
};

export default Player;