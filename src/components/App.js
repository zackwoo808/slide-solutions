// import logo from './logo.svg';
import '../App.css';
import Header from './Header.js';
import Playlist from './Playlist.js';
import TrackInfo from './TrackInfo.js';
import { useState } from 'react';
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'

const TRACKS = [
  { id: 1, name: 'Fire Chorus', BPM: 120, musicKey: 'G#m', creator: '@yxshimusic', runtime: '1:21' },
  { id: 2, name: 'Trap Interlude', BPM: 160, musicKey: 'F', creator: '@nadav', runtime: '0:21' },
  { id: 3, name: 'Bridge 2', BPM: 90, musicKey: 'B', creator: '@yxshimusic', runtime: '1:16' },
  { id: 4, name: 'Background Vocals', BPM: 120, musicKey: 'Dm', creator: '@nadav', runtime: '0:45' },
]

function App() {
  const [currentTrack, setCurrentTrack] = useState();

  return (
    // <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Header />
        <div className="app__wrap">
          <Playlist userTracks={ TRACKS } onTrackClick={ setCurrentTrack } />
          <TrackInfo currentTrack={ currentTrack } />
        </div>
      </div>
    // </DndProvider>
  );
}

export default App;
