import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './Header.js';
import MainSection from './MainSection.js';
import Sidebar from './Sidebar.js';

import '../App.css';

import data from '../data/playlists.json';

function App() {
  const [currentPlaylist, setCurrentPlaylist] = useState();

  const onPlaylistClick = (playlist) => {
    if (!playlist) {
      return;
    }
    
    setCurrentPlaylist(playlist);
  };

  return (
    <Router>
      <div className="app">
        <Header />
          <Routes>
            <Route exact path='/' element={<div>hi</div>}></Route>
            <Route exact path='/library' element={
              <div className="app__wrap">
                <MainSection sections={ data.folders } onTrackClick={ setCurrentPlaylist } onPlaylistClick={onPlaylistClick} />
                <Sidebar playlist={ currentPlaylist } />
              </div>
            }></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
