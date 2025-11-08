package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.EmployeeDto;
import com.example.demo.entity.Employee;
import com.example.demo.service.EmployeeService;
import com.example.demo.service.impl.EmpoloyeeSeviceImp;

import lombok.AllArgsConstructor;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
	
	 @Autowired
	private EmpoloyeeSeviceImp employeeService;
	
	// build add Employee Restapi
	//UI (JSON) → DTO → Entity (via Mapper) → Repository (DB) → Entity → DTO (via Mapper) → Controller → UI
	@PostMapping
	public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
	EmployeeDto saveEmployee=employeeService.CreateEmployee(employeeDto);
	return new ResponseEntity<EmployeeDto>(saveEmployee, HttpStatus.CREATED);
		
		
	}
	
	// build  get Employee Restapi
	@GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long EmployeeId) {
        EmployeeDto dto = employeeService.getEmployeeById(EmployeeId);
        return ResponseEntity.ok(dto);
    }
	
	@GetMapping
	public ResponseEntity<List<EmployeeDto>>  getAllEmployee() {
		List<EmployeeDto> employee=employeeService.getAllEmployee();
		return ResponseEntity.ok(employee);
		
	}
	@PutMapping("{id}")
	public ResponseEntity<EmployeeDto> UpdateEmployee(@PathVariable("id") Long EmployeeId,@RequestBody EmployeeDto updateEmployee ) {
	      EmployeeDto employee=employeeService.UpdateEmployee(EmployeeId, updateEmployee);
		return ResponseEntity.ok(employee);
		
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<String> DeleterEmployee(@PathVariable("id") Long EmployeeId) {
		   
		 employeeService.DeleterEmployee(EmployeeId);
		 return ResponseEntity.ok("employee deleted Sucesfully ");
		
	}

}
