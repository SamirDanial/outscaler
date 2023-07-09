import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logout, login } from "../store/slices/notificationSlice";
import { useEffect } from "react";

const Header = () => {
  const token = useSelector((state: any) => state.notification.token)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token'))
    {
      dispatch(login())
    }
  }, [])

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/createmovie'>Create New Movie</Link>
            </li>
            <li>
              {
                token ?
                <Link to="/" onClick={() => {
                  localStorage.removeItem('token');
                  dispatch(logout())
                }}>Logout</Link>:
                <Link to='/login'>Login</Link>
              }
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
