import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { TextFieldStyle } from '../constants/Constants';

const DecimalValidatedNumberInput = ({ id, label, value, onChange, ...props }) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    onChange(value);

    if (value) {
      if (value < 0) {
        setError(true);
        setHelperText('Amount should be greater than 0');
      } else if (!/^\d+(\.\d{0,2})?$/.test(value)) {
        setError(true);
        setHelperText('Enter a valid amount with up to 2 decimal places');
      } else {
        setError(false);
        setHelperText('');
      }
    } else {
      setError(false);
      setHelperText('');
    }
  };

  return (
    <TextField
      id={id}
      label={label}
      value={value}
      onChange={handleChange}
      error={error}
      type='number'
      helperText={helperText}
      inputProps={{ min: 0 }}
      {...props}
      sx={ TextFieldStyle }
      fullWidth
      autoComplete='off'
    />
  );
};

export default DecimalValidatedNumberInput;
