import React, { useRef, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import styles from '../serverListTable/serverlisttable.module.css';
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

const TableHeader = ({ data, columns, requestSort, sortConfig, formatDate, page, rowsPerPage,editable }) => {
  const [columnWidths, setColumnWidths] = useState(columns.map(() => 150));
  const resizers = useRef([]);

  const startResizing = (index) => (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);

    const startX = e.clientX;
    const startWidth = columnWidths[index];

    function resize(e) {
      const newWidth = startWidth + e.clientX - startX;
      setColumnWidths((prevWidths) =>
        prevWidths.map((width, i) => (i === index ? Math.max(newWidth, 50) : width))
      );
    }

    function stopResizing() {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResizing);
    }
  };
  // useEffect(() => {
  //   console.log("DATA", data);
  // }, [data]); 
  
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'NULL';

    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${day}-${month}-${year} ${hours}:${minutes}${ampm}`;
  };

  return (
    <TableContainer className={styles.logsTableContainer}>
      <Table aria-label="sortable table" className={styles.serverTable}>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                className={styles.tableColumn}
                key={column.id}
                style={{ width: columnWidths[index],textAlign:'center' }}
                
                sx={{
                  '& .MuiTableSortLabel-icon': {
                    color: 'var(--secondary)',
                  },
                  '&:hover': {
                    color: 'var(--secondary)',
                  },
                  '&:active': {
                    color: 'var(--secondary)',
                  },
                }}
              >
                <TableSortLabel
                  active={sortConfig.key === column.id}
                  direction={sortConfig.key === column.id ? sortConfig.direction : 'asc'}
                  onClick={() => requestSort(column.id)}
                  classes={{ icon: styles.sortIcon, active: styles.sortActive }}
                  sx={{
                    '& .MuiTableSortLabel-icon': {
                      color: sortConfig.key === column.id ? 'var(--secondary)' : 'inherit',
                    },
                    '&:hover .MuiTableSortLabel-icon': {
                      color: 'var(--secondary)',
                    },
                    '& .MuiTableSortLabel-icon.MuiTableSortLabel-active': {
                      color: 'var(--secondary)',
                    },
                    '&:hover': {
                      color: 'var(--secondary)',
                    },
                    '&.Mui-active': {
                      color: 'var(--secondary)',
                    },
                  }}
                >
                  {column.label}
                </TableSortLabel>
                <div
                  className={styles.resizer}
                  onMouseDown={startResizing(index)}
                />
              </TableCell>
            ))}
             {editable && (
              <>
                <TableCell className={styles.tableColumn} style={{ width: 150,textAlign:'center'}}>
                  Edit
              
                </TableCell>
                <TableCell className={styles.tableColumn} style={{ width: 150,textAlign:'center' }}>
                  Delete
                </TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map((row, rowIndex) => (
  <TableRow key={rowIndex}>
    {columns.map((column) => (
      <TableCell key={column.id} style={{ textAlign: 'center' }}>
        {column.id === 'ser'
                 ? page * rowsPerPage + rowIndex + 1
                 : column.id === 'flag'
                 ? row.country_Flag
                   ? (
                       <img
                         src={row.country_Flag}
                         alt={`${row.country_Flag} Flag`}
                         style={{ margin: '5px', width: '45px', height: '30px' }}
                       />
                     )
                   : 'NULL'
          : column.id === 'countryFlagLink'
          ? row.imageBase64
            ? (
                <img
                  src={row.imageBase64}
                  alt={`${row.serverName} Flag`}
                  style={{ margin: '5px', width: '45px', height: '30px' }}
                />
              )
            : <CircularProgress size={24} />
          : column.id === 'connectedDateTime' || column.id === 'disconnectDateTime'
          ? formatDateTime(row[column.id])
          : typeof row[column.id] === 'boolean'
          ? row[column.id] ? 'Yes' : 'No'
          : row[column.id] ?? 'NULL'}
      </TableCell>
    ))}
    {editable && (
      <>
        <TableCell className={styles.tableColumnEdit} style={{ width: 150, color: 'blue', textAlign: 'center' }}>
          <MdOutlineEdit size={25} />
        </TableCell>
        <TableCell className={styles.tableColumnDelete} style={{ width: 150, color: 'red', textAlign: 'center' }}>
          <MdOutlineDelete size={25} />
        </TableCell>
      </>
    )}
  </TableRow>
))}

       
            
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableHeader;