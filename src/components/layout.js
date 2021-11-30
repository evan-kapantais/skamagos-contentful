import React from 'react';

import './variables.css';
import './global.css';
import Seo from './seo';
import Header from '../components/Header';
import Footer from './footer';

const Template = ({ children, setIsMenuOpen }) => {
  return (
    <div className="layout">
      <Seo />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Template;
