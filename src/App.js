// import logo from './logo.svg';
import './App.css';
import Playlist from './Playlist.js';
import TrackInfo from './TrackInfo.js';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <header className="app__header">
          <h1>Slide Solutions</h1>
        </header>
        <div className="app__wrap">
          <Playlist />
          <TrackInfo />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
