import React, { ForwardedRef, InputHTMLAttributes, useId } from 'react';

import './input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid: boolean;
  label: string;
}

const Input = React.forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { isValid, label, ...rest } = props;
  const elementId = useId();

  return (
    <div className="field-row">
      <label htmlFor={elementId}>{label}</label>
      <input ref={ref} id={elementId} aria-invalid={!isValid} {...rest} />
    </div>
  );
});

export default Input;
