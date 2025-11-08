import React, { useState, useEffect } from "react";

const EmployeeApp = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    })
      .then((res) => res.json())
      .then((newEmp) => {
        alert("Employee added successfully!");
        setEmployees([...employees, newEmp]);
        setEmployee({ id: "", firstName: "", lastName: "", email: "" });
      })
      .catch((err) => console.error(err));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/employees/${employee.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    })
      .then((res) => res.json())
      .then((updatedEmp) => {
        alert("Employee updated successfully!");
        setEmployees(
          employees.map((emp) =>
            emp.id === updatedEmp.id ? updatedEmp : emp
          )
        );
        setEditing(false);
        setEmployee({ id: "", firstName: "", lastName: "", email: "" });
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      fetch(`http://localhost:8080/api/employees/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Employee deleted successfully!");
          setEmployees(employees.filter((emp) => emp.id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (emp) => {
    setEditing(true);
    setEmployee(emp);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Employee Management</h2>

      <form onSubmit={editing ? handleUpdate : handleAdd}>
        <div>
          <label>ID: </label>
          <input
            type="number"
            name="id"
            value={employee.id}
            onChange={handleChange}
            required
            disabled={editing} // disable ID when updating
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

        <button type="submit">{editing ? "Update" : "Add"}</button>
      </form>

      <h3>All Employees</h3>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Actions</th>
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
                <button onClick={() => handleEdit(emp)}>Edit</button>{" "}
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeApp;
