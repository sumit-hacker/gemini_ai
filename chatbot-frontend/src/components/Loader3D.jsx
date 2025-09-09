import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const Loader3D = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
      style={{
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: 1000,
      }}
    >
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #fff 0%, #00c6ff 100%)',
          boxShadow: '0 2px 8px #0072ff33',
        }}
      />
    </motion.div>
  </Box>
);

export default Loader3D;
