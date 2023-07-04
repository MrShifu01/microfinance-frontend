import { useEffect } from "react";
import { setPage } from "../redux/pageSlice";
import { useDispatch } from "react-redux";

const ErrorPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('error')); // Set the page in the Redux store to 'error' when the component mounts
  }, [dispatch]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <h2 className="text-3xl text-green-500">
        Something Went wrong! <br/> Please try again or call <span className='underline'>083992200983</span> for help
      </h2>
    </div>
  );
};

export default ErrorPage;
