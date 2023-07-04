import { useDispatch } from "react-redux";
import { setClients } from '../redux/clientsSlice';
import { setLoans } from '../redux/loansSlice';
import { setPage } from '../redux/pageSlice';
import axios from 'axios';
import { useEffect, useState } from "react";
import { EditModal } from "../components/UserEditModal";

const AdminPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false); // State for managing the visibility of the user edit modal
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('admin')); // Set the page in the Redux store to 'admin' when the component mounts
  }, [dispatch]);

  const handleOpenModal = () => {
    setCreateModalOpen(true); // Open the user edit modal
  };

  const handleUpdateData = async () => {
    const clientResponse = await axios.get('/clients'); // Fetch clients from the API endpoint '/clients'
    const loanResponse = await axios.get('/loans'); // Fetch loans from the API endpoint '/loans'
    dispatch(setClients(clientResponse.data)); // Update the clients data in the Redux store
    dispatch(setLoans(loanResponse.data)); // Update the loans data in the Redux store
    alert("Data Updated"); // Display an alert indicating the data has been updated
  };

  const handleDeleteFromLocalStorage = () => {
    localStorage.removeItem('clients'); // Remove the 'clients' data from local storage
    localStorage.removeItem('loans'); // Remove the 'loans' data from local storage
    alert('Data Deleted from Local Storage!'); // Display an alert indicating the data has been deleted from local storage
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-center text-2xl m-8">AdminPage</div>

        {/* Button to update data from the database */}
        <button
          onClick={handleUpdateData}
          className="max-w-xs p-4 bg-gray-500 rounded-xl"
        >
          Update Data from Database
        </button>

        {/* Button to delete data from local storage */}
        <button
          onClick={handleDeleteFromLocalStorage}
          className="max-w-xs p-4 bg-red-500 rounded-xl"
        >
          Delete Data from Local Storage
        </button>

        {/* Button to open the user edit modal */}
        <button
          onClick={handleOpenModal}
          className="max-w-xs p-4 bg-green-500 rounded-xl"
        >
          Edit User Permissions
        </button>

      </div>
      {/* Render the user edit modal */}
      <EditModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
};

export default AdminPage;
