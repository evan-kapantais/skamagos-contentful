import React, { useEffect, useState, useRef } from 'react';
import { useInput } from '../hooks/inputs';
import * as styles from './contact.module.css';

const ContactPage = () => {
  const submitRef = useRef(null);
  const decoRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messaageRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const rotateDeco = () => {
    const chars = 1 + name + email + subject + message;
    decoRef.current.style.transform = `rotate(${10 * chars.length}deg)`;
  };

  const showSubmit = () => {
    const values = [name, email, subject, message].filter(
      (value) => value.trim() !== ''
    );

    submitRef.current.style.opacity = values.length * 0.3;

    submitRef.current.style.pointerEvents =
      values.length === 4 ? 'all' : 'none';
  };

  useEffect(() => {
    rotateDeco();
    showSubmit();
  }, [name, email, subject, message]);

  return (
    <div className={styles.page}>
      <div className={styles.deco} ref={decoRef}></div>
      <div>
        <form className={styles.form}>
          <div className={styles.formWrapper}>
            <section className={styles.left}>
              <div className={styles.inputWrapper}>
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
                <label htmlFor="name" className={styles.label}>
                  Name *
                </label>
              </div>
              <div className={styles.inputWrapper}>
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
                <label htmlFor="email" className={styles.label}>
                  Email *
                </label>
              </div>
              <div className={styles.inputWrapper}>
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
                <label htmlFor="subject" className={styles.label}>
                  Subject *
                </label>
              </div>
            </section>
            <section className={styles.right}>
              <div className={styles.inputWrapper}>
                <textarea
                  ref={messaageRef}
                  name="message"
                  id="message"
                  cols="30"
                  rows="20"
                  className={styles.textarea}
                  placeholder="I have an idea for a project"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <label htmlFor="message" className={styles.label}>
                  Message *
                </label>
              </div>
            </section>
          </div>
          <input
            type="submit"
            value="Send Message"
            className={styles.submit}
            ref={submitRef}
          />
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
