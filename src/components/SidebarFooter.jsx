import { Link } from 'gatsby';
import React from 'react';

const SidebarFooter = () => {
  return (
    <footer className="sidebar-footer">
      <ul>
        <li>
          <Link to="/about">/ About</Link>
        </li>
        <li>
          <Link to="/contact">/ Contact</Link>
        </li>
        <li>
          <a
            href="https://www.instagram.com/konstantinoskm_/"
            target="_blank"
            rel="noreferrer"
          >
            / Instagram
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default SidebarFooter;
