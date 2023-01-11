import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddBoxIcon from '@mui/icons-material/AddBox';

import '../../stylesheets/Playlists.css';

export default function UploadTrackDialog({ playlistId }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [BPM, setBPM] = useState(1);
  const [musicKey, setMusicKey] = useState('C');
  const [file, setFile] = useState('');
  const [title, setTitle] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleBPMChange = (e) => {
    setBPM(e.target.value);
  };

  const handleKeyChange = (e) => {
    setMusicKey(e.target.value);
  };
  
  const onChooseTrack = (e) => {
    const file = e.currentTarget?.files[0];
    setFile(file?.name);
    let title = file?.name?.split(/\.(mp3|wav)/)[0].replace(/(-|_)/g, ' ').split(' ');
    title = title.map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`);
    setTitle(title.join(' '));
  };

  const onTitleChange = (e) => {
    const title = e.currentTarget.value;
    setTitle(title);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('playlistId', playlistId);
    try {
      await fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/upload`, {
        method: 'POST',
        cache: 'no-cache',
        body: formData
      });
    
      alert('Success');
    } catch (err) {
      alert(`Error: ${err}`);
    }    
  };

  const BPMs = Array.from(new Array(200), (el, index) => ++index);
  const Keys = ['Cm', 'C', 'C#m', 'C#', 'Dm', 'D', 'D#m', 'D#', 'Em', 'E', 'Fm', 'F', 'F#m', 'F#', 'Gm', 'G', 'G#m', 'G#', 'Am', 'A', 'A#m', 'A#', 'Bm', 'B'];

  return (
    <div style={{ marginLeft: 'auto' }}>
      <IconButton onClick={handleClickOpen} title="Add Track">
        <AddBoxIcon fontSize='medium' />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={onSubmit}>
          <DialogTitle>Upload Track</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="normal" id="title" name="title" label="Title" type="text" value={title} onChange={onTitleChange} fullWidth variant="standard" />
            <TextField autoFocus margin="normal" id="creators" name="creators" label="Creators" type="text" fullWidth variant="standard" />
            <TextField autoFocus margin="normal" id="genre" label="Genre" name="genre" type="text" fullWidth variant="standard" />
            <FormControl variant="standard" fullWidth margin="normal">
              <InputLabel id="track-music-key-label">Key</InputLabel>
              <Select
                labelId="track-music-key-label"
                id="track-music-key"
                value={musicKey}
                onChange={handleKeyChange}
                label="MusicKey"
                name="key"
              >
                {Keys.map((item, index) => <MenuItem key={`${item}_${index}`} value={item}>{item}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth margin="normal">
              <InputLabel id="track-bpm-label">BPM</InputLabel>
              <Select
                labelId="track-bpm-label"
                id="track-bpm"
                value={BPM}
                onChange={handleBPMChange}
                label="BPM"
                name="BPM"
              >
                {BPMs.map((item, index) => <MenuItem key={`${item}_${index}`} value={item}>{item}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth margin="normal">
              <InputLabel id="track-type-label">Type</InputLabel>
              <Select
                labelId="track-type-label"
                id="track-type"
                value={type}
                onChange={handleTypeChange}
                label="Type"
                name="type"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="beat">Beat</MenuItem>
                <MenuItem value="demo">Demo</MenuItem>
                <MenuItem value="loop">Loop</MenuItem>
              </Select>
            </FormControl>
            <div className="playlists__new-track">
              <Button variant="contained" component="label">
                Choose track
                <input id="uploadInput" type="file" name="file" onChange={onChooseTrack} hidden accept="audio/mp3" />
              </Button>
              <span className="playlists__new-track-name">{file}</span>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Upload</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
