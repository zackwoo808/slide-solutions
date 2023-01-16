import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SlideIcon from './SlideIcon';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const pages = [
  { component: HomeIcon, route: '/' },
  { component: LibraryMusicIcon, route: '/playlists' },
  { component: ForumRoundedIcon, route: '/messages' },
  { component: Diversity3Icon, route: '/friends' },
];

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

const LogoutButton = ({ handleCloseUserMenu }) => {
  const { logout } = useAuth0();

  return (
    <Button onClick={() => {
      logout({ returnTo: window.location.origin });
      handleCloseUserMenu();
    }}>
      Log Out
    </Button >
  );
};

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, isAuthenticated, isLoading } = useAuth0();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', color: '#394149' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SlideIcon sx={{
            display: { xs: 'none', md: 'flex' },
            mr: 1,
            color: '#394149',
          }} />
          <Typography
            variant="h1"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto',
              fontWeight: 700,
              fontSize: '16px',
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Slide
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => {
                const MenuIcon = page.component;
                return (
                  <Button component={RouterLink} to={page.route} key={index} sx={{ my: 2, color: '#394149', display: 'flex' }}>
                    <MenuIcon sx={{ color: '#394149' }} />
                  </Button>
                );
              })}
            </Menu>
          </Box>
          <Box sx={{ justifyContent: 'center', flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Typography
              variant="h1"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                fontWeight: 700,
                fontSize: '16px',
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                alignItems: 'center',
              }}
            >
              <SlideIcon sx={{
                mr: 1,
                color: '#394149',
              }} />
              <p>Slide</p>
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => {
              const MenuIcon = page.component;
              return (
                <Button component={RouterLink} to={page.route} key={index} sx={{ my: 2, color: '#394149', display: 'flex' }}>
                  <MenuIcon sx={{ color: '#394149' }} />
                </Button>
              );
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button>
              <SearchOutlinedIcon />
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ?
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={`${user.nickname}`} src={`${user.picture}`} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem><LogoutButton handleCloseUserMenu={handleCloseUserMenu} /></MenuItem>
                </Menu>
              </>
              : <LoginButton />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
