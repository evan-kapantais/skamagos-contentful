import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'gatsby';

import Seo from '../components/seo';

import * as styles from './contact.module.css';

import instagram from '../images/instagram-black.svg';
import facebook from '../images/facebook-black.svg';

const ContactPage = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Adjust textarea height
  useEffect(() => {
    messageRef.current.style.height = message.length
      ? messageRef.current.scrollHeight + 'px'
      : 'auto';
  }, [message]);

  return (
    <div className={styles.page}>
      <Seo title="Contact" />
      <div className={styles.container}>
        <section className={styles.left}>
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav> */}
          <form
            action="/contact/success"
            method="POST"
            data-netlify="true"
            className={styles.form}
          >
            <h2>Get In Touch</h2>
            <p className={styles.par}>
              Have a project in mind or just want to say hi? <br />
              I’d love to hear from you!
            </p>
            <div className={styles.formWrapper}>
              <div className={styles.row}>
                <div className={styles.inputWrapper}>
                  <label htmlFor="name" className={styles.label}>
                    Name <span>*</span>
                  </label>
                  <input
                    ref={nameRef}
                    className={styles.input}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label htmlFor="email" className={styles.label}>
                    Email <span>*</span>
                  </label>
                  <input
                    ref={emailRef}
                    className={styles.input}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@doe.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="subject" className={styles.label}>
                  Subject <span>*</span>
                </label>
                <input
                  ref={subjectRef}
                  className={styles.input}
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Let's work together"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="message" className={styles.label}>
                  Message <span>*</span>
                </label>
                <textarea
                  ref={messageRef}
                  name="message"
                  id="message"
                  cols="30"
                  rows="1"
                  className={styles.textarea}
                  placeholder="I have a project idea"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <input type="submit" value="Send →" className={styles.submit} />
          </form>
        </section>
        <section className={styles.right}>
          <div>
            <h2>Contact Info</h2>
            <div className={styles.via}>
              <p>Email me</p>
              <a href="mailto:konstantinos.skam@gmail.com">
                konstantinos.skam@gmail.com
              </a>
            </div>
            <div className={styles.via}>
              <p>Call me</p>
              <a href="tel:+306978392849">+30 697 8392 849</a>
            </div>
            <div className={styles.via}>
              <p>Follow me</p>
              <a
                href="https://www.instagram.com/konstantinoskm_/"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <img
                  src={instagram}
                  alt="instagram icon"
                  aria-label="social icon"
                />
              </a>
              <a
                href="https://www.facebook.com/skamskami"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <img
                  src={facebook}
                  alt="facebook icon"
                  aria-label="social icon"
                />
              </a>
            </div>
          </div>
        </section>
      </div>
      <footer className={styles.footer}>
        Designed and developed by <a href="#">Evan Kapantais</a>
      </footer>
      <h1 className={styles.deco}>Contact</h1>
    </div>
  );
};

export default ContactPage;
