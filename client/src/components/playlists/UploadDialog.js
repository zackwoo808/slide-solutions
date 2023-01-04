// currently unused
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

export default function Upload() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [BPM, setBPM] = useState(1);
  const [musicKey, setMusicKey] = useState('C');

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

  const BPMs = Array.from(new Array(200), (el, index) => ++index);
  const Keys = ['Cm', 'C', 'C#m', 'C#', 'Dm', 'D', 'D#m', 'D#', 'Em', 'E', 'Fm', 'F', 'F#m', 'F#', 'Gm', 'G', 'G#m', 'G#', 'Am', 'A', 'A#m', 'A#', 'Bm', 'B'];

  return (
    <div style={{ marginLeft: 'auto' }}>
      <IconButton onClick={handleClickOpen} title="Add Track">
        <AddBoxIcon fontSize='medium' />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Track</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="normal" id="title" label="Title" type="text" fullWidth variant="standard" />
          <TextField autoFocus margin="normal" id="creators" label="Creators" type="text" fullWidth variant="standard" />
          <TextField autoFocus margin="normal" id="genre" label="Genre" type="text" fullWidth variant="standard" />
          <FormControl variant="standard" fullWidth margin="normal">
            <InputLabel id="track-music-key-label">Key</InputLabel>
            <Select
              labelId="track-music-key-label"
              id="track-music-key"
              value={musicKey}
              onChange={handleKeyChange}
              label="MusicKey"
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
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="beat">Beat</MenuItem>
              <MenuItem value="demo">Demo</MenuItem>
              <MenuItem value="loop">Loop</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" component="label" sx={{ marginTop: '20px' }}>
            Choose track
            <input id="uploadInput" hidden accept="audio/mp3" type="file" />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
