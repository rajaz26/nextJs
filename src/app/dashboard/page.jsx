'use client'

import Sidebar from '@/components/sidebar/Sidebar'
import styles from './dashboard.module.css';
import { FaUserCheck } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { RiCpuLine } from "react-icons/ri";
import { PiMemoryBold } from "react-icons/pi";
import ServerListTable from '@/components/serverListTable/ServerListTable';
import React, { useState, useEffect } from 'react';
import { IoMenu } from "react-icons/io5";
import Navbar from '@/components/navbar/Navbar';
import axios from 'axios';
import Select from 'react-dropdown-select';
import Status from '@/components/status/Status';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';

const Dashboard = () => {

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [servers, setServers] = useState([]);
  const [serversStatus, setServersStatus] = useState([]);
  const [serversData, setServersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [logsLoading, setLogsLoading] = useState(false); 
  const [selectedServer, setSelectedServer] = useState(); 

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const router = useRouter();
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  useEffect(() => {
    const fetchServers = async (token) => {
      try {
        setLoading(true);
        const response = await axios.get('/api/server', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
          console.log("Data fetched Page", response.data);
          setServersData(response.data);
  
          const serverOptions = Array.from(response.data).map(data => ({
            value: data.id,
            label: data.serverName
          }));
  
          setOptions(serverOptions);

          if (response.data.length > 0) {
            const firstServer = serverOptions[0];
            setSelectedServer([firstServer]);
            setServersStatus(response.data[0]);
            fetchVpnServerDetail(token, firstServer.value);
          }
  
        } else if(response.status === 401){
          router.push('/');
        } else {
          console.error("Failed to fetch server details", response.data);
        }
      } catch (error) {
        console.error("Error fetching server details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (accessToken) {
      fetchServers(accessToken);
    } else {
      setError("No access token found");
    }
  }, [accessToken]);
  
  const fetchVpnServerDetail = async (token, ID) => {
    try {
      setLogsLoading(true); 
      setLoading(true);
      const response = await axios.get(`http://104.238.35.17:8090/api/vpnLogs/serverDetails/${ID}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        console.log("Data fetched Page", response.data);
        setServers(response.data);
      } else {
        console.error("Failed to fetch server details", response.data);
        setError("Failed to fetch server details");
      }
    } catch (error) {
      console.error("Error fetching server details:", error);
      setError(error.message);
    } finally {
      setLoading(false);
      setLogsLoading(false);
    }
  };

const dropDownChange = (selectedOption) => {
  console.log("EVENT ID = " + selectedOption[0].value);
  var ID = selectedOption[0].value;
  var result = serversData.find(obj => {
    return obj.id == ID;
  });

  setSelectedServer(selectedOption);
  setServersStatus(result);
  fetchVpnServerDetail(accessToken, ID);
};



  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredServers = servers.filter((server) =>
    (server.serverName && server.serverName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (server.remote_IPAddress && server.remote_IPAddress.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (server.location && server.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (server.platform && server.platform.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (server.appname && server.appname.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (server.platform_Model && server.platform_Model.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (server.connectedDateTime && server.connectedDateTime.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (server.disconnectDateTime && server.disconnectDateTime.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  

  const serverLogsColumns = [
    { id: 'ser', label: 'Ser', maxWidth: 70 },
    { id: 'remote_IPAddress', label: 'IP Address', minWidth: 150 },
    { id: 'flag', label: 'Flag', minWidth: 150 },
    { id: 'location', label: 'Location', minWidth: 100 },
    { id: 'platform', label: 'Platform', minWidth: 100 },
    { id: 'appname', label: 'App Name', minWidth: 150 },
    { id: 'platform_Model', label: 'Platform Model', minWidth: 150 },
    { id: 'connectedDateTime', label: 'Connected Time', minWidth: 150 },
    { id: 'disconnectDateTime', label: 'Disconnected Time', minWidth: 150 },
  ];
  


  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardWrapper}>
      <div className={`${styles.dashboardLeft} ${isSidebarVisible ? '' : styles.hidden}`}>
          <Sidebar />
        </div>

        <div className={`${styles.dashboardRight} ${isSidebarVisible ? '' : styles.fullWidth}`}>
          <div className={styles.statusContainer}>
            <div className={styles.statusWrapper}>
              <div className={styles.statusHeadingWrapper}>
                <div className={styles.buttonHeadingContainer}>
                  <IoMenu size={40} onClick={toggleSidebar} className={styles.buttonHeading}/>
                  <h1 className={styles.statusHeading}>Status</h1>
                </div>
                {options.length > 0 && (
                    <Select 
                      options={options} 
                      placeholder="Choose Country" 
                      className={styles.statusDropdown} 
                      style={{ borderColor: 'grey' , borderWidth:'2px',borderRadius: '5px',border: '2px solid #959191',fontFamily:'var(--fontFamily)',minWidth:'50px', padding: '15px'}} 
                      onChange={dropDownChange} 
                      values={selectedServer} 
                    />
                  )}
              </div>
             
              <div className={styles.statusContentWrapper}>
                <div className={styles.statusContent}>
                  <div className={styles.statusContentTile}>
                    <FaUserCheck size="60px" color='var(--secondary)' className={styles.tileIcon} />
                    <div className={styles.statusContentTileHeading}>Active Clients</div>
                    <div className={styles.statusContentTileValue}>{serversStatus.activeClients}</div>
                  </div>
                  <div className={styles.statusContentTile}>
                    <IoMdTimer size="60px" color='var(--secondary)' className={styles.tileIcon} />
                    <div className={styles.statusContentTileHeading}>OS Uptime</div>
                    <div className={styles.statusContentTileValueLarge}>{serversStatus.os_uptime}</div>
                  </div>
                  <div className={styles.statusContentTile}>
                    <RiCpuLine size="60px" color='var(--secondary)' className={styles.tileIcon} />
                    <div className={styles.statusContentTileHeading}>CPU Usage</div>
                    <div className={styles.statusContentTileValueLarge}>{serversStatus.cpu_info}</div>
                  </div>
                  <div className={styles.statusContentTile}>
                    <PiMemoryBold size="60px" color='var(--secondary)' className={styles.tileIcon} />
                    <div className={styles.statusContentTileHeading}>RAM</div>
                    <div className={styles.statusContentTileValue}>{serversStatus.ram_usage_mb} MB</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
              <div className={styles.tableHeadingWrapper}>
              <h1 className={styles.statusHeading}>Server Logs</h1>
                <input
                  type="text"
                  placeholder="Search"
                  className={styles.searchBar}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            {logsLoading ? (
                <div className={styles.loaderContainer}>
                  <div className={styles.spinner}> </div>
                </div>
              ) : (
                <ServerListTable columns={serverLogsColumns} servers={filteredServers} loading={loading} error={error} />
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
