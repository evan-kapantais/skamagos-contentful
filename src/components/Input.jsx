import React, { useState } from 'react';

import { input, label } from '../style/contact.module.css';

const Input = (props) => {
  const [value, setValue] = useState('');

  const { type, name, placeholder } = props;

  return (
    <>
      <label htmlFor={name} className={label}>
        {name} <span>*</span>
      </label>
      <input
        className={input}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default Input;
