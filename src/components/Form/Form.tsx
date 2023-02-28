import React from 'react';

function Form({ children }: { children: React.ReactNode }) {
  return <form>{children}</form>;
}

export default Form;
