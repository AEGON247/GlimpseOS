import React from 'react';
import { Link } from 'react-scroll'; // For smooth scrolling to sections

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-md bg-glimpse-component-bg shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-glimpse-blue font-mono animate-pulse-light">Glimpse OS</h1>
        <div className="space-x-6 text-glimpse-dark-text">
          <Link to="hero" smooth={true} duration={800} className="hover:text-glimpse-blue cursor-pointer transition-colors">Home</Link>
          <Link to="git-graph-viz" smooth={true} duration={800} className="hover:text-glimpse-blue cursor-pointer transition-colors">Projects</Link>
          <Link to="skills" smooth={true} duration={800} className="hover:text-glimpse-blue cursor-pointer transition-colors">Skills</Link>
          <Link to="contact" smooth={true} duration={800} className="hover:text-glimpse-blue cursor-pointer transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;