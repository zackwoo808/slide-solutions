import { withAuthenticationRequired } from '@auth0/auth0-react';

import '../stylesheets/App.css';

export default withAuthenticationRequired(function Messages() {
  return (
    <div className="app__wrap">messages!</div>
  );
});