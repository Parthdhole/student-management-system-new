import React, { useState, useEffect } from "react";

function EmployeeForm({ selectedEmployee, onSave }) {
  const [employee, setEmployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  // Load data when editing
  useEffect(() => {
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = selectedEmployee
      ? `http://localhost:8080/api/employees/${employee.id}` // PUT for update
      : "http://localhost:8080/api/employees";              // POST for add

    const method = selectedEmployee ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong");
        return res.json();
      })
      .then((data) => {
        alert(selectedEmployee ? "Employee Updated!" : "Employee Added!");
        onSave(); // refresh list
        setEmployee({ id: "", firstName: "", lastName: "", email: "" });
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      <h3>{selectedEmployee ? "Update Employee" : "Add Employee"}</h3>

      {/* Manual ID Input */}
      <div>
        <label>ID: </label>
        <input
          type="number"
          name="id"
          value={employee.id}
          onChange={handleChange}
          required
          disabled={selectedEmployee} // prevent editing ID on update
        />
      </div>

      <div>
        <label>First Name: </label>
        <input
          type="text"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Last Name: </label>
        <input
          type="text"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">
        {selectedEmployee ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default EmployeeForm;
