import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Login } from '../graphql/mutation';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const [login, { loading, error }] = useMutation(Login);

  const handleLogin = async () => {
    try {
      const graphqlResponse = await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      console.log(graphqlResponse)
      if (graphqlResponse.data.login.token) {
        window.localStorage.setItem(
            'token',
            JSON.stringify(graphqlResponse.data.login.token),
        );
        window.location.reload();
      }
      navigate('/styles');
    } catch (e) {
      console.log(e);
    }
  };

  return (
      <div style={{ height: '100vh', background: 'peachpuff' }} className="d-flex justify-content-center align-items-center">
        <div className="card p-3" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="h3 text-center mb-4">Admin Login</div>
          <div className="card-body d-flex flex-column">
            <TextField
                fullWidth
                className="mb-3"
                id="filled-basic"
                label="Email"
                variant="filled"
                name="email"
                onChange={handleInputChange}
            />
            <TextField
                fullWidth
                className="mb-3"
                id="filled-basic"
                label="Password"
                variant="filled"
                type={data.showPassword ? 'text' : 'password'}
                name="password"
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePasswordVisibility}>
                          {data.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                  ),
                }}
            />
            <Button onClick={handleLogin} variant="contained" color="primary">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            {error && <div className="text-danger mt-2">Login failed. Please check your credentials.</div>}
          </div>
        </div>
      </div>
  );
}
