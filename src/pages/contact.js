import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'gatsby';

import Seo from '../components/seo';
import Social from '../components/Social';

import * as styles from '../style/contact.module.css';
import Input from '../components/Input';

const ContactPage = () => {
  const messageRef = useRef(null);
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
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
          <form
            method="POST"
            action="/contact/success"
            data-netlify="true"
            name="Contact Form"
            className={styles.form}
          >
            <h2>Get In Touch</h2>
            <p className={styles.par}>
              Have a project in mind or just want to say hi? <br />
              I’d love to hear from you!
            </p>
            <div>
              <div className={styles.row}>
                <div className={styles.inputWrapper}>
                  <Input type="text" name="name" placeholder="John Doe" />
                </div>
                <div className={styles.inputWrapper}>
                  <Input type="email" name="email" placeholder="john@doe.com" />
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <Input
                  type="text"
                  name="subject"
                  placeholder="Let us Work Together"
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
              <a href="tel:+30 693 184 4529">+30 693 184 4529</a>
            </div>
            <div className={styles.via}>
              <p>Follow me</p>
              <Social />
            </div>
          </div>
        </section>
      </div>
      <footer className={styles.footer}>
        Designed and developed by{' '}
        <a href="https://www.instagram.com/evan.json/">Evan Kapantais</a>
      </footer>
      <h1 className={styles.deco}>Contact</h1>
    </div>
  );
};

export default ContactPage;
