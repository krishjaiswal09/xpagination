import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './EmployeeDataTable.module.css';

function EmployeeDataTable() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        alert(`Error fetching data: ${error.message}`);
      });
  }, []);
  

  const handleClickNext = () => {
    if (currentPage * itemsPerPage < employees.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handleClickPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>Employee Data Table</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button onClick={handleClickPrevious} className={styles.pageButton}>
          Previous
        </button>
        <span className={styles.pageNumber}>{currentPage}</span>
        <button onClick={handleClickNext} className={styles.pageButton}>
          Next
        </button>
      </div>
    </div>
  );
}

export default EmployeeDataTable;
