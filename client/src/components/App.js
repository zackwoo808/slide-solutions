import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './shared/Header';
import MainSection from './library/MainSection';

import '../App.css';

import { useEffect } from 'react';

function App() {
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [welcomeMessage, setWelcomeMessage] = useState();
  // const [currentTracks, setCurrentTracks] = useState();
  const [currentPlaylists, setCurrentPlaylists] = useState();

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

    const queryParams = new URLSearchParams(window.location.search);
    fetch(`/playlists/${queryParams.get('userId')}`)
      .then(res => res.json())
      .then(data => setCurrentPlaylists(data?.playlists));
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route exact path='/' element={
              <div className="app__wrap">{ welcomeMessage }</div>
          }></Route>
          <Route exact path='/playlists' element={
            <div className="app__wrap">
              <MainSection
                playlists={ currentPlaylists }
                onPlaylistClick={ onPlaylistClick }
                currentPlaylist={currentPlaylist}
              />
            </div>
          }></Route>
          <Route exact path='/tracks' element={
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
