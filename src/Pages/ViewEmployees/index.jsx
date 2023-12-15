import React, {useState} from 'react';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import styles from './ViewEmployees.module.css'
import { AiOutlineSearch } from 'react-icons/ai';

function ViewEmployees() {

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
      selector: (row) => row.address.street,
      sortable: true,
    },
    {
      name: 'City',
      selector: (row) => row.address.city,
      sortable: true,
    },
    {
      name: 'State',
      selector: (row) => row.address.state,
      sortable: true,
    },
    {
      name: 'Zip Code',
      selector: (row) => row.address.zipCode,
      sortable: true,
    },
  ];

  const filteredData = employeeData.filter((item) =>
    Object.values(item).some(
      (val) =>
        typeof val === 'string' && val.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const noDataComponent = (
    <div>
      <p>No data available in table</p>
    </div>
  );

  return (
    <div className={styles.tableContainer}>
       <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={styles.inputSearch}
        />
        <AiOutlineSearch className={styles.searchIcon} />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        noHeader
        noDataComponent={noDataComponent}
        pagination
        sortActive
        persistTableHead
        className={styles.DataTable}
      />
    </div>
  );
}

export default ViewEmployees;