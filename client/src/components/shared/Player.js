import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import '../../stylesheets/Player.css';

const Player = ({
  currentPlaylist,
  currentTrackIndex,
  isDisabled,
  isPlaying,
  setCurrentTrackIndex,
  setIsPlaying
}) => {
  const isMounted = useRef(false);
  const [currentTrack, setCurrentTrack] = useState({});

  useEffect(() => {
    if (isMounted.current) {
      pause();
      play(currentTrackIndex);
    } else {
      isMounted.current = true;
    }
  }, [currentTrackIndex]);

  function getTrack(index) {
    let track;
    index = typeof index === 'number' ? index : currentTrackIndex;
    const data = currentPlaylist[index];

    if (data.howl) {
      track = data.howl;
    } else {
      track = data.howl = new Howl({
        src: `${process.env.REACT_APP_AWS_EC2_ENDPOINT}/audio/${currentPlaylist[index]?.s3_key}`,
        html5: true,
        onplay: () => {
          setIsPlaying(true);
        },
        onpause: () => {
          setIsPlaying(false);
        }
      });
    }

    setCurrentTrack(track);
    setCurrentTrackIndex(index);
    return track;
  }

  function play(index) {
    getTrack(index).play();
  }

  function pause() {
    currentTrack?.pause && currentTrack.pause();
  }
  
  return(
    <div className="player">
      <ButtonGroup variant="contained" className='player__buttons' sx={{
        boxShadow: 'none',
      }}>
        <Button aria-label="previous track" disabled={ isDisabled } onClick={() => {}}><SkipPreviousIcon /></Button>
        {isPlaying
          ? <Button aria-label="pause playlist" disabled={ isDisabled } onClick={pause}>
              <PauseIcon />
            </Button>
          : <Button aria-label="play button" disabled={ isDisabled } onClick={play}>
              <PlayArrowIcon />
            </Button>}
        <Button aria-label="next track" disabled={ isDisabled } onClick={() => {}}><SkipNextIcon /></Button>
      </ButtonGroup>
    </div>
  );
};

export default Player;