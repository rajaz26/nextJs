"use client"
import React, { useState, useEffect } from 'react';
import styles from './status.module.css';

const Status = ({ servers }) => {
  const [selectedServer, setSelectedServer] = useState(null);

  useEffect(() => {
    if (servers) {
      setSelectedServer(servers); 
    }
  }, [servers]);

  return (
    <div className={styles.homeWrapper}>
      {selectedServer && (
        <>
          <div className={styles.statusContainer}>
            <div className={styles.statusText}>
              Status - {selectedServer.serverName}
            </div>
          </div>
          <div className={styles.statusDetailsContainer}>
            <div className={styles.statusTabsContainer}>
              <div className={styles.statusTab}>
                <div className={styles.statusTabHeading}>
                  Active Clients: {selectedServer.activeClients}
                </div>
                <div className={styles.statusTabSubtitle}>
                  <div>
                    CPU Info: {selectedServer.cpu_info}
                  </div>
                </div>
              </div>
              <div className={styles.statusTab}>
                <div className={styles.statusTabHeading}>
                  OS Uptime
                </div>
                <div className={styles.statusTabSubtitle}>
                  {selectedServer.os_uptime}
                </div>
              </div>
              <div className={styles.statusTab}>
                <div className={styles.statusTabHeading}>
                  Server Time
                </div>
                <div className={styles.statusTabSubtitle}>
                  {new Date(selectedServer.server_time).toLocaleDateString('en-GB')} {new Date(selectedServer.server_time).toLocaleTimeString('en-GB')}
                </div>
              </div>
              <div className={styles.statusTab}>
                <div className={styles.statusTabHeading}>
                  RAM Usage
                </div>
                <div className={styles.statusTabSubtitle}>
                  {selectedServer.ram_usage_mb} MB
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Status;
