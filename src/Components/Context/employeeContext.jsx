import React, { useState, useEffect } from "react";

const EmployeeContext = React.createContext();
export default EmployeeContext;

export function EmployeeProvider({ children }) {

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const initialEmployees = JSON.parse(localStorage.getItem("employees")) || [];
  const [employees, setEmployees] = useState(initialEmployees);
  const [employee, setEmployee] = useState(initialEmployees);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const resetEmployee = () => {
    setEmployee({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      startDate: "",
      state: "",
      street: "",
      city: "",
      zipCode: "",
      department: "",
    });
  };

  const value = {
    employee,
    setEmployee,
    employees, 
    setEmployees,
    errors,
    setErrors,
    showErrors,
    setShowErrors,
    addEmployee,
    resetEmployee,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}