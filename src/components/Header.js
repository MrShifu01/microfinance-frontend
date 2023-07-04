import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetUser } from '../redux/userSlice';
import { toggleSettings } from '../redux/settingsSlice';
import { resetToken } from '../redux/tokenSlice';

const Header = () => {
  // Retrieve data from the Redux store
  const page = useSelector((state) => state.page.page);
  const user = useSelector((state) => state.user.data);
  const settings = useSelector((state) => state.settings.settings);

  const dispatch = useDispatch();

  // Function to handle logging out as a user
  const handleLogout = () => {

    // Dispatch the resetUser and resetToken action to clear user data in Redux store
    dispatch(resetUser());
    dispatch(resetToken());
  };

  return (
    <div>
      <nav className="flex justify-between items-center">
        <div>
          {/* Link to the home page */}
          <Link to="/">
            <h1 className="text-4xl my-4">LMG</h1>
          </Link>
        </div>
        <ul className="flex gap-6">
          <li className={page === 'admin' ? 'text-black' : ''}>
            {/* Check if the user is logged in and is an admin */}
            {user && user.isAdmin && (
              <div className="flex gap-6">
                <div className={`${page !== 'index' && 'hidden'}`}>
                  {/* Button to toggle settings */}
                  <button onClick={() => dispatch(toggleSettings())}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 ${!settings ? 'opacity-40' : ''}`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                      />
                    </svg>
                  </button>
                </div>
                {/* Link to the admin page */}
                <Link to="/admin">Admin</Link>
              </div>
            )}
            {/* Display disabled link if user is not logged in */}
            {!user && <span className="disabled-link"></span>}
          </li>
          {/* Link to the change password page */}
          <li>
            {user && <Link to="/change-password">Change Password</Link>}
          </li>
          {/* Link to log out the user */}
          <li>
            {user && <Link to="/" className="cursor-pointer" onClick={handleLogout}>
              Logout
            </Link>}
          </li>
        </ul>
      </nav>
    </div>
 );
};

export default Header;