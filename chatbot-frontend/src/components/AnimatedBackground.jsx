import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
      filter: 'blur(40px)',
    }}
  />
);

export default AnimatedBackground;
