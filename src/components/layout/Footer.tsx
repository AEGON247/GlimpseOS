import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 text-center text-sm text-glimpse-dark-text bg-glimpse-component-bg mt-auto">
      <div className="container mx-auto">
        © {currentYear} Sachin Mehta. All rights reserved. <br/>
        Built with React, TypeScript, TailwindCSS & GSAP.
      </div>
    </footer>
  );
};

export default Footer;