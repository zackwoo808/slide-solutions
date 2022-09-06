import { useEffect, useState } from 'react';
import logo from '../logo.png';
import Upload from './Upload';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const Sidebar = ({playlist = []}) => {
  const [currentPlaylist, setCurrentPlaylist] = useState(playlist);

  useEffect(() => {
    setCurrentPlaylist(playlist);
  }, [playlist]);

  return (
    <div className="app__info" style={{ overflow: 'scroll' }}>
      <Upload />
      {currentPlaylist ?
            <List sx={{ paddingLeft: '10px', width: '100%' }}>
            {currentPlaylist.map((track, index) => (
              <ListItem key={index} sx={{
                borderTop: '1px solid rgba(0, 0, 0, 0.25)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
                fontWeight: '700',
              }}>{track.name}</ListItem>
            ))}
          </List>
        :
        <img
          className="app__info-logo"
          src={ `${logo}` }
          alt="Slide"
        ></img>
      }
    </div>
 );
};

export default Sidebar;