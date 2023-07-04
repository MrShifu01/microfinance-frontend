import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoans } from "../redux/loansSlice";
import { setPage } from "../redux/pageSlice";
import ClientTable from "../components/ClientTable";
import { Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import LoadingSpinner from "../components/LoadingSpinner";

const IndexPage = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const savedLoans = JSON.parse(localStorage.getItem("loans"));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const settings = useSelector((state) => state.settings.settings);

  useEffect(() => {
    dispatch(setPage('index')); // Set the page in the Redux store to 'index' when the component mounts
  }, [dispatch]);

  // useEffect hook to fetch the loan data and set it to the store
  useEffect(() => {
    const getData = async () => {
      try {
        if (!savedLoans) {
          const loanResponse = await axios.get("/loans");
          dispatch(setLoans(loanResponse.data));
        } else {
          dispatch(setLoans(savedLoans));
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setIsLoading(false);
      }
    };

    try {
      getData();
    } catch (error) {
      console.error("Error in useEffect:", error);
      setError("Error in useEffect");
      setIsLoading(false);
    }
  }, [dispatch, savedLoans]);

  if (!user) {
    return <Navigate to="/login" />; // Redirect to the login page if user data is not available
  }

  if (isLoading) {
    return (
      <LoadingSpinner /> // Display a loading spinner while data is being fetched
    );
  }

  if (error) {
    return <div>Error: {error}</div>; // Display an error message if there was an error fetching the data
  }

  return (
    <div>
      {settings && (
        // Render the sidebar and client table in a grid layout if settings are available
        <div className="grid grid-cols-8">
          <div className="text-sm p-4 col-span-2 min-h-screen flex flex-col sidebar">
          {/* Sidebar component */}
            <SideBar /> 
          </div>
          <div className="col-span-6">
          {/* Client table component */}
            <ClientTable />
          </div>
        </div>
      )}
      {/* Render only the client table if settings are not available */}
      {!settings && <ClientTable />}
    </div>
  );
};

export default IndexPage;
