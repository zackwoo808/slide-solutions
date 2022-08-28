// import logo from './logo.svg';
import './App.css';
import Playlist from './Playlist.js';
import TrackInfo from './TrackInfo.js';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Slide Solutions</h1>
      </header>
      <div className="app__wrap">
        <Playlist />
        <TrackInfo />
      </div>
    </div>
  );
}

export default App;
