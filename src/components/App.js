import { useState } from 'react';
import Header from './Header.js';
import MainSection from './MainSection.js';
import Sidebar from './Sidebar.js';

import '../App.css';

import data from '../data/playlists.json';

function App() {
  const [currentTrack, setCurrentTrack] = useState({});

  return (
    <div className="app">
      <Header />
      <div className="app__wrap">
        <MainSection sections={ data.folders } onTrackClick={ setCurrentTrack } />
        <Sidebar currentTrack={ currentTrack } />
      </div>
    </div>
  );
}

export default App;
