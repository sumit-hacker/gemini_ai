
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatScreen from './pages/ChatScreen';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Fade } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';

const Navigation = ({ screen, setScreen }) => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <Fade in>
      <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)', boxShadow: '0 4px 20px #0072ff44' }}>
        <Toolbar>
          <ChatIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Gemini AI Chatbot
          </Typography>
          <Button color="inherit" onClick={() => setScreen('chat')} sx={{ fontWeight: screen==='chat'?800:500, textShadow: screen==='chat'?'0 2px 8px #fff8':'none' }}>
            Chat
          </Button>
          <IconButton color={screen==='profile'?'secondary':'inherit'} onClick={() => setScreen('profile')}>
            <PersonIcon />
          </IconButton>
          <IconButton color={screen==='settings'?'secondary':'inherit'} onClick={() => setScreen('settings')}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Fade>
  );
};

function MainApp() {
  const { user } = useAuth();
  const [screen, setScreen] = useState('chat');
  const [authScreen, setAuthScreen] = useState('login');

  if (!user) {
    return authScreen === 'login' ? <Login onSwitch={setAuthScreen} /> : <Signup onSwitch={setAuthScreen} />;
  }

  let content;
  if (screen === 'chat') content = <ChatScreen />;
  else if (screen === 'profile') content = <Profile />;
  else if (screen === 'settings') content = <Settings />;

  return (
    <Box>
      <Navigation screen={screen} setScreen={setScreen} />
      {content}
    </Box>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
