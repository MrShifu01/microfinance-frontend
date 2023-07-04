import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Delete } from '@mui/icons-material';

export const EditModal = ({ open, onClose }) => {
  const [users, setUsers] = useState([]); // State for storing the list of users
  const user = useSelector((state) => state.user.data); // Get the logged-in user data from the Redux store

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('/users'); // Fetch the users from the API endpoint '/users'
        setUsers(response.data); // Update the state with the fetched users
      } catch (error) {
        console.error('Error retrieving users:', error);
        // Handle error retrieving users
      }
    };
    getUsers();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.put('/users', users); // Send a PUT request to the API endpoint '/users' to update user data
      onClose();
      alert('User data saved!');
    } catch (error) {
      console.error('Error saving user data:', error);
      // Handle error saving user data
    }
  };

  const handleInputChange = (event, userId) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        return {
          ...user,
          isAdmin: event.target.value === 'True',
        };
      }
      return user;
    });
    setUsers(updatedUsers); // Update the state with the modified user data
  };

  const handleDeleteUser = async (userId) => {
    if (!user.isAdmin) {
      // Show alert if user is not admin
      alert('You do not have authorization to delete a user.');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) {
      return; // User canceled the deletion
    }

    try {
      await axios.delete(`/users/${userId}`); // Send a DELETE request to the API endpoint '/users/{userId}' to delete a user
      const updatedUsers = users.filter((user) => user._id !== userId); // Filter out the deleted user from the state
      setUsers(updatedUsers); // Update the state with the updated list of users
      alert('User deleted successfully!');
    } catch (error) {
      console.log('Error deleting user:', error);
      // Handle error deleting user
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Users</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {/* Render the list of users */}
            {users.length > 0 && users.map((user) => (
              <div key={user._id}>
                <div>{user.name}</div>
                <div>{user.email}</div>
                {/* Select dropdown for changing user's isAdmin status */}
                <select
                  value={user.isAdmin ? 'True' : 'False'}
                  onChange={(event) => handleInputChange(event, user._id)}
                >
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
                {/* Button to delete a user */}
                <Button onClick={() => handleDeleteUser(user._id)}>
                  <Delete />
                </Button>
              </div>
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
