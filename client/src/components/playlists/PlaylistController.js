import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Howl, Howler } from 'howler';
import { useAuth0 } from '@auth0/auth0-react';

import '../../stylesheets/App.css';
import '../../stylesheets/Playlists.css';

import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Player from '../player/Player';
import Track from './Track';
import UploadTrackDialog from './UploadTrackDialog';

export default function PlaylistController() {
  // #region state management
  const { getAccessTokenSilently } = useAuth0();

  const [currentTrack, setCurrentTrack] = useState();
  const [activeSoundsPlaylist, setActiveSoundsPlaylist] = useState([]);
  const [volumeLevel, setVolumeLevel] = useState(50);
  const [trackProgress, setTrackProgress] = useState(0);
  const [duration, setDuration] = useState();
  const [timeElapsed, setTimeElapsed] = useState();
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isPausedBySeek, setIsPausedBySeek] = useState(false);

  const dispatch = useDispatch();
  const activePlaylist = useSelector(state => state.activePlaylist);
  const currentTrackIndex = useSelector(state => state.currentTrackIndex);
  const isPlaying = useSelector(state => state.isPlaying);
  const isPlayerVisible = useSelector(state => state.isPlayerVisible);
  // #endregion state management

  // #region lifecycle methods
  useEffect(() => {
    setActiveSoundsPlaylist(activePlaylist.tracks.map(() => ({})));
  }, [activePlaylist]);

  useEffect(() => {
    Howler.volume(volumeLevel / 100);
    window.addEventListener('updateSlideTrackProgress', e => {
      const { newProgress = 0 } = e.detail || {};
      setTrackProgress(+newProgress);
    });
  }, []);
  // #endregion lifecycle methods

  // #region helper methods
  function getTrack(index) {
    let track;
    index = typeof index === 'number' ? index : currentTrackIndex;
    const data = activeSoundsPlaylist[index];

    if (data.howl) {
      track = data.howl;
    } else {
      track = new Howl({
        src: `${process.env.REACT_APP_AWS_EC2_ENDPOINT}/audio/${activePlaylist.tracks[index]?.s3_key}`,
        html5: true,
        preload: false,
        onplay() {
          requestAnimationFrame(onStep.bind(this, track));
        },
        onseek() {
          requestAnimationFrame(onStep.bind(this, track));
        },
        onload() {
          setDuration(formatTime(track.duration()));
        },
        rate: playbackSpeed,
      });

      setActiveSoundsPlaylist(activeSoundsPlaylist.map((item, itemIndex) => itemIndex === index ? { howl: track } : item));
    }

    setCurrentTrack(track);
    return track;
  };

  function formatTime(time) {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  // #endregion helper methods

  // #region player methods
  const onPlay = useCallback((index) => {
    if (index !== undefined && index !== currentTrackIndex) {
      if (currentTrack) {
        currentTrack.stop();
      }
      dispatch({ type: 'UPDATE_CURRENT_TRACK_INDEX', index: index || 0 });
    }

    if (!currentTrack || (index !== currentTrackIndex)) {
      getTrack(index).play();
    } else {
      currentTrack.play();
    }

    dispatch({ type: 'TOGGLE_PLAYER_PLAYING', isPlaying: true });
  }, [activePlaylist, activeSoundsPlaylist, currentTrackIndex, currentTrack]);

  const onPause = useCallback(() => {
    if (!currentTrack) {
      return;
    }

    currentTrack.pause();
    dispatch({ type: 'TOGGLE_PLAYER_PLAYING', isPlaying: false });
  }, [currentTrack]);

  const onNext = useCallback(() => {
    let newIndex = 0;
    if (currentTrack) {
      newIndex = currentTrackIndex === activePlaylist.tracks.length - 1 ? 0 : currentTrackIndex + 1;
    }

    onPlay(newIndex);
    dispatch({ type: 'UPDATE_CURRENT_TRACK_INDEX', index: newIndex });
  }, [currentTrack, currentTrackIndex]);

  const onPrev = useCallback(() => {
    let newIndex = activePlaylist.tracks.length - 1;
    if (currentTrack) {
      newIndex = currentTrackIndex === 0 ? activePlaylist.tracks.length - 1 : currentTrackIndex - 1;
    }

    onPlay(newIndex);
    dispatch({ type: 'UPDATE_CURRENT_TRACK_INDEX', index: newIndex });
  }, [currentTrack, onPlay]);

  const onVolumeChange = useCallback((value) => {
    setVolumeLevel(value);
    Howler.volume(value / 100);
  }, []);

  const onSeek = useCallback(() => {
    if (!currentTrack) {
      return;
    }

    if (isPlaying && !isPausedBySeek) {
      onPause();
      setIsPausedBySeek(true);
    }
  }, [currentTrack, isPlaying, isPausedBySeek]);

  const onSeekComplete = useCallback((newPosition) => {
    if (!currentTrack) {
      return;
    }

    currentTrack.seek(currentTrack.duration() * (newPosition / 100));

    if (isPausedBySeek) {
      setIsPausedBySeek(false);
      onPlay();
    }
  }, [currentTrack, isPausedBySeek]);

  const onStep = useCallback((track) => {
    if (!track) {
      return;
    }

    const newTrackPosition = track.seek() || 0;
    setTimeElapsed(formatTime(newTrackPosition));

    const updateTrackProgress = new CustomEvent('updateSlideTrackProgress', {
      detail: {
        newProgress: ((newTrackPosition / track.duration()) * 100 || 0).toFixed(1),
      }
    });
    window.dispatchEvent(updateTrackProgress);

    if (track.playing()) {
      requestAnimationFrame(onStep.bind(this, track));
    }
  }, []);

  const onPlaybackSpeedChange = useCallback((rate) => {
    setPlaybackSpeed(rate);

    if (currentTrack) {
      currentTrack.rate(rate);
    }
  }, [currentTrack]);
  // #endregion player methods

  // #region event handlers
  const onBackClick = useCallback(() => {
    if (currentTrack) {
      currentTrack.stop();
    }

    dispatch({ type: 'UPDATE_ACTIVE_PLAYLIST', data: { tracks: [], title: '' } });
    dispatch({ type: 'TOGGLE_PLAYER_DISABLED', isPlayerDisabled: true });
    dispatch({ type: 'TOGGLE_PLAYER_VISIBLE', isPlayerVisible: false });
  }, []);

  const handleUploadTrack = useCallback(async (formData) => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/upload`, {
        method: 'POST',
        cache: 'no-cache',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      dispatch({ type: 'UPDATE_ACTIVE_PLAYLIST', data: { tracks: data.data, title: activePlaylist.title, id: activePlaylist.id }});

      return response;
    } catch (err) {
      return err;
    }
  }, [activePlaylist]);
  // #endregion

  return (
    <div className={`playlists__controller ${isPlayerVisible ? 'playlists__controller--visible' : ''}`}>
      <div className="playlists__active-tracks">
              <div className="flex">
                <IconButton onClick={onBackClick} sx={{ padding: '0 20px 0 0' }}><ArrowBackIosNewSharpIcon /></IconButton>
                <h2 style={{ margin: 0 }}>Playlists</h2>
              </div>
              <div className="flex">
                <h3>{activePlaylist.title}</h3>
                <UploadTrackDialog playlistId={activePlaylist.id} handleUploadTrack={handleUploadTrack} />
              </div>
              {activePlaylist?.tracks?.length
                ? <Table sx={{ overflow: 'scroll', maxWidth: '100%' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Creators</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>BPM</TableCell>
                        <TableCell>Key</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      children={activePlaylist.tracks.map((track, index) => (
                        <Track key={track.track_id} index={index} track={track} currentTrack={currentTrack} onPlay={onPlay} onPause={onPause} />
                      ))}
                    />
                  </Table>
                : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Add Tracks</div>
              }
      </div>
      <Player duration={duration} onNext={onNext} onPause={onPause} onPlay={onPlay} onPlaybackSpeedChange={onPlaybackSpeedChange} onPrev={onPrev} onSeek={onSeek} onSeekComplete={onSeekComplete} onVolumeChange={onVolumeChange} playbackSpeed={playbackSpeed} timeElapsed={timeElapsed} trackProgress={trackProgress} volumeLevel={volumeLevel} />
    </div>
  );
};
