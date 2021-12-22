import React from 'react';

import './variables.css';
import './global.css';
import Seo from './seo';

import Sidebar from './Sidebar';
import Menu from './Menu';

const Layout = ({ children, isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className="layout">
      <Seo />
      {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
      <main className="page-main">
        <Sidebar />
        <section className="content">{children}</section>
      </main>
    </div>
  );
};

export default Layout;
