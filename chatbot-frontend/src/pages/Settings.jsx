import React, { useState } from 'react';
import { Box, Paper, Typography, Switch, FormControlLabel, Button } from '@mui/material';
import AnimatedBackground from '../components/AnimatedBackground';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatedBackground />
      <Paper elevation={8} sx={{ p: 5, borderRadius: 4, minWidth: 350, position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.95)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight={700} color="#00c6ff" mb={2}>Settings</Typography>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="primary" />}
          label="Dark Mode"
        />
        <FormControlLabel
          control={<Switch checked={notifications} onChange={() => setNotifications(!notifications)} color="primary" />}
          label="Enable Notifications"
        />
        <Button variant="contained" color="primary" sx={{ mt: 3, borderRadius: 2, fontWeight: 600 }} disabled>
          Save Changes
        </Button>
      </Paper>
    </Box>
  );
};

export default Settings;
