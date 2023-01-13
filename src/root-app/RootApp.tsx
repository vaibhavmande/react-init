import React from 'react';
import Input from '../core/components/Input/Input';

export default function RootApp() {
  return (
    <main>
      <h2>React Init</h2>
      <p>MODE={TARGET_ENV}</p>
      <Input type="text" label="Enter name" isValid />
    </main>
  );
}
