"use client"
import React, { useState, useMemo, useEffect } from 'react';
import styles from './serverlisttable.module.css';
import TableHeader from '@/components/tablehead/TableHeader';
import { TablePagination } from '@mui/material';

const ServerListTable = ({ servers,columns,editable }) => {
  const [data, setData] = useState([]);

  
  useEffect(() => {
    setData(servers);
  }, [servers]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (sortConfig.key === 'connectedDateTime' || sortConfig.key === 'disconnectDateTime') {

          const aDate = new Date(aValue);
          const bDate = new Date(bValue);
          return sortConfig.direction === 'ascending' ? aDate - bDate : bDate - aDate;
        } else if (sortConfig.key === 'location') {
        
          const aKey = aValue.toLowerCase();
          const bKey = bValue.toLowerCase();
          return sortConfig.direction === 'ascending' ? aKey.localeCompare(bKey) : bKey.localeCompare(aKey);
        } else if (sortConfig.key === 'platform' || sortConfig.key === 'appname' || sortConfig.key === 'platform_Model') {
         
          const aKey = aValue.toLowerCase();
          const bKey = bValue.toLowerCase();
          return sortConfig.direction === 'ascending' ? aKey.localeCompare(bKey) : bKey.localeCompare(aKey);
        } else if (sortConfig.key === 'ser') {
          return sortConfig.direction === 'ascending' ? aValue - bValue : bValue - aValue;
        } else {
        
          const aKey = aValue.toString().toLowerCase();
          const bKey = bValue.toString().toLowerCase();
          return sortConfig.direction === 'ascending' ? aKey.localeCompare(bKey) : bKey.localeCompare(aKey);
        }
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const paginatedData = useMemo(() => {
    return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={styles.logsContainer}>
      <div className={styles.logsWrapper}>
      <TableHeader 
          data={paginatedData} 
          requestSort={requestSort} 
          sortConfig={sortConfig} 
          formatDate={formatDate}
          page={page}
          rowsPerPage={rowsPerPage}
          columns={columns}
          editable={editable}
        />
        <TablePagination
          component="div"
          count={sortedData.length} 
          page={page}
          onPageChange={handleChangePage} 
          rowsPerPage={rowsPerPage} 
          onRowsPerPageChange={handleChangeRowsPerPage} 
          sx={{
            '& .MuiTablePagination-toolbar': {
              fontSize: '18px',
              margin:'10px 0px',
            },
            '& .MuiTablePagination-selectLabel': {
              fontSize: '18px',
            },
            '& .MuiTablePagination-input': {
              fontSize: '18px',
            },
            '& .MuiTablePagination-displayedRows': {
              fontSize: '18px',
            },
          }}
        />
      </div>
    </div>
  );
}

const formatDate = (dateString) => {
  if (!dateString) return 'NULL';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export default ServerListTable;
