import { useState } from "react";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { Button } from "antd"; // Ant Design Button component
import { NavLink } from "react-router-dom"; // Import NavLink for routing
import "../assets/css/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar sticky top-0 z-50 bg-white/30 backdrop-blur-md shadow-lg py-4">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <NavLink to="/" className="text-2xl font-bold text-sky-800">
          MyBrand
        </NavLink>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="#about" className="nav-link">
            About
          </NavLink>
          <NavLink to="#services" className="nav-link">
            Services
          </NavLink>
          <NavLink to="#contact" className="nav-link">
            Contact
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            icon={isOpen ? <FiX /> : <FiAlignJustify />}
            className="text-white"
            onClick={toggleMenu}
            type="text"
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md shadow-lg py-4">
          <div className="flex flex-col items-center space-y-4">
            <NavLink to="#home" className="mobile-nav-link">
              Home
            </NavLink>
            <NavLink to="#about" className="mobile-nav-link">
              About
            </NavLink>
            <NavLink to="#services" className="mobile-nav-link">
              Services
            </NavLink>
            <NavLink to="#contact" className="mobile-nav-link">
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
