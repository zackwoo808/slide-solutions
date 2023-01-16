import { withAuthenticationRequired } from '@auth0/auth0-react';

import '../stylesheets/App.css';

export default withAuthenticationRequired(function Friends() {
  return (
    <div className="app__wrap">friends!</div>
  );
});