import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser, setTempUser } from '../redux/userSlice';
import { Link, Navigate } from 'react-router-dom'
import { Checkbox, FormControlLabel } from '@mui/material';
import { setPage } from "../redux/pageSlice";
import { setToken } from '../redux/tokenSlice';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [rememberMe, setRememberMe] = useState(false); // State for the Checkbox

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(setPage('login')); // Set the page in the Redux store to 'login' when the component mounts
    }, [dispatch]);

    const handleLogin = async (ev, email, password) => {
        ev.preventDefault()
        try {
            const response = await axios.post('/users/login', {
              email,
              password
          })
              // Check if rememberMe is checked and dispatch accordingly
            if (rememberMe) {
              // Dispatch an action for rememberMe being checked
              dispatch(setUser(response.data));
            } else {
              // Dispatch an action for rememberMe being unchecked
              dispatch(setTempUser(response.data));
            }
            dispatch(setToken(response.data.token))
          setRedirect(true)
        } catch (error) {
          alert("Username or Password is incorrect, Try again.")
        }
    }

    if (redirect) {
      return <Navigate to='/'/>
    }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      className='mx-auto mt-10'
    >
      <div className='flex flex-col'>
        <h2 className='text-2xl font-bold text-center mb-4'>Login</h2>
        <TextField
          required
          id="outlined-required"
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          required
          id="outlined-disabled"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <FormControlLabel
          className='flex justify-center'
          label="Remember me?"
          labelPlacement="start"
          control={<Checkbox checked={rememberMe} onChange={ev => setRememberMe(ev.target.checked)} />}
        />
        <button className='bg-blue-500 py-1 px-3 w-20 mx-auto rounded-lg my-2' onClick={ev => handleLogin(ev, email, password)}>Login</button>
      </div>
      <p className='text-center text-sm text-gray-500'>Don't have an account? <Link to='/register' className='mx-2 underline text-black'>Register</Link></p>
      
      {/* For App testing Only */}
      <div className="my-6 border border-gray-500 p-4">
        <h2 className="text-sm font-semibold mb-2">Example Users:</h2>
        <ul className="list-disc ml-6">
          <li>
            <span className="font-semibold">Email:</span> johndoe@gmail.com
            <br />
            <span className="font-semibold">Password:</span> johndoe
            <br />
            <span className="font-semibold">Role:</span> Not Admin
          </li>
          <li className="mt-4">
            <span className="font-semibold">Email:</span> janesmith@gmail.com
            <br />
            <span className="font-semibold">Password:</span> janesmith
            <br />
            <span className="font-semibold">Role:</span> Admin
          </li>
        </ul>
      </div>

    </Box>
  );
}