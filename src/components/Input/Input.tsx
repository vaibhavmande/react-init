import React, { ForwardedRef, InputHTMLAttributes, useId } from 'react';
import './input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid: boolean;
  errorMessage?: string;
  label: string;
}

const Input = React.forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { isValid, errorMessage, label, ...rest } = props;
  const elementId = useId();
  const errorId = useId();

  return (
    <div className="field-row">
      <label htmlFor={elementId}>{label}</label>
      <input
        id={elementId}
        ref={ref}
        aria-invalid={!isValid}
        aria-describedby={errorId}
        {...rest}
      />
      <p id={errorId} className="error-message" role="alert" aria-hidden={isValid}>
        {errorMessage}
      </p>
    </div>
  );
});
Input.displayName = 'Input';

export default Input;
