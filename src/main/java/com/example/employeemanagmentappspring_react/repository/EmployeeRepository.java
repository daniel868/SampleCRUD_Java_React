package com.example.employeemanagmentappspring_react.repository;

import com.example.employeemanagmentappspring_react.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
