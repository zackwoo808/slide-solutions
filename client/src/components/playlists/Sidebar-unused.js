// not currently used
import { useEffect, useState } from 'react';
import logo from '../../logo.png';
import Upload from './Upload';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function Sidebar({playlist}) {
  const [currentPlaylist, setCurrentPlaylist] = useState(playlist);

  useEffect(() => {
    setCurrentPlaylist(playlist);
  }, [playlist]);

  return (
    <div className="app__info" style={{ overflow: 'scroll' }}>
      {currentPlaylist ?
        <div>
          <Upload />
          <List sx={{ paddingLeft: '10px', width: '100%' }}>
            {currentPlaylist.map((track, index) => (
              <ListItem key={index} className='sidebar__track' sx={{
                fontWeight: '700',
              }}>{track.name}</ListItem>
            ))}
          </List>
        </div>
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
