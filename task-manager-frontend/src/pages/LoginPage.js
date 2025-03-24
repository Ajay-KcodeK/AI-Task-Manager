import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(formData.email, formData.password);
      const { token, userId, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      console.log("Login Successful:", response.data);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 10, textAlign: "center" }}>
        <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Button onClick={() => navigate("/signup")} size="small">
              Sign Up
            </Button>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../services/api';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await loginUser(email, password);
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('userId', response.data.userId);
//       navigate('/dashboard');
//     } catch (error) {
//       alert('Login failed!');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type='email'
//         placeholder='Email'
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type='paswword'
//         placeholder='Password'
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;
