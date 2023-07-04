import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/pageSlice';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = useSelector((state) => state.user.data);
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setPage('change-password')); // Set the page in the Redux store to 'change-password' when the component mounts
  }, [dispatch]);

  const handleChangePassword = async (ev, newPassword, confirmPassword) => {
    ev.preventDefault();

    try {
      // Validate password and confirmPassword
      if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        throw new Error('Passwords do not match');
      }

      if (newPassword.length < 6) {
        alert('Password must be at least 6 characters long');
        throw new Error('Password must be at least 6 characters long');
      }

      // Send request to update password
      await axios.put(`/users/${user._id}`, { newPassword, confirmPassword });
      setRedirect(true);

      // Handle successful password update
      // Display success message or perform any other necessary actions
    } catch (error) {
      // Handle error
      console.log(error.message);
    }
  };

  if (redirect) {
    return <Navigate to="/" />; // Redirect to the home page if the password change is successful
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      className="mx-auto mt-32"
    >
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-4">Change Password</h2>
        <TextField
          required
          id="outlined-required"
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          required
          id="outlined-disabled"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 py-1 px-3 w-20 mx-auto rounded-lg my-2"
          onClick={(ev) => handleChangePassword(ev, newPassword, confirmPassword)}
        >
          Submit
        </button>
      </div>
    </Box>
  );
}
