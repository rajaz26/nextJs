import React from 'react'
import styles from './sidebar.module.css'
import { FaFire } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaServer } from "react-icons/fa";
import { usePathname, useRouter } from 'next/navigation';
import { FiLogOut } from "react-icons/fi";
import { FaRegListAlt } from "react-icons/fa";
import { MdAddToQueue } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { clearAuthState } from '@/lib/features/auth/authSlice';
const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    const navigateTo = (path) => {
      router.push(path);
    };

    const getIconColor = (path) => {
        return pathname === path ? 'var(--secondary)':''
      };

    const handleLogOut=()=>{
        dispatch(clearAuthState());
        router.push('/');
    }
  
  return (
    <div className={styles.sidebarContainer}>
        <div className={styles.sidebarWrapper}>
            <div className={styles.logoContainer}>
                <div className={styles.logoWrapper}>
                    <FaFire size='30px' color='var(--secondary)'/>
                    <h1 className={styles.logoHeading}>VPN</h1>
                </div>
            </div>
            <div className={styles.optionsContainer}>
                <div className={styles.optionWrapper}>
                    {/* <div className={styles.optionSection}  onClick={() => navigateTo('/dashboard')}>
                        <FaHome size='23px' className={styles.optionIcon}/>
                        <h3 className={styles.optionHeading}>Home</h3>
                    </div> */}
                  
                    <div className={styles.optionSection}  onClick={() => navigateTo('/dashboard')}>
                        <FaRegListAlt size='23px' className={styles.optionIcon} color={getIconColor('/dashboard')} />
                        <h3 className={styles.optionHeading}>Server Logs</h3>
                    </div>
                    {/* <div className={styles.optionSection}  onClick={() => navigateTo('/addserver')}>
                        <MdAddToQueue size='23px' className={styles.optionIcon} color={getIconColor('/addserver')} />
                        <h3 className={styles.optionHeading}>Add Server</h3>
                    </div> */}
                    <div className={styles.optionSection}  onClick={() => navigateTo('/serverslist')}>
                        <FaServer size='23px' className={styles.optionIcon} color={getIconColor('/serverslist')} />
                        <h3 className={styles.optionHeading}>Server Lists</h3>
                    </div>
                    <div className={styles.optionSection}  onClick={() =>  handleLogOut()}>
                        <FiLogOut size='23px' className={styles.optionIcon}/>
                        <h3 className={styles.optionHeading}>Log Out</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar