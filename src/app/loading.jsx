import React from 'react';
import styles from './loading.module.css'; // Make sure to use module import for CSS
import { CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}> </div>
    </div>
  )
}

export default Loading;
