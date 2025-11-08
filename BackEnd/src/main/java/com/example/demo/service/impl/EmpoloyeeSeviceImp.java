package com.example.demo.service.impl;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.dto.EmployeeDto;
import com.example.demo.entity.Employee;
import com.example.demo.mapper.EmployeMapper;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.service.EmployeeService;

import lombok.AllArgsConstructor;


@Service
public class EmpoloyeeSeviceImp implements EmployeeService {
	
	 @Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public EmployeeDto CreateEmployee(EmployeeDto dto) {
		// we can convert here EmployeeDto to Employeejpa repository for storing this data it employee data base
		// TODO Auto-generated method stub
		Employee employee = EmployeMapper.mapEmployee(dto);
		Employee savedEmployee=employeeRepository.save(employee);
		//to give the data to the back to client
		return EmployeMapper.mapEmployeeDto(savedEmployee);
	}

	
	@Override
    public EmployeeDto getEmployeeById(Long EmployeeId) {
        Employee employee = employeeRepository.findById(EmployeeId)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + EmployeeId));
        return EmployeMapper.mapEmployeeDto(employee);
    }


	@Override
	public List<EmployeeDto> getAllEmployee() {
		List<Employee> employee= employeeRepository.findAll();
	
		return employee.stream()
			    .map(EmployeMapper::mapEmployeeDto)
			    .collect(Collectors.toList());
		}


	@Override
	public EmployeeDto UpdateEmployee(Long EmployeeId, EmployeeDto updateEmployee) {
		 Employee employee = employeeRepository.findById(EmployeeId)
		            .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + EmployeeId));
		 
		 employee.setFirstName(updateEmployee.getFirstName());
		 employee.setLastName(updateEmployee.getLastName());
		 employee.setEmail(updateEmployee.getEmail());
		 
		Employee UpdatedEmployeeObj= employeeRepository.save(employee);
		return EmployeMapper.mapEmployeeDto(UpdatedEmployeeObj);
	}


	@Override
	public void DeleterEmployee(Long EmployeeId) {
		 Employee employee = employeeRepository.findById(EmployeeId)
		            .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + EmployeeId));
		   
		 
		               employeeRepository.deleteById(EmployeeId);
		
	}




	
	
	
	

}
