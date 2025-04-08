import React from "react";
import { ShoppingCartIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; // Import AuthContext
import { signOutUser } from '../firebase/auth'; // Import signOutUser

const Navbar = ({ cartCount }) => {
  const { user, setUser } = useAuth(); // Get user and setUser from AuthContext
  const navigate = useNavigate(); // For redirecting after logout

  const handleLogout = async () => {
    try {
      await signOutUser(); // Call Firebase sign-out
      setUser(null); // Clear user from context
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-white shadow-sm px-4 md:px-12 py-3 flex items-center justify-between">
      <div className="text-2xl font-bold text-green-600">
        FoodExpress
      </div>

      <div className="flex items-center space-x-4">
        {/* Show Sign In and Sign Up only if user is not authenticated */}
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-gray-700 font-medium hover:text-green-600"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {/* Show Dashboard and Logout if user is authenticated */}
            <Link
              to="/dashboard"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-700 font-medium"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-1" />
              Logout
            </button>
          </>
        )}

        <Link to="/cart" className="relative">
          <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-green-600" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
          
        </Link>
        <Link
  to="/apply"
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium"
>
  Apply Now
</Link>
      </div>
    </nav>
  );
};

export default Navbar;