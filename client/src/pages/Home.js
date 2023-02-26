import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import Typography from '@mui/material/Typography';

import SlideIcon from '../components/shared/SlideIcon';

import '../stylesheets/App.css';

export default function Home() {
  // #region state management
  const dispatch = useDispatch();
  const welcomeMessage = useSelector(state => state.welcomeMessage);
  const { user, isAuthenticated } = useAuth0();
  // #endregion state management

  // #region lifecycle methods
  useEffect(() => {
    fetch(`${process.env.REACT_APP_AWS_EC2_ENDPOINT}/api/welcome-message`)
      .then((res) => res.json())
      .then(data => dispatch({ type: 'SET_WELCOME_MESSAGE', message: data?.message }))
      .catch(err => console.log(err));
  }, []);
  // #endregion lifecycle methods

  return (
    <div className="app__wrap app__flex-column">
      <SlideIcon sx={{ display: 'flex', color: '#394149', height: '137px', width: '94px', margin: '50px' }} />
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 400 }}>
        {isAuthenticated ? `Welcome, ${user.name}.` : welcomeMessage}
      </Typography>
    </div >
  );
}