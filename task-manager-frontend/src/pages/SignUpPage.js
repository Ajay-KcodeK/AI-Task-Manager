import { PersonAdd } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api'; // Import API function

const roles = ['Admin', 'User'];

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role: 'User',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await registerUser(formData); // API call
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth='xs'>
      <Paper elevation={3} sx={{ p: 4, mt: 10, textAlign: 'center' }}>
        <Avatar sx={{ bgcolor: 'secondary.main', mx: 'auto', mb: 2 }}>
          <PersonAdd />
        </Avatar>
        <Typography variant='h5' gutterBottom>
          Sign Up
        </Typography>

        {error && <Alert severity='error'>{error}</Alert>}
        {success && <Alert severity='success'>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Full Name'
            variant='outlined'
            name='userName'
            value={formData.name}
            onChange={handleChange}
            margin='normal'
            required
          />
          <TextField
            fullWidth
            label='Email'
            variant='outlined'
            name='email'
            value={formData.email}
            onChange={handleChange}
            margin='normal'
            required
            type='email'
          />
          <TextField
            fullWidth
            label='Password'
            type='password'
            variant='outlined'
            name='password'
            value={formData.password}
            onChange={handleChange}
            margin='normal'
            required
          />
          <TextField
            select
            fullWidth
            label='Role'
            variant='outlined'
            name='role'
            value={formData.role}
            onChange={handleChange}
            margin='normal'
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
          <Typography variant='body2' sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Button onClick={() => navigate('/login')} size='small'>
              Login
            </Button>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
