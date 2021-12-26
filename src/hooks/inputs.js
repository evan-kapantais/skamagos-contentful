import { useState } from 'react';

export const useInput = ({ type, name, placeholder }) => {
  const [value, setValue] = useState('');

  const onChange = (e) => setValue(e.target.value);

  const reset = () => setValue('');

  // return (
  //   <input type={type} placeholder={placeholder} name={name} id={name} onChange={onChange}  />
  // )

  return {
    value,
    onChange,
    type: type,
    name: name,
    id: name,
    placeholder: placeholder,
    required: true,
    // ref: `${name}Ref`,
  };
};
