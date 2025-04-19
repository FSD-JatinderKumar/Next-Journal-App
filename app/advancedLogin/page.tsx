// app/login/page.tsx

import React from 'react';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <LoginForm />
    </div>
  );
}
