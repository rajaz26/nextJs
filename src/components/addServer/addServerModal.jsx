"use client"
import React, { useState } from 'react';
import styles from './addservermodal.module.css';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';

const AddServerModal = ({ onClose }) => {
  const router = useRouter();
  const [buttonLabel1, setButtonLabel1] = useState('Choose File');
  const [buttonLabel2, setButtonLabel2] = useState('Choose File');
  const [serverName, setServerName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [serverIP, setServerIP] = useState('');
  const [countryFlagImage, setCountryFlagImage] = useState(null);
  const [ovpnFile, setOvpnFile] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isAdsActive, setIsAdsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverAdded, setServerAdded] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('ServerName', serverName);
    formData.append('CountryName', countryName);
    formData.append('ServerIP', serverIP);
    if (countryFlagImage) formData.append('CountryFlagImage', countryFlagImage);
    if (ovpnFile) formData.append('OvpnFile', ovpnFile);
    formData.append('IsActive', isActive);
    formData.append('IsAdsActive', isAdsActive);

    console.log('FormData entries:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await axios.post('http://104.238.35.17:8090/api/ServersDetails', formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
        setServerAdded(true);
        setLoading(false);
        // onClose();
 
    } catch (error) {
      console.error('Failed to add server', error);
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const { name } = event.target;
      if (name === 'countryFlagImage') {
        setButtonLabel1(file.name);
        setCountryFlagImage(file);
      } else if (name === 'ovpnFile') {
        setButtonLabel2(file.name);
        setOvpnFile(file);
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.loginWrapper}>
      <button className={styles.closeButton} onClick={onClose}><IoClose size={30} /></button>
        {serverAdded ? (
          <div className={styles.serverAddedMessage}>
            <h2 className={styles.modalHeading}>Server Added</h2>
            <button onClick={onClose} className={styles.modalButton}>Close</button>
          </div>
        ) : (
        
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formInputContainer}>
            <div className={styles.formInput}>
              <label htmlFor="serverName" className={styles.label}>Server Name</label>
              <input 
                type="text" 
                id="serverName" 
                name="serverName" 
                className={styles.input} 
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                required 
              />
            </div>
            <div className={styles.formInput}>
              <label htmlFor="countryName" className={styles.label}>Country Name</label>
              <input 
                type="text" 
                id="countryName" 
                name="countryName" 
                className={styles.input} 
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className={styles.formInputContainer}>
            <div className={styles.formInput}>
              <label htmlFor="serverIP" className={styles.label}>Server IP</label>
              <input 
                type="text" 
                id="serverIP" 
                name="serverIP" 
                className={styles.input} 
                value={serverIP}
                onChange={(e) => setServerIP(e.target.value)}
                required 
              />
            </div>
            
            <div className={styles.formInputCheck}>
              <label htmlFor="isActive" className={styles.label}>Is Active</label>
              <input 
                type="checkbox" 
                id="isActive" 
                name="isActive" 
                checked={isActive}
                className={styles.check} 
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </div>
            <div className={styles.formInputCheck}>
              <label htmlFor="isAdsActive" className={styles.label}>Is Ads Active</label>
              <input 
                type="checkbox" 
                id="isAdsActive" 
                name="isAdsActive" 
                checked={isAdsActive}
                className={styles.check} 
                onChange={(e) => setIsAdsActive(e.target.checked)}
              />
            </div>
          </div>

          <div className={styles.formInputContainerButtons}>
            <div className={styles.formInput}>
              <label htmlFor="countryFlagImage" className={styles.label}>Country Flag Image</label>
              <div className={styles.customFileInput}>
                <input 
                  type="file" 
                  id="countryFlagImage" 
                  name="countryFlagImage" 
                  className={styles.hiddenInput} 
                  onChange={handleFileChange} 
                  required 
                />
                <label htmlFor="countryFlagImage" className={styles.customFileButton}>{buttonLabel1}</label>
              </div>
            </div>
            <div className={styles.formInput}>
              <label htmlFor="ovpnFile" className={styles.label}>Ovpn File</label>
              <div className={styles.customFileInput}>
                <input 
                  type="file" 
                  id="ovpnFile" 
                  name="ovpnFile" 
                  className={styles.hiddenInput} 
                  onChange={handleFileChange} 
                  required 
                />
                <label htmlFor="ovpnFile" className={styles.customFileButton}>{buttonLabel2}</label>
              </div>
            </div>
          </div>
          <div className={styles.formInputButton}>
            <button type="submit" className={styles.loginButton} disabled={loading}>
              {loading ? 'LOADING' : 'ADD SERVER'}
            </button>
          </div>
        </form>)}
      </div>
    </div>
  );
}

export default AddServerModal;
