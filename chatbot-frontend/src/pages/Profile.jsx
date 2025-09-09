import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Box, Paper, Typography, Avatar, Button } from '@mui/material';
import AnimatedBackground from '../components/AnimatedBackground';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatedBackground />
      <Paper elevation={8} sx={{ p: 5, borderRadius: 4, minWidth: 350, position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.95)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar src={user?.avatar} sx={{ width: 80, height: 80, mb: 2, bgcolor: '#0072ff', fontSize: 36 }} />
        <Typography variant="h5" fontWeight={700} color="#0072ff">{user?.name}</Typography>
        <Typography variant="subtitle1" color="text.secondary">{user?.email}</Typography>
        <Button variant="contained" color="error" sx={{ mt: 4, borderRadius: 2, fontWeight: 600 }} onClick={logout}>
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default Profile;
