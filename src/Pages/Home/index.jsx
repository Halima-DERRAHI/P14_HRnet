import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployeeData } from '../../Components/Store/formSlice';
import statesData from '../../Components/Data/states.json';
import styles from './Home.module.css';

function Home() {

  const dispatch = useDispatch();

  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    department: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      address: {
        ...employeeData.address,
        [name]: value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEmployeeData(employeeData));
    setEmployeeData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      department: ''
    });
  };

  return (
    <div className={styles.container}>
      <h1>Create a new employee</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={employeeData.firstName}
          onChange={handleChange}
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={employeeData.lastName}
          onChange={handleChange}
        />
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={employeeData.dateOfBirth}
          onChange={handleChange}
        />
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={employeeData.startDate}
          onChange={handleChange}
        />
        <fieldset className={styles.addressContainer}>
          <legend>Address</legend>
          <div>
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={employeeData.address.street}
              onChange={handleAddressChange}
            />
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={employeeData.address.city}
              onChange={handleAddressChange}
            />
            <label>State:</label>
            <select
              name="state"
              className={styles.select}
              value={employeeData.address.state}
              onChange={handleAddressChange}
            >
              <option value="">Select State</option>
              {statesData.map((state, index) => (
                <option key={index} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </select>
            <label>Zip Code:</label>
            <input
              type="text"
              name="zipCode"
              value={employeeData.address.zipCode}
              onChange={handleAddressChange}
            />
          </div>
        </fieldset>
        <label>Department:</label>
        <select 
        name="department" 
        id="department"
        className={styles.select}
        value={employeeData.department}
        onChange={handleChange}
        >
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Home;