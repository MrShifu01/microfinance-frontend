import { Checkbox } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleColumn, togglePagination, toggleDelete } from '../redux/settingsSlice';

const SideBar = () => {
  const dispatch = useDispatch();

  // Get settings values from the Redux store
  const column = useSelector((state) => state.settings.column);
  const pagination = useSelector((state) => state.settings.pagination);
  const deletable = useSelector((state) => state.settings.delete);

  // Handler for toggling the column ordering setting
  const handleToggleColumn = () => {
    dispatch(toggleColumn());
  };

  // Handler for toggling the pagination setting
  const handleTogglePagination = () => {
    dispatch(togglePagination());
  };

  // Handler for toggling the delete setting
  const handleToggleDelete = () => {
    dispatch(toggleDelete());
  };

  return (
    <div>
      {/* Settings header */}
      <div className='font-bold mb-3'>Settings</div>

      {/* Column ordering setting */}
      <div className='flex items-center gap-2'>
        <Checkbox
          checked={column} // Checkbox checked state based on the column setting
          onClick={handleToggleColumn} // Handler for toggling the column setting
        />
        <span>Order Columns</span>
      </div>

      {/* Pagination setting */}
      <div className='flex items-center gap-2'>
        <Checkbox
          checked={pagination} // Checkbox checked state based on the pagination setting
          onClick={handleTogglePagination} // Handler for toggling the pagination setting
        />
        <span>Pagination</span>
      </div>

      {/* Delete setting */}
      <div className='flex items-center gap-2'>
        <Checkbox
          checked={deletable} // Checkbox checked state based on the delete setting
          onClick={handleToggleDelete} // Handler for toggling the delete setting
        />
        <span>Delete</span>
      </div>

    </div>
  );
};

export default SideBar;
