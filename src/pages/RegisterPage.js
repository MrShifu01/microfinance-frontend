import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import { Link, Navigate } from 'react-router-dom';
import { setPage } from "../redux/pageSlice";

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [redirect, setRedirect] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(setPage('register')); // Set the page in the Redux store to 'register' when the component mounts
    }, [dispatch]);

    // Function to handle registering a user
    const handleRegister = async (ev, name, email, password) => {
        ev.preventDefault()

        // Check if it is a gmail account
        if (!email.endsWith('@gmail.com')) {
          alert('Email must be a gmail address');
          return;
        }

        // Check if password is longer than 5 characters
        if (password.length < 6) {
          alert('Password must be more than 5 characters');
          return;
        }

        try {
          const response = await axios.post('/users/register', {
            name,  
            email,
            password
          })
          dispatch(setUser(response.data))
          setRedirect(true)

        } catch (error) {
          alert("fail")
        }
    }

    if(redirect) {
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
      className='mx-auto mt-32'
    >
      <div className='flex flex-col'>
        <h2 className='text-2xl font-bold text-center mb-4'>Register</h2>
        <TextField
          required
          id="outlined-required"
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Email (Must be Gmail)"
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
        <button className='bg-blue-500 py-1 px-3 w-20 mx-auto rounded-lg my-2' onClick={ev => handleRegister(ev, name, email, password)}>Register</button>
      </div>
      <p className='text-center text-sm text-gray-500'>Already have an account? <Link to='/login' className='mx-2 underline text-black'>Login</Link></p>
    </Box>
  );
}