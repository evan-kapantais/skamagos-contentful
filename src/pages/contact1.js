import React, { useEffect, useState, useRef } from 'react';
import * as styles from './contact1.module.css';

const ContactPage = () => {
  const submitRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const subjectInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const values = [name, email, subject, message].filter(
      (value) => value !== ''
    ).length;

    emailRef.current.style.opacity = values >= 1 ? 1 : 0;
    emailRef.current.style.transform = `translateY(${values >= 1 ? 0 : 1}rem)`;
    subjectRef.current.style.opacity = values >= 2 ? 1 : 0;
    subjectRef.current.style.transform = `translateY(${
      values >= 2 ? 0 : 1
    }rem)`;
    messageRef.current.style.opacity = values >= 3 ? 1 : 0;
    messageRef.current.style.transform = `translateY(${
      values >= 3 ? 0 : 1
    }rem)`;
    submitRef.current.style.opacity = values >= 4 ? 1 : 0;
    submitRef.current.style.transform = `translateY(${values >= 4 ? 0 : 1}rem)`;
  }, [name, email, subject, message]);

  useEffect(() => {
    const inputPadding = 0.5;

    nameInputRef.current.style.width = name.length
      ? `${name.length + inputPadding}ch`
      : '9ch';
    emailInputRef.current.style.width = email.length
      ? `${email.length + inputPadding}ch`
      : '12.5ch';
    subjectInputRef.current.style.width = subject.length
      ? `${subject.length + inputPadding}ch`
      : '14ch';
    messageInputRef.current.style.height = message.length
      ? messageInputRef.current.scrollHeight + 'px'
      : '1.5em';
  }, [name, email, subject, message]);

  return (
    <div className={styles.page}>
      <div>
        <form className={styles.form}>
          <p className={styles.salute}>Hi 👋</p>
          <div className={styles.formSet} ref={nameRef}>
            <label className={styles.span} htmlFor="name">
              I am{' '}
            </label>
            <input
              className={styles.input}
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              required
              ref={nameInputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.formSet} ref={emailRef}>
            <label htmlFor="email" className={styles.span}>
              and my email is{' '}
            </label>
            <input
              className={styles.input}
              ref={emailInputRef}
              type="email"
              id="email"
              name="email"
              placeholder="john@doe.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className={styles.span}>.</span>
          </div>
          <div className={styles.formSet} ref={subjectRef}>
            <label htmlFor="subject" className={styles.span}>
              I wanted to talk to you about{' '}
            </label>
            <input
              ref={subjectInputRef}
              className={styles.input}
              type="text"
              id="subject"
              name="subject"
              placeholder="a project idea"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <span className={styles.span}>.</span>
          </div>
          <div className={styles.formSet} ref={messageRef}>
            <label htmlFor="message" className={styles.span}>
              Here it goes:
            </label>
            <textarea
              ref={messageInputRef}
              name="message"
              id="message"
              cols="30"
              rows="2"
              className={styles.textarea}
              placeholder="I have an idea for a project"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.formSet} ref={submitRef}>
            <p className={styles.span}>
              Alright, I'm{' '}
              <input type="submit" value="sending" className={styles.submit} />{' '}
              this over.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
