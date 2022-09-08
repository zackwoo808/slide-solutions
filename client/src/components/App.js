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
import { useEffect } from 'react';

function App() {
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [welcomeMessage, setWelcomeMessage] = useState();

  const onPlaylistClick = (playlist) => {
    if (!playlist) {
      return;
    }
    
    setCurrentPlaylist(playlist);
  };

  useEffect(() => {
    fetch('/api/welcome-message')
      .then((res) => res.json())
      .then(data => setWelcomeMessage(data.message));
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route exact path='/' element={
            <div className="app__wrap">{welcomeMessage}</div>
          }></Route>
          <Route exact path='/library' element={
            <div className="app__wrap">
              <MainSection sections={ data.folders } onTrackClick={ setCurrentPlaylist } onPlaylistClick={onPlaylistClick} />
              <Sidebar playlist={ currentPlaylist } />
            </div>
          }></Route>
          <Route exact path='/add-tracks' element={
              <div className="app__wrap">add some 🔥🔥🔥🔥 tracks!</div>
          }></Route>
          <Route exact path='/messages' element={
              <div className="app__wrap">messages!</div>
          }></Route>
          <Route exact path='/friends' element={
              <div className="app__wrap">friends!</div>
          }></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
