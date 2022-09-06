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
    <div className="app__info">
      <Upload />
      {currentPlaylist ?
            <List sx={{ flexBasis: '85%', overflow: 'scroll', paddingLeft: '10px' }}>
            {currentPlaylist.map((track, index) => (
              <ListItem key={index}>{track.name}</ListItem>
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