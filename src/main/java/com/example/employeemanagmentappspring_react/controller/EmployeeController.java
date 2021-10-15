package com.example.employeemanagmentappspring_react.controller;

import com.example.employeemanagmentappspring_react.exception.ResourceNotFoundException;
import com.example.employeemanagmentappspring_react.model.Employee;
import com.example.employeemanagmentappspring_react.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin("*")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    //get all employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    //create employee rest api
    @PostMapping("/employees")
    @CrossOrigin("*")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Employee with id: " + id + " not found")
        );
        return ResponseEntity.ok(employee);
    }

    @CrossOrigin("*")
    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee newEmployee) {
        Employee oldEmployee = employeeRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Employee with id: " + id + " not found")
        );

        if (newEmployee.getFirstName() == null && newEmployee.getLastName() == null && newEmployee.getEmail() == null) {
            Employee updatedEmployee = employeeRepository.save(oldEmployee);
            return ResponseEntity.ok(updatedEmployee);
        } else {

            oldEmployee.setFirstName(newEmployee.getFirstName() == null ? oldEmployee.getFirstName() : newEmployee.getFirstName());
            oldEmployee.setLastName(newEmployee.getLastName() == null ? oldEmployee.getLastName() : newEmployee.getLastName());
            oldEmployee.setEmail(newEmployee.getEmail() == null ? oldEmployee.getEmail() : newEmployee.getEmail());

            Employee updatedEmployee = employeeRepository.save(oldEmployee);
            return ResponseEntity.ok(updatedEmployee);
        }
    }

    //delete employee
    @CrossOrigin("*")
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", true);
        return ResponseEntity.ok(response);
    }
}
