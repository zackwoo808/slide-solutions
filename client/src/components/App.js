import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './shared/Header';
import Playlists from './playlists/Playlists';

import '../stylesheets/App.css';

import { useEffect } from 'react';

function App() {
  const [welcomeMessage, setWelcomeMessage] = useState();
  const [currentPlaylists, setCurrentPlaylists] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/api/welcome-message`)
      .then((res) => res.json())
      .then(data => setWelcomeMessage(data.message))
      .catch(err => console.log(err));

    const queryParams = new URLSearchParams(window.location.search);
    fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/playlists/${queryParams.get('userId') || 2}`)
      .then(res => res.json())
      .then(data => setCurrentPlaylists(data?.playlists))
      .catch(err => console.log(err));
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
              <Playlists
                playlists={ currentPlaylists }
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
