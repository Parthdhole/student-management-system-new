import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const getAllEmployees = async () => {
    const response = await axios.get("http://localhost:8080/api/employees");
    setEmployees(response.data);
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:8080/api/employees/${id}`);
    alert("Employee deleted successfully!");
    getAllEmployees();
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <div>
      <h2>All Employees</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td>
                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
