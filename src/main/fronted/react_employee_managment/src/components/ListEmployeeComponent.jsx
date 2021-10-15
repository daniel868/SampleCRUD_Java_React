import React, {Component} from "react";
import EmployeeService from "../servicies/EmployeeService";
import data from "bootstrap/js/src/dom/data";

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.viewDetailsEmployee = this.viewDetailsEmployee.bind(this);
    }

    componentDidMount() {
        //call here API Call (after the component is created)
        EmployeeService.getEmployees().then((response) => {
            this.setState({employees: response.data});
            console.log(response.data)
        });
    }

    addEmployee() {
        this.props.history.push('/add-employee');
    }

    editEmployee(id) {
        console.log("Employee id: " + id);
        this.props.history.push(`/update-employee/${id}`)
    }

    deleteEmployee(id) {
        console.log("Deleted employee: " + id)
        EmployeeService.deleteEmployee(id).then(response=>{
            console.log(response)
            this.setState({
                employees: this.state.employees.filter(employee => employee.id !==id)
            });
        });
    }

    viewDetailsEmployee(id){
        console.log("Details employee: " + id)
        this.props.history.push(`/view-employee/${id}`);
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email Id</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.employees.map(
                                employee =>
                                    <tr key={employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.email}</td>
                                        <td>
                                            <button onClick={() => this.editEmployee(employee.id)}
                                                    className="btn btn-info">Update
                                            </button>
                                            <button onClick={() => this.deleteEmployee(employee.id)}
                                                    className="btn btn-danger" style={{marginLeft: "10px"}}>Delete
                                            </button>
                                            <button onClick={() => this.viewDetailsEmployee(employee.id)}
                                                    className="btn btn-info" style={{marginLeft: "10px"}}>View Details
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListEmployeeComponent