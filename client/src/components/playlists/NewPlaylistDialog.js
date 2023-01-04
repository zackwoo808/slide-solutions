// currently unused
import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export default function NewPlaylistDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} title="Add Playlist">
        <PlaylistAddIcon fontSize='medium' />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Playlist</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="normal" id="title" label="Title" type="text" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
