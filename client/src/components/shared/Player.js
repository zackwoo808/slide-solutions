import { useState, useEffect } from 'react';
import { Howl } from 'howler';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import '../../stylesheets/Player.css';

const Player = ({ playlist, currentTrack, isDisabled }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentPlaylist, setCurrentPlaylist] = useState(playlist);
  // const [playingTrack, setPlayingTrack] = useState(currentTrack);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setCurrentPlaylist(playlist);
  }, [playlist]);
  
  function playPause(index) {
    let track;
    index = typeof index === 'number' ? index : currentTrackIndex;
    const data = currentPlaylist[index];

    if (data.howl) {
      track = data.howl;
    } else {
      track = data.howl = new Howl({
        src: `${process.env.REACT_APP_AWS_EC2_ENDPOINT}/audio/${currentPlaylist[currentTrackIndex]?.s3_key}`,
        html5: true,
        onplay: () => {
          setIsPlaying(true);
        },
        onpause: () => {
          setIsPlaying(false);
        }
      });
    }
    
    isPlaying ? track.pause() : track.play();
    setCurrentTrackIndex(index);
    // document.querySelectorAll('.js-track-play-pause')
  }
  
  return(
    <div className="player">
      <ButtonGroup variant="contained" className='player__buttons' sx={{
        boxShadow: 'none',
      }}>
        <Button aria-label="previous track" disabled={ isDisabled } onClick={() => {}}><SkipPreviousIcon /></Button>
        <Button aria-label="play/pause playlist" disabled={ isDisabled } onClick={playPause}>
          {isPlaying
            ? <PauseIcon />
            : <PlayArrowIcon />}
        </Button>
        <Button aria-label="next track" disabled={ isDisabled } onClick={() => {}}><SkipNextIcon /></Button>
      </ButtonGroup>
    </div>
  );
};

export default Player;