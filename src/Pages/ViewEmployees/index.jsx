import React, {useState} from 'react';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import styles from './ViewEmployees.module.css'

/**
* @description Component displaying a table of employees with search and pagination.
* @returns {JSX.Element} Employee table component with search and pagination.
*/

export default function ViewEmployees() {

  const [searchText, setSearchText] = useState('');
  const employeeData = useSelector((state) => state.form.employeeData);

  const columns = [
    {
      name: 'First Name',
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: (row) => row.startDate,
      sortable: true,
    },
    {
      name: 'Department',
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: 'Date of Birth',
      selector: (row) => row.dateOfBirth,
      sortable: true,
    },
    {
      name: 'Street',
      selector: (row) => row.street,
      sortable: true,
    },
    {
      name: 'City',
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: 'State',
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: 'Zip Code',
      selector: (row) => row.zipCode,
      sortable: true,
    },
  ];

  /**
  * @description Filters the employee data based on the search text.
  * @type {Array}
  */

  const filteredData = employeeData.filter((item) =>
    Object.values(item).some(
      (val) =>
        typeof val === 'string' && val.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  /**
  * @description Component to display when no data is available.
  * @type {JSX.Element}
  */
  
  const noDataComponent = (
    <div>
      <p>No data available in this list</p>
    </div>
  );

  return (
    <div className={styles.tableContainer}>
      <h1>Current employees</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search..."
          name="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={styles.inputSearch}
          aria-label="Search employees"
        />
        <AiOutlineSearch className={styles.searchIcon} />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        noHeader
        noDataComponent={noDataComponent}
        pagination
        responsive
        sortActive
        persistTableHead
        highlightOnHover
        className={styles.DataTable}
        customStyles={{ headRow: 
          { style: 
            { 
              backgroundColor: '#5A6F08',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px',
            }
          }}}
        aria-label="Table of current employees"
        aria-describedby="Table of current employees"
      />
    </div>
  );
}