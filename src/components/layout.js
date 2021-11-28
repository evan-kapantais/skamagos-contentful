import React from 'react';

import './variables.css';
import './global.css';
import Seo from './seo';
import Header from '../components/Header';
import Footer from './footer';

const Template = ({ children, setIsMenuOpen }) => {
  return (
    <>
      <Seo />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Template;
