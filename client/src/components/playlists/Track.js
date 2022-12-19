import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import '../../stylesheets/Track.css';

import PauseIcon from '@mui/icons-material/Pause';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Track({ index, track: { title, music_key, s3_key, bpm, creators }, onPause, onPlay }) {
  // #region state management
  const [anchorEl, setAnchorEl] = useState(null);

  const currentTrackIndex = useSelector(state => state.currentTrackIndex);
  const isPlaying = useSelector(state => state.isPlaying);
  // #endregion state management

  // #region helper methods
  const onMoreInfoClose = useCallback((e) => {
    e.stopPropagation();
    setAnchorEl(null);
  }, []);

  const onMoreInfoOpen = useCallback((e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const download = (path, filename) => {
    // Create a new link
    const anchor = document.createElement('a');
    anchor.href = path;
    anchor.download = filename;

    // Append to the DOM
    document.body.appendChild(anchor);

    // Trigger `click` event
    anchor.click();

    // Remove element from DOM
    document.body.removeChild(anchor);
  };

  const onDownloadClick = useCallback(async (e) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/download/${s3_key}`);
      const blob = await response.blob();
      const url = await URL.createObjectURL(blob);
      // Download file
      download(url, s3_key);

      // Release the object URL
      URL.revokeObjectURL(url);
      onMoreInfoClose(e);
    } catch (err) {
      console.log(err);
      onMoreInfoClose(e);
    }
  }, []);

  const onTrackPlaybackClick = useCallback(() => index === currentTrackIndex && isPlaying ? onPause() : onPlay(index), [onPause, onPlay]);
  // #endregion helper methods

  return (
    <ListItem key={index} sx={{ display: 'flex', borderTop: index === 0 ? '1px solid rgba(0, 0, 0, 0.25)' : 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.25)', fontWeight: '700', fontSize: '16px', height: '60px', }}>
      <IconButton sx={{ flex: '0 1 auto', marginRight: '12px' }} id="js-track-play-pause" aria-label="play/pause track" onClick={onTrackPlaybackClick}>
        {index === currentTrackIndex && isPlaying ? <PauseIcon /> : <PlayCircleIcon />}
      </IconButton>
      <p title={title} style={{ flex: '0 1 20%', marginRight: '20px' }}>{title}</p>
      <div title={creators} className="track__creators">{creators}</div>
      <p style={{ flex: '0 1 20%' }}>{bpm}</p>
      <p style={{ flex: '1 1 20%' }}>{music_key}</p>
      <IconButton sx={{ flexBasis: '0 1 auto' }} aria-label="more info" onClick={onMoreInfoOpen}><MoreHorizIcon /></IconButton>
      <Menu id="basic-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onMoreInfoClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }} >
        <MenuItem sx={{ overflow: 'scroll' }} divider="true">Creators: {creators}</MenuItem>
        <MenuItem onClick={onDownloadClick}>Download</MenuItem>
      </Menu>
    </ListItem>
  );
}
