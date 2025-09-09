import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import AnimatedBackground from './AnimatedBackground';

const Onboarding = ({ onStart }) => (
  <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <AnimatedBackground />
    <Paper elevation={10} sx={{ p: 6, borderRadius: 5, minWidth: 400, background: 'rgba(255,255,255,0.97)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', textAlign: 'center', zIndex: 1 }}>
      <Typography variant="h3" fontWeight={900} color="#0072ff" mb={2}>
        Welcome to Gemini AI Chatbot
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={4}>
        Your smart assistant powered by Google Gemini AI. Chat, ask questions, and get instant answers with a beautiful, modern interface.
      </Typography>
      <Button variant="contained" size="large" sx={{ fontWeight: 700, fontSize: 20, borderRadius: 3, background: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)', boxShadow: '0 4px 20px #0072ff44', px: 5, py: 1.5 }} onClick={onStart}>
        Get Started
      </Button>
    </Paper>
  </Box>
);

export default Onboarding;
