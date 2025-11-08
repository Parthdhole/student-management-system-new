package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.EmployeeDto;
import com.example.demo.entity.Employee;

public interface EmployeeService {

	
	EmployeeDto CreateEmployee(EmployeeDto dto) ;
	EmployeeDto getEmployeeById(Long EmployeeId);
	List<EmployeeDto>  getAllEmployee();
	EmployeeDto UpdateEmployee(Long EmployeeId,EmployeeDto updateEmployee );
	void DeleterEmployee(Long EmployeeId);
		
	}

