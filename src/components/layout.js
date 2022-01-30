import React, { useEffect } from 'react';

import '../style/variables.css';
import '../style/global.css';

import Sidebar from './Sidebar';
import Menu from './Menu';

const Layout = ({ children, isMenuOpen, setIsMenuOpen }) => {
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isMenuOpen]);

  return (
    <div className="layout">
      {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
      <main className="page-main">
        <Sidebar />
        <section className="content">{children}</section>
      </main>
    </div>
  );
};

export default Layout;
