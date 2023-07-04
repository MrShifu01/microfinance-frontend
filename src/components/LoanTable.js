import { useSelector, useDispatch } from 'react-redux';
import { setLoans } from '../redux/loansSlice';
import { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { format } from 'date-fns';
import React from 'react';
import {
  Button,
  MenuItem,
  IconButton,
  Tooltip,
  Box
} from '@mui/material';
import axios from 'axios';
import { CreateNewLoanModal } from './CreateNewLoanModal';
import LoadingSpinner from './LoadingSpinner';
import { Delete } from '@mui/icons-material';

const LoanTable = ({ id }) => {
  const dispatch = useDispatch();
  const loanData = useSelector((state) => state.loans.data)
  const user = useSelector((state) => state.user.data)
  const [tableData, setTableData] = useState(loanData);
  const [loading, setLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const settledChoice = ['true', 'false'];
  const columnSetting = useSelector((state) => state.settings.column)
  const paginationSetting = useSelector((state) => state.settings.pagination)
  const deleteSetting = useSelector((state) => state.settings.delete)

  const columns = [
      {
        accessorKey: "loanDate",
        header: "Loan Date",
        size: 150,
        type: 'date',
        // Allow date picker to be used to edit the cells
        muiTableBodyCellEditTextFieldProps: {
          type: 'date',
          value: ({ row }) => {
            return row.original.loanDate;
          },
        },
        // Formatting the dates to be read easier
        Cell: ({ row }) => {
          return <div>{format(new Date(row.original.loanDate), "yyyy-MM-dd")}</div>;
        },
      },
      {
        accessorKey: "repaymentDate",
        header: "Repay Date",
        size: 150,
        type: 'date',
        // Allow date picker to be used to edit the cells
        muiTableBodyCellEditTextFieldProps: {
          type: 'date',
        },
        // Formatting the dates to be read easier
        Cell: ({ row }) => {
          return <div>{format(new Date(row.original.repaymentDate), "yyyy-MM-dd")}</div>;
        },
      },
      {
        accessorKey: "loanAmount",
        header: "Loan Amount",
        size: 150,
      },
      {
        accessorKey: "repaymentAmount",
        header: "Repay Amount",
        size: 150,
      },
      {
        accessorKey: "settled",
        header: "Settled",
        size: 150,
        // Make a dropdown choice of true or false
        muiTableBodyCellEditTextFieldProps: () => ({
          children: settledChoice.map(choice => (
            <MenuItem key={choice} value={choice}>
              {choice}
            </MenuItem>
          )),
          select: true,
        }),
        // Format the color of a cell depending on the value
        Cell: ({ row }) => (
          <div>
            {row.original.settled ? (
              <span className="bg-green-500 p-2 rounded-lg">Settled</span>
            ) : (<span className="bg-red-500 p-2 rounded-lg">Not Settled</span>)}
          </div>
        ),
      },
      {
        accessorKey: "notes",
        header: "Notes",
        size: 150,
      },
      {
        accessorKey: "idNumber",
        header: "ID Number",
        size: 150,
      },
    ]

    useEffect(() => {
      // This effect runs when the `loanData` or `id` changes
      if (Array.isArray(loanData) && loanData.length > 0) {
        // Filter the `loanData` array to get loans belonging to the selected client (`id`)
        const clientLoanData = loanData.filter((loan) => loan.idNumber === id);
        setTableData(clientLoanData); // Update the table data with client-specific loans
      }
    }, [loanData, id]);
    
    useEffect(() => {
      // This effect runs when the `id` changes
      setTableData([]); // Clear the table data when a new client is selected
      fetchLoanData(); // Fetch new loan data for the selected client
    }, [id]);
    
    useEffect(() => {
      // This effect runs when the `loanData` changes
      if (!Array.isArray(loanData) || loanData.length === 0) {
        // If there is no loan data or the loan data is empty, fetch new loan data
        fetchLoanData();
      }
    }, [loanData]);
    

    // Function for fetching the loan data from the database and setting states
  const fetchLoanData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/loans");
      const fetchedLoanData = response.data;
      dispatch(setLoans(fetchedLoanData));
      setTableData(fetchedLoanData);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching loan data:", error);
      setLoading(false);
    }
  };

  // Function to handle the saving of a cell edit
  const handleSaveCell = async (row, cell, value) => {
    const updatedInfo = JSON.parse(JSON.stringify(tableData));
    updatedInfo[cell.row.index][cell.column.id] = value; // Update the value in the cloned tableData array
    
    const singleRowData = updatedInfo[cell.row.index]; // Get the updated data for a single row
    
    if (!user.isAdmin) {
      // Show an alert if the user is not an admin
      alert("You do not have authorization to edit a loan.");
      return;
    }
    
    try {
      const response = await axios.put('/loans', singleRowData);
      const updatedTableData = [...tableData]; // Create a copy of the tableData array
      updatedTableData[row.index] = response.data; // Update the specific row with the response data
      setTableData(updatedTableData);
      dispatch(setLoans(updatedTableData));
    } catch (error) {
      console.log('Error updating loan data:', error);
    }
  };
  
  // Function to create a new loan/row
  const handleCreateNewRow = async (values) => {
    if (!user.isAdmin) {
      // Show alert if user is not admin
      alert("You do not have authorization to create a new loan.");
      return;
    }
  
    try {
      const response = await axios.post("/loans", values);
      const updatedLoanData = [...loanData, response.data];
      dispatch(setLoans(updatedLoanData));
      setCreateModalOpen(false);
    } catch (error) {
      console.log("Error creating client", error);
    }
  };

  // Function to handle the deleting of a loan/row
  const handleDeleteLoan = async (loanId) => {
    console.log(loanId)
    if (!user.isAdmin) {
      // Show alert if user is not admin
      alert('You do not have authorization to delete a loan.')
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this loan?');
    if (!confirmDelete) {
      return; // User canceled the deletion
    }
    try {
      await axios.delete(`/loans/${loanId}`);
      const updatedTableData = tableData.filter(loan => loan._id !== loanId);
      setTableData(updatedTableData);
    } catch (error) {
      console.log('Error deleting loan:', error);
    }
  }

  // Render the loading state if necessary
  if (loading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
      <>
        {/* MaterialReactTable component */}
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
          data={tableData.filter((loan) => loan.idNumber === id)} // Filtered data based on the selected client ID
          editingMode="cell" // Enable cell editing mode
          enableEditing // Enable editing in the table
          // Props for customizing the text field used for cell editing
          muiTableBodyCellEditTextFieldProps={({ row, cell }) => ({
            onBlur: (event) => {
              handleSaveCell(row, cell, event.target.value); // Call handleSaveCell when the cell loses focus
            },
          })}
          enableColumnFilterModes // Enable column filter modes
          enablePinning // Enable column pinning
          enableRowActions // Enable row actions
          enableColumnOrdering={columnSetting} // Enable column reordering based on the setting
          enablePagination={paginationSetting} // Enable pagination based on the setting
          enableRowVirtualization // Enable row virtualization
          initialState={{ showColumnFilters: false }} // Initial state configuration
          renderRowActions={({ row }) => (
            <Box>
              {/* Delete button for row actions */}
              <div className={!deleteSetting ? 'hidden' : ''}>
                <Tooltip arrow placement="left" title="Delete">
                  <IconButton onClick={() => handleDeleteLoan(row.original._id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            // Custom action button in the top toolbar
            <Button
              color="primary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              New Loan
            </Button>
          )}
        />

        {/* CreateNewLoanModal component */}
        <CreateNewLoanModal
          columns={columns} // Columns configuration for the modal form
          open={createModalOpen} // Open state of the modal
          onClose={() => setCreateModalOpen(false)} // Handler for closing the modal
          onSubmit={handleCreateNewRow} // Handler for submitting the new row data
          idNumber={id} // ID number of the selected client
        />
      </>

  );
};

export default LoanTable;
