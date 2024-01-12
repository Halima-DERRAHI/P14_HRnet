import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addEmployeeData } from '../../Components/Store/formSlice';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import statesData from '../../Components/Data/states.json';
import Modal from 'p14-react-modal-derrahi'
import checkIcon from '../../assets/checkmarkIcon.png';
import errorIcon from '../../assets/errorIcon.svg';
import styles from './Home.module.css';

/**
 * @description Component for creating a new employee.
 * @returns {JSX.Element} New employee creation component.
 */

export default function Home() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialEmployeeData = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: '',
  };

  const [employeeData, setEmployeeData] = useState(initialEmployeeData);
  const [errors, setErrors] = useState(initialEmployeeData);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * @description Handles changes in input fields.
   * @param {Object} e - Event object.
   */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? '' : `${name} is required`,
    }));
  };

  /**
   * @description Validates the form data.
   * @returns {boolean} Validation result.
   */

  const validateForm = () => {
    const newErrors = { ...initialEmployeeData };
    let isValid = true;
  
    for (const field in employeeData) {
      if (!employeeData[field]) {
        newErrors[field] = `${field} is required`;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };  

  /**
   * @description Validates the dates for the employee.
   * @returns {boolean} Validation result.
   */

  const validateDates = () => {
    const { dateOfBirth, startDate } = employeeData;
  
    if (dateOfBirth && startDate) {
      const birthDate = new Date(dateOfBirth);
      const start = new Date(startDate);
  
      if (start <= birthDate) {
        setErrors({
          ...errors,
          startDate: 'Start date must be later than date of birth',
        });
        return false;
      }
    }
  
    return true;
  };

  const existingEmployees = useSelector((state) => state.form.employeeData);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const isFormValid = validateForm();
    const areDatesValid = validateDates();
  
    if (isFormValid && areDatesValid) {

      const isEmployeeExists = existingEmployees.some((employee) =>
        employee.firstName === employeeData.firstName &&
        employee.lastName === employeeData.lastName
      );
  
      if (isEmployeeExists) {
        setErrorMessage('This employee already exists in the database');
        setIsErrorModalVisible(true);
      } else {
        dispatch(addEmployeeData(employeeData));
        setIsSuccessModalVisible(true);
        setEmployeeData(initialEmployeeData);
        setErrors(initialEmployeeData);
      }
    } else {
      setIsErrorModalVisible(true);
      if (!isFormValid) {
        setErrorMessage('Please fill out all required fields');
      } else if (!areDatesValid) {
        setErrorMessage('Start date must be later than date of birth');
      }
    }
  };
  
  const handleSuccessModalButtonClick = () => {
    setIsSuccessModalVisible(false);
    navigate('/view');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create a new employee</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          maxLength={30}
          value={employeeData.firstName}
          onChange={handleChange}
          aria-label="First Name"
        />
        {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}

        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          maxLength={30}
          value={employeeData.lastName}
          onChange={handleChange}
          aria-label="Last Name"
        />
        {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}

        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          id="dateOfBirth"
          type="date"
          name="dateOfBirth"
          max="2009-01-31"
          value={employeeData.dateOfBirth}
          onChange={handleChange}
          aria-label="Date of Birth"
        />
        {errors.dateOfBirth && <span className={styles.error}>{errors.dateOfBirth}</span>}

        <label htmlFor="startDate">Start Date:</label>
        <input
          id="startDate"
          type="date"
          name="startDate"
          value={employeeData.startDate}
          onChange={handleChange}
          aria-label="Start Date"
        />
        {errors.startDate && <span className={styles.error}>{errors.startDate}</span>}

        <fieldset className={styles.addressContainer}>
          <legend>Address</legend>
          <div>
            <label htmlFor="street">Street:</label>
            <input
              id="street"
              type="text"
              name="street"
              maxLength={30}
              value={employeeData.street}
              onChange={handleChange}
              aria-label="Street"
            />
            {errors.street && <span className={styles.error}>{errors.street}</span>}

            <label htmlFor="city">City:</label>
            <input
              id="city"
              type="text"
              name="city"
              maxLength={30}
              value={employeeData.city}
              onChange={handleChange}
              aria-label="City"
            />
            {errors.city && <span className={styles.error}>{errors.city}</span>}

            <label>State:</label>
            <Dropdown
              options={statesData.map((state) => ({ value: state.abbreviation, label: state.name }))}
              value={employeeData.state}
              onChange={(selected) => handleChange({ target: { name: 'state', value: selected.value } })}
              placeholder="Select State"
            />
            {errors.state && <span className={styles.error}>{errors.state}</span>}

            <label htmlFor="zipCode">Zip Code:</label>
            <input
              id="zipCode"
              type="text"
              name="zipCode"
              maxLength={15}
              value={employeeData.zipCode}
              onChange={handleChange}
              aria-label="Zip Code"
            />
            {errors.zipCode && <span className={styles.error}>{errors.zipCode}</span>}
          </div>
        </fieldset>

        <label>Department:</label>
        <Dropdown
          options={[
            { value: 'Sales', label: 'Sales' },
            { value: 'Marketing', label: 'Marketing' },
            { value: 'Engineering', label: 'Engineering' },
            { value: 'Human Resources', label: 'Human Resources' },
            { value: 'Legal', label: 'Legal' },
          ]}
          value={employeeData.department}
          onChange={(selected) => handleChange({ target: { name: 'department', value: selected.value } })}
          placeholder="Select department"
        />
        {errors.department && <span className={styles.error}>{errors.department}</span>}

        <button type="submit" className={styles.formButton} aria-label="Save">Save</button>
      </form>

      {/* Success Modal */}
      {isSuccessModalVisible && (
        <Modal
          icon={checkIcon}
          message="Employee successfully added"
          buttonText="OK"
          onClose={() => setIsSuccessModalVisible(false)}
          onButtonClick={handleSuccessModalButtonClick}
        />
      )}

      {/* Error Modal */}
      {isErrorModalVisible && (
        <Modal
          icon={errorIcon}
          message={errorMessage}
          buttonText="Return"
          onClose={() => setIsErrorModalVisible(false)}
          onButtonClick={() => setIsErrorModalVisible(false)}
          buttonColor="rgb(204 10 10)"
        />
      )}
    </div>
  );
}