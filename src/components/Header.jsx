import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import * as styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.bodyHeader}>
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xlink="http://www.w3.org/1999/xlink"
          width="731"
          height="236"
          viewBox="0 0 731 236"
        >
          <defs>
            <clipPath id="clip-iPhone_12_12_Pro_1">
              <rect width="731" height="236" />
            </clipPath>
          </defs>
          <g
            id="iPhone_12_12_Pro_1"
            data-name="iPhone 12, 12 Pro – 1"
            clip-path="url(#clip-iPhone_12_12_Pro_1)"
          >
            <rect width="731" height="236" fill="#fff" />
            <g
              id="Group_9"
              data-name="Group 9"
              transform="translate(-265.583 -319.607)"
            >
              <g
                id="Ellipse_7"
                data-name="Ellipse 7"
                transform="translate(768.583 327.583)"
                fill="#fff"
                stroke="#222"
                stroke-width="2"
              >
                <circle cx="110" cy="110" r="110" stroke="none" />
                <circle cx="110" cy="110" r="109.5" fill="none" />
              </g>
              <g
                id="Ellipse_8"
                data-name="Ellipse 8"
                transform="matrix(0.208, 0.978, -0.978, 0.208, 954.351, 320.912)"
                fill="#fff"
                stroke="#222"
                stroke-width="2"
                stroke-dasharray="100"
              >
                <circle cx="98.369" cy="98.369" r="98.369" stroke="none" />
                <circle cx="98.369" cy="98.369" r="97.869" fill="none" />
              </g>
              <g
                id="Ellipse_9"
                data-name="Ellipse 9"
                transform="matrix(0.899, 0.438, -0.438, 0.899, 851.731, 359.598)"
                fill="#fff"
                stroke="#222"
                stroke-width="2"
                stroke-dasharray="400"
              >
                <circle cx="58.322" cy="58.322" r="58.322" stroke="none" />
                <circle cx="58.322" cy="58.322" r="57.822" fill="none" />
              </g>
              <g
                id="Ellipse_10"
                data-name="Ellipse 10"
                transform="translate(847.583 406.583)"
                fill="#222"
                stroke="#707070"
                stroke-width="2"
              >
                <circle cx="31" cy="31" r="31" stroke="none" />
                <circle cx="31" cy="31" r="30.5" fill="none" />
              </g>
            </g>
            <g
              id="Group_8"
              data-name="Group 8"
              transform="translate(-136 -311.024)"
            >
              <rect
                id="Rectangle_9"
                data-name="Rectangle 9"
                width="658"
                height="82"
                transform="translate(136 381)"
                fill="#fff"
              />
              <text
                id="Konstantinos_Skamagos"
                data-name="Konstantinos Skamagos"
                transform="translate(136 446)"
                fill="#222"
                font-size="72"
                font-family="GillSans-Light, Gill Sans"
                font-weight="300"
              >
                <tspan x="0" y="0">
                  Konstantinos Skamagos
                </tspan>
              </text>
            </g>
            <circle
              id="Ellipse_11"
              data-name="Ellipse 11"
              cx="14"
              cy="14"
              r="14"
              transform="translate(599 104.976)"
              fill="#222"
            />
          </g>
        </svg>

        {/* <h1>Konstantinos Skamagos</h1> */}
      </Link>
    </header>
  );
};

export default Header;
