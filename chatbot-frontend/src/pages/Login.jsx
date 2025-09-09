import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, TextField, Paper, Typography, Box, Avatar } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AnimatedBackground from '../components/AnimatedBackground';

const Login = ({ onSwitch }) => {
  const { login, loading, googleSignIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatedBackground />
      <Paper elevation={8} sx={{ p: 5, borderRadius: 4, minWidth: 350, position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.9)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ width: 64, height: 64, mb: 1, bgcolor: '#0072ff' }} />
          <Typography variant="h5" fontWeight={700} color="#0072ff">Sign In</Typography>
        </Box>
        <form onSubmit={handleLogin}>
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5, fontWeight: 600, fontSize: 18, borderRadius: 2, background: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)', boxShadow: '0 4px 20px #0072ff44' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <Button startIcon={<GoogleIcon />} variant="outlined" color="primary" fullWidth sx={{ mt: 2, borderRadius: 2, fontWeight: 600 }} onClick={googleSignIn} disabled={loading}>
          Sign in with Google
        </Button>
        <Typography align="center" sx={{ mt: 2 }}>
          Don&apos;t have an account?{' '}
          <Button onClick={() => onSwitch('signup')} sx={{ color: '#0072ff', fontWeight: 700 }}>Sign Up</Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
