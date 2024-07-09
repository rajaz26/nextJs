import React from 'react';
import styles from './drawer.module.css';
import Image from "next/image"
import { IoPersonSharp } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { FaServer } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import Link from 'next/link';

const Drawer = ({ isOpen, toggleDrawer, children }) => {
  return (
    <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
       <div className={styles.drawerContainer}>
       <div className={styles.drawerWrapper}>
       
       <div className={styles.drawerTop}>
       <div className={styles.drawerLeftLogo}>
        VPN!!
        
       </div>
       <div className={styles.drawerClose}>
       <button onClick={toggleDrawer} className={styles.closeButton}>Close</button>
       </div>
       </div>

       <div className={styles.drawerProfileSection}>
        <div className={styles.drawerProfileImage}>
          <Image src="/profile.png" width={75} height={75}/>
        </div>
        <div className={styles.drawerProfileName}>
          Raja Zain
        </div>
        <div className={styles.drawerProfileRole}>
        Admin
        </div>
       </div>

       <div className={styles.drawerMenuContainer}></div>
        <div className={styles.drawerMenuHeading}>
          Menu
        </div>
        <div className={styles.drawerOptionContainer}>
        <Link href="/dashboard" >
        <div className={styles.drawerOptions}>
          <div className={styles.drawerOptionsLeft}> 
            <div className={styles.drawerOptionsIcon}>
            <RiHome2Fill />
        </div>
        <div className={styles.drawerOptionsText}>
          Dashboard
        </div></div>
       
        <div className={styles.drawerOptionsArrow}>
          {'>'}
        </div>
        </div>
        </Link>
        {/* <Link href="/serverslist" >
        <div className={styles.drawerOptions}>
          <div className={styles.drawerOptionsLeft}> 
            <div className={styles.drawerOptionsIcon}>
            <FaServer />
        </div>
        <div className={styles.drawerOptionsText}>
          Server Management
        </div></div>
       
        <div className={styles.drawerOptionsArrow}>
          {'>'}
        </div>
        </div>
        </Link> */}
        {/* <Link href="/serverstatus" >
        <div className={styles.drawerOptions}>
          <div className={styles.drawerOptionsLeft}> 
            <div className={styles.drawerOptionsIcon}>
            <FaClipboardList />
        </div>
        
        <div className={styles.drawerOptionsText}>
          Status
        </div></div>
       
        <div className={styles.drawerOptionsArrow}>
          {'>'}
        </div>
        </div>
        </Link> */}
        <Link href="/login" >
        <div className={styles.drawerOptions}>
          <div className={styles.drawerOptionsLeft}> 
            <div className={styles.drawerOptionsIcon}>
            <IoLogOut />
        </div>
        <div className={styles.drawerOptionsText}>
          Logout
        </div></div>
       
        <div className={styles.drawerOptionsArrow}>
          {'>'}
        </div>
        </div>
        </Link>
        </div>
       </div>
       </div>
     
    </div>
  );
}

export default Drawer;
