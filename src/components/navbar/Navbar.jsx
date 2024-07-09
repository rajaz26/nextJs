"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './navbar.module.css'
import { usePathname } from 'next/navigation';
import Drawer from '../drawer/Drawer';

function Navbar() {

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  const pathName = usePathname();

  return (
    <div className={styles.container}>
        
        <div className={styles.logo}>
        <button onClick={toggleDrawer} className={styles.hamburger}>☰</button>
        <div>VPN!!!</div>
        </div>
        <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
          
          <p>Some content inside the drawer</p>
        </Drawer>
        {/* <div className={styles.links}>
            <Link href="/" className={pathName === "/" ? styles.active : styles.inactive}>Home</Link>
            <Link href="/serverslist" className={pathName === "/serverslist" ? styles.active : styles.inactive}>Servers</Link>
            <Link href="/serverstatus" className={pathName === "/serverstatus" ? styles.active : styles.inactive}>Status</Link>
            <Link href="/login" className={pathName === "/login" ? styles.active : styles.inactive}>Logout</Link>
            
        </div> */}
    </div>
  )
}

export default Navbar