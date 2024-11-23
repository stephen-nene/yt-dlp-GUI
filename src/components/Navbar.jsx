import { useState } from "react";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { LuAlignRight, LuMenu, LuX, LuSun, LuMoonStar } from "react-icons/lu";

import { Button } from "antd"; // Ant Design Button component
import { NavLink } from "react-router-dom"; // Import NavLink for routing
import "../assets/css/navbar.css";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`navbar sticky top-0 z-50 ${
        !darkMode ? "bg-blue-900/20" : "bg-blue-900/70"
      } backdrop-blur-md shadow-lg py-4`}
    >
      <nav className="container mx-auto flex justify-between items-center px-4">
        <NavLink to="/" className="text-2xl font-bold text-sky-800">
          yt-dlp-GUI
        </NavLink>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/help" className="nav-link">
            Help
          </NavLink>
          <NavLink to="/downloads" className="nav-link">
            Downloads
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <div className="icons flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            variant={darkMode ? "outlined" : "solid"}
            color={darkMode ? "danger" : "default"}
            className="p-2  transition-colors duration-200 ease-in-out"
          >
            {darkMode ? (
              <LuSun color="gold" size={30} />
            ) : (
              <LuMoonStar size={30} />
            )}
          </button>
          <Button
            icon={isOpen ? <FiX size={30} /> : <FiAlignJustify size={30} />}
            className="text-black md:hidden p-2 rounded-full transition-colors duration-200 ease-in-out"
            onClick={toggleMenu}
            type="link"
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col items-center space-y-4 md:hidden bg-white/10 backdrop-blur-md shadow-lg py-">
          {/* <div className=""> */}
          <NavLink to="#home" className="mobile-nav-link">
            Home
          </NavLink>

          <NavLink to="#contact" className="mobile-nav-link">
            Downloads
          </NavLink>
          {/* </div> */}
        </div>
      )}
    </header>
  );
};

export default Navbar;
