import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Box,
  MenuItem,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { MaterialReactTable } from 'material-react-table';
import { setClients } from '../redux/clientsSlice';
import LoanTable from './LoanTable';
import LoadingSpinner from './LoadingSpinner';
import { CreateNewClientModal } from './CreateNewClientModal';

const ClientTable = () => {
  // Setting local state variables
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Fetching redux state variables
  const user = useSelector((state) => state.user.data);
  const columnSetting = useSelector((state) => state.settings.column);
  const paginationSetting = useSelector((state) => state.settings.pagination);
  const deleteSetting = useSelector((state) => state.settings.delete);
  const badLenderChoice = ['true', 'false'];

  const dispatch = useDispatch();

  // Use Effect hook to fetch data from database on component initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/clients');
        const fetchedData = response.data;
        dispatch(setClients(fetchedData))
        setTableData(fetchedData);
        setLoading(false)
      } catch (error) {
        console.log('Error fetching client data:', error);
      }
    };
  
    fetchData();
  }, [dispatch]);

  // Function to handle creating a new row/client and adding it to the database throught the api
  const handleCreateNewRow = async (values) => {
    if (!user.isAdmin) {
      // Show alert if user is not admin
      alert('You do not have authorization to create a new client.')
      return;
    }
  
    // Making sure that an added lender is always classified as a good lender
    const modifiedValues = { ...values, badLender: false };
  
    try {
      const response = await axios.post('/clients', modifiedValues);
      const createdClient = response.data;
      setTableData([...tableData, createdClient]);
      setCreateModalOpen(false);
    } catch (error) {
      console.log('Error creating client', error);
    }
  };
  
  // Function to handle an edit of a client record
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      if (!user.isAdmin) {
        // Show alert if user is not admin
        alert('You do not have authorization to edit a client.')
        return;
      }
      
      try {
        const updatedValues = { id: row.original._id, ...values };
  
        // Make the API request to update the client data
        await axios.put('/clients', updatedValues);
        // Update the local table data and exit editing mode
        const updatedTableData = [...tableData]; // Create a copy of the tableData array
        updatedTableData[row.index] = { ...row.original, ...values }; // Update the specific row with the new values, including the _id
        setTableData(updatedTableData);
        exitEditingMode(); // Required to exit editing mode and close modal
      } catch (error) {
        console.log('Error updating client data:', error);
        // Handle the error accordingly (e.g., display an error message)
      }
    }
  };
  
  // set Validation errors to empty object when cancelling an edit
  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  // Function to handle the deleting of a client
  const handleDeleteClient = async (clientId) => {
    
    if (!user.isAdmin) {
      // Show alert if user is not admin
      alert('You do not have authorization to delete a client.')
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this client?');
    if (!confirmDelete) {
      return; // User canceled the deletion
    }
  
    try {
      await axios.delete(`/clients/${clientId}`);
      const updatedTableData = tableData.filter(client => client._id !== clientId);
      setTableData(updatedTableData);
    } catch (error) {
      console.log('Error deleting client:', error);
    }
  };

  // Assigning the columns and their various attributes for the table
  const columns = [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150
      },
      {
        accessorKey: 'idNumber',
        header: 'ID Number',
        size: 150,
      },
      {
        accessorKey: 'bank',
        header: 'Bank',
        size: 150,
      },
      {
        accessorKey: 'accNumber',
        header: 'Account Number',
        size: 150,
      },
      {
        accessorKey: 'salaryDate',
        header: 'Salary Date',
        size: 150,
      },
      {
        accessorKey: 'phone',
        header: 'Phone Number',
        size: 150,
      },
      {
        accessorKey: 'badLender',
        header: 'Bad Lender',
        size: 150,
        type: "boolean",
        // Allow a choice of 'true' or 'false' as a dropdown option in editing a client
        muiTableBodyCellEditTextFieldProps: () => ({
          children: badLenderChoice.map(choice => (
            <MenuItem key={choice} value={choice}>
              {choice}
            </MenuItem>
          )),
          select: true
        }),
        // Color the cell if a lender is bad
        Cell: ({ row }) => (
          <div>
            {row.original.badLender && (
              <span className='bg-red-500 p-2 rounded-lg'>Bad Lender</span>
            )}
          </div>
        )
      },
      
      {
        accessorKey: 'office',
        header: 'Office',
        size: 150,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 100,
      },
      {
        accessorKey: 'industry',
        header: 'Industry',
        size: 150,
      },
      {
        accessorKey: 'notes',
        header: 'Notes',
        size: 150,
      },
    ]

    // If the table is loading, return the spinner component
  if(loading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <>
      {/* Render the Material React Table with its various arguments */}
      <MaterialReactTable
        // Customization for displaying column options
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={columns} // Columns configuration
        data={tableData} // Data to be displayed in the table
        editingMode="modal" // Enable modal editing mode
        // Enable/disable column ordering based on the setting
        enableColumnOrdering={columnSetting}
        // Enable/disable pagination based on the setting
        enablePagination={paginationSetting}
        enableEditing // Enable editing in the table
        onEditingRowSave={handleSaveRowEdits} // Handler for saving edited row data
        onEditingRowCancel={handleCancelRowEdits} // Handler for canceling row edits
        enableColumnFilterModes // Enable column filter modes
        enablePinning // Enable column pinning
        enableRowVirtualization // Enable row virtualization
        initialState={{ showColumnFilters: false }} // Initial state configuration
        // Render a detail panel for each row to show client loans
        renderDetailPanel={({ row }) => (
          <Box>
            <div>
              <LoanTable id={row.original.idNumber} /> {/* Render LoanTable component for the client */}
            </div>
          </Box>
        )}
        // Render row actions for editing and deleting a client/row
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <div className="ml-6 flex">
              {/* Edit button */}
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <div className={!deleteSetting ? 'hidden' : ''}>
                {/* Delete button */}
                <Tooltip arrow placement="left" title="Delete">
                  <IconButton onClick={() => handleDeleteClient(row.original._id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </Box>
        )}
        // Button to create a new client
        renderTopToolbarCustomActions={() => (
          <Button
            color="primary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create New Client
          </Button>
        )}
      />

      {/* CreateNewClientModal component */}
      {/* Modal for creating a new client */}
      <CreateNewClientModal
        columns={columns} // Columns configuration for the modal form
        open={createModalOpen} // Open state of the modal
        onClose={() => setCreateModalOpen(false)} // Handler for closing the modal
        onSubmit={handleCreateNewRow} // Handler for submitting the new client data
      />
    </>

  );
};

export default ClientTable;
