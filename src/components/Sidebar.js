import { useEffect, useState } from 'react';
import logo from '../logo.png';
import Upload from './Upload';

const Sidebar = ({playlist}) => {
  const [currentPlaylist, setCurrentPlaylist] = useState(playlist);

  useEffect(() => {
    setCurrentPlaylist(currentPlaylist);
  }, [currentPlaylist]);

  return (
    <div className="app__info">
      <Upload />
      {Array.isArray(currentPlaylist) ?
        currentPlaylist.map((track) => <div>track.name</div>)
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