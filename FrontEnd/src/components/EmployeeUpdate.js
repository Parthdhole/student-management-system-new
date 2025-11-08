import React, { useState } from "react";
import axios from "axios";

const EmployeeUpdate = () => {
  const [id, setId] = useState("");
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/employees/${id}`, employee);
    alert("Employee updated successfully!");
    setEmployee({ firstName: "", lastName: "", email: "" });
    setId("");
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={updateEmployee}>
        <input
          type="text"
          placeholder="Employee ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={employee.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={employee.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EmployeeUpdate;
