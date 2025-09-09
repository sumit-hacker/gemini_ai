import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, IconButton, Avatar, TextField, Button, Fade } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AnimatedBackground from '../components/AnimatedBackground';
import { useAuth } from '../contexts/AuthContext';
import { sendMessage, listenToMessages } from '../services/firestore';
import { getGeminiResponse } from '../services/gemini';

const ChatScreen = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef(null);

  // Listen to Firestore chat messages
  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = listenToMessages(user.uid, setMessages);
    return () => unsubscribe && unsubscribe();
  }, [user]);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !user?.uid) return;
    setSending(true);
    // 1. Save user message
    await sendMessage(user.uid, input, 'user');
    setInput('');
    // 2. Prepare chat history for Gemini API
    const chatHistory = messages
      .filter(m => m.sender === 'user' || m.sender === 'ai')
      .map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));
    chatHistory.push({ role: 'user', parts: [{ text: input }] });
    // 3. Get Gemini AI response
    try {
      const aiText = await getGeminiResponse(chatHistory);
      await sendMessage(user.uid, aiText, 'ai');
    } catch (e) {
      await sendMessage(user.uid, 'Sorry, Gemini AI is unavailable.', 'ai');
    }
    setSending(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
      <AnimatedBackground />
      <Paper elevation={10} sx={{ width: '100%', maxWidth: 500, minHeight: 600, borderRadius: 5, p: 3, background: 'rgba(255,255,255,0.95)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={user?.avatar} sx={{ mr: 2, bgcolor: '#0072ff' }} />
          <Typography variant="h6" fontWeight={700} color="#0072ff">Gemini AI Chat</Typography>
        </Box>
        <Box sx={{ flex: 1, overflowY: 'auto', mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {messages.length === 0 && (
            <Fade in timeout={600}>
              <Box sx={{ color: '#aaa', textAlign: 'center', mt: 4 }}>
                Start the conversation!
              </Box>
            </Fade>
          )}
          {messages.map((msg, idx) => (
            <Fade in key={msg.id || idx} timeout={600}>
              <Box sx={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <Box sx={{
                  px: 2, py: 1, borderRadius: 3, maxWidth: '80%',
                  background: msg.sender === 'user' ? 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)' : '#f1f1f1',
                  color: msg.sender === 'user' ? '#fff' : '#222',
                  boxShadow: msg.sender === 'user' ? '0 2px 8px #0072ff33' : '0 1px 4px #aaa2',
                  fontWeight: 500,
                  fontSize: 17
                }}>
                  {msg.text}
                </Box>
              </Box>
            </Fade>
          ))}
          <div ref={chatEndRef} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            disabled={sending}
            sx={{ background: '#f7faff', borderRadius: 2 }}
          />
          <IconButton color="primary" onClick={handleSend} disabled={sending || !input.trim()} sx={{ background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', color: '#fff', borderRadius: 2, boxShadow: '0 2px 8px #0072ff33' }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatScreen;
