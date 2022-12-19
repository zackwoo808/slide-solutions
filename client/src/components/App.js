import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './shared/Header';

import Friends from '../pages/Friends';
import Home from '../pages/Home';
import Messages from '../pages/Messages';
import Playlists from '../pages/Playlists';

import '../stylesheets/App.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/playlists' element={<Playlists />} />
          <Route exact path='/messages' element={<Messages />} />
          <Route exact path='/friends' element={<Friends />} />
        </Routes>
      </div>
    </Router>
  );
};
