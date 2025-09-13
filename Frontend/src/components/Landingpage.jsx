import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; 

export default function Landingpage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error("Error loading user:", err);
      localStorage.removeItem("user");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/"); // redirect home
  };

  const renderAvatar = () => {
    if (user?.name) {
      return (
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
          {user.name.charAt(0).toUpperCase()}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <a href="/" className="font-bold text-2xl sm:text-3xl flex gap-1">
            <span className="text-blue-600">Career</span>
            <span className="text-emerald-600">Sense</span>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2">{renderAvatar()}</div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-full hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="text-gray-700 font-medium hover:underline">
                Join now
              </Link>
              <Link
                to="/signin"
                className="font-medium px-4 py-2 border border-blue-500 rounded-full text-blue-500 hover:bg-blue-50"
              >
                Sign in
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiX className="text-3xl text-gray-700" />
            ) : (
              <HiMenu className="text-3xl text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col items-center gap-4 py-4 bg-white border-t border-gray-200">
          {user ? (
            <>
              <div className="flex items-center gap-2">{renderAvatar()}</div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-full hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                Join now
              </Link>
              <Link to="/signin" onClick={() => setMenuOpen(false)}>
                Sign in
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
