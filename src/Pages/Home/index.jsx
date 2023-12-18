import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployeeData } from '../../Components/Store/formSlice';
import statesData from '../../Components/Data/states.json';
import Modal from '../../Components/Modal'
import checkIcon from '../../assets/checkmarkIcon.png'
// import errorIcon from '../../assets/errorIcon.svg'
import styles from './Home.module.css';

function Home() {

  const dispatch = useDispatch();

  const initialEmployeeData = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    department: '',
  };
  
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);
  const [errors, setErrors] = useState(initialEmployeeData);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: value ? '' : `${name} is required`,
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
    setErrors({
      ...errors,
      address: {
        ...errors.address,
        [name]: value ? '' : `${name} is required`,
      },
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    for (const field in employeeData) {
      if (!employeeData[field]) {
        newErrors[field] = `${field} is required`;
        isValid = false;
      }
    }

    for (const field in employeeData.address) {
      if (!employeeData.address[field]) {
        newErrors.address = {
          ...newErrors.address,
          [field]: `${field} is required`,
        };
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(addEmployeeData(employeeData));
      setEmployeeData(initialEmployeeData);
      setErrors(initialEmployeeData);
    }
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleModalButtonClick = () => {
    handleCloseModal(); 
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
        {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={employeeData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}

        <label>Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={employeeData.dateOfBirth}
          onChange={handleChange}
        />
        {errors.dateOfBirth && <span className={styles.error}>{errors.dateOfBirth}</span>}

        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={employeeData.startDate}
          onChange={handleChange}
        />
        {errors.startDate && <span className={styles.error}>{errors.startDate}</span>}

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
            {errors.address.street && <span className={styles.error}>{errors.address.street}</span>}

            <label>City:</label>
            <input
              type="text"
              name="city"
              value={employeeData.address.city}
              onChange={handleAddressChange}
            />
            {errors.address.city && <span className={styles.error}>{errors.address.city}</span>}

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
            {errors.address.state && <span className={styles.error}>{errors.address.state}</span>}

            <label>Zip Code:</label>
            <input
              type="text"
              name="zipCode"
              value={employeeData.address.zipCode}
              onChange={handleAddressChange}
            />
            {errors.address.zipCode && <span className={styles.error}>{errors.address.zipCode}</span>}

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
          <option value="">Select departement</option>
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
        {errors.department && <span className={styles.error}>{errors.department}</span>}

        <button type="submit">Save</button>
      </form>

      <button onClick={handleOpenModal}>Open success Modal</button>
      {isModalVisible && (
        <Modal
          icon={checkIcon}
          title="Employee successfully added"
          buttonText="OK"
          onClose={handleCloseModal}
          onButtonClick={handleModalButtonClick}
        />
      )}

      {/* <button onClick={handleOpenModal}>Open error Modal</button>
      {isModalVisible && (
        <Modal
          icon={errorIcon}
          title="Employee cann't be added"
          buttonText="Return"
          onClose={handleCloseModal}
          onButtonClick={handleModalButtonClick}
        />
      )} */}
    </div>
  );
}

export default Home;