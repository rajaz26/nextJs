'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setAuthState } from '@/lib/features/auth/authSlice';
import { CircularProgress } from '@mui/material';

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/login', {
        email: email,  
        password: password
      });

      if (response.status === 200) {
        const { accessToken } = response.data;
        dispatch(setAuthState({ accessToken }));
        router.push('/dashboard'); 
      } else {
        console.error("Login unsuccessful", response.data);
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    await loginUser();
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input type="email" id="email" name="email" className={styles.input} required
            value={email} onChange={(e) => setEmail(e.target.value)} />
          
          <label htmlFor="password" className={styles.label}>Password</label>
          <input type="password" id="password" name="password" className={styles.input} required
            value={password} onChange={(e) => setPassword(e.target.value)} />
          
          <button type="submit" className={styles.loginButton} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'LOGIN'}
          </button>
          <div className={styles.forgotPassword}>
            <Link href="#" className={styles.forgotPasswordLink}>Forgot password?</Link>
          </div>
        </form>
        <svg className={styles.bottomCurve} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none">
          <path d="M0,10 L20,6 L40,10 L60,7 L80,10 L100,8 L100,10 L0,10 Z" fill="#F4C11E"/>
          <path d="M0,10 L15,8 L35,10 L55,9 L75,10 L95,9 L100,10 L0,10 Z" fill="#DAA520" />
          <path d="M0,10 L10,9 L30,10 L50,9 L70,10 L90,9 L100,10 L0,10 Z" fill="#B8860B" />
        </svg>
      </div>
    </div>
  );
}

export default Login;
