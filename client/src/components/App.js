import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './shared/Header';
import MainSection from './library/MainSection';
import Sidebar from './library/Sidebar';
import TestStreaming from './home/TestStreaming';

import '../App.css';

import data from '../data/playlists.json';
import { useEffect } from 'react';

function App() {
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [welcomeMessage, setWelcomeMessage] = useState();
  const [currentTracks, setCurrentTracks] = useState();

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

    fetch('/audio')
      .then(res => res.json())
      .then(data => setCurrentTracks(data?.tracks));
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route exact path='/' element={
            <TestStreaming welcomeMessage={welcomeMessage} currentTracks={currentTracks} />
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
