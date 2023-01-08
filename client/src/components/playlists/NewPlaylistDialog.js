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

export default function NewPlaylistDialog({ handlePlaylistCreate }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const title = e.currentTarget[0]?.value;
      await handlePlaylistCreate(title);
      handleClose();
    } catch {
      handleClose();
    }
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} title="Add Playlist">
        <PlaylistAddIcon fontSize='medium' />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleCreate}>
          <DialogTitle>New Playlist</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="normal" id="addPlaylistTitle" label="Title" type="text" fullWidth variant="standard" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
