// app/login/loginForm.tsx

'use client';
import React, { useState } from 'react';
import { handleLogin } from './LoginLogic';
import styles from './Login.module.css';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password, setError, router);
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className={styles.button} type="submit">
        Login
      </button>
    </form>
  );
}
