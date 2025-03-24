import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../assets/landing-bg.jpg'; // Add a background image

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        p: 2,
      }}
    >
      <Container maxWidth='md'>
        <Paper
          elevation={5}
          sx={{ p: 5, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 3 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ color: "#ffffff", textShadow: "2px 2px 8px rgba(0,0,0,0.7)", fontWeight: "bold" }}
             >
           🚀 AI-Powered Task Manager
             </Typography>

            <Typography variant='h6' color='white' paragraph>
              Stay organized with AI-powered automation and intelligent
              suggestions. Enhance productivity with smart task recommendations.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Box sx={{ mt: 4 }}>
              <Button
                variant='contained'
                color='secondary'
                sx={{
                  mx: 1,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.2rem',
                  borderRadius: 2,
                }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                sx={{
                  mx: 1,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.2rem',
                  borderRadius: 2,
                  borderWidth: 2,
                }}
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </Box>
          </motion.div>
        </Paper>
      </Container>
    </Box>
  );
};

export default LandingPage;
