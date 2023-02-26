import { withAuthenticationRequired } from '@auth0/auth0-react';

import PlaylistsComponent from '../components/playlists/Playlists';
import '../stylesheets/App.css';

export default withAuthenticationRequired(function Playlists() {
  return (
    <div className="app__wrap">
      <PlaylistsComponent />
    </div>
  );
});