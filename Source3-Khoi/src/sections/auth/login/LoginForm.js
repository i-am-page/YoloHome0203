import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { text } from '@fortawesome/fontawesome-svg-core';
import { jwtDecode } from 'jwt-decode';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const initValue = {username: "", password: ""}
  const [formVal, setFormVal] = useState(initValue)
  const [showPassword, setShowPassword] = useState(false);

  // const handleClick = () => {
  //   navigate('/dashboard', { replace: true });
  //   return;
  // };

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormVal({...formVal, [name]: value})
  }

  function handleClick(e) {
    e.preventDefault()
    fetch("http://localhost:8080/account/authenticate", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Method": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      },
      body: JSON.stringify(formVal),
    })
      .catch((err) => {return})
      .then((res) => {
        if (!res || !res.ok || res.status > 400) {
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        var decoded = jwtDecode(data.token)
        localStorage.setItem("user", decoded.username)
        navigate('/dashboard', { replace: true });
      })
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField name="username" label="Email address" onChange={handleChange}/>
 
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)} onMouseLeave={()=>setShowPassword(false)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleChange}/>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <span><Checkbox name="remember" label="Remember Me"></Checkbox>Remember Me</span>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
