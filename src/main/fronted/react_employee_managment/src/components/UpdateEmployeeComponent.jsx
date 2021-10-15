import React, {Component} from 'react';
import EmployeeService from "../servicies/EmployeeService";

class UpdateEmployeeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            email: '',
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailAddress = this.changeEmailAddress.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(response => {
            let employee = response.data;
            this.setState({
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email
            });
        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let updatedEmployee = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email};
        console.log('employee =>' + JSON.stringify(updatedEmployee));

        EmployeeService.updateEmployee(updatedEmployee,this.state.id).then(res=>{
            console.log(res);
            this.props.history.push('/employees')
        })

    }

    cancel() {
        this.props.history.push('/employees');
    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }
    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }
    changeEmailAddress = (event) => {
        this.setState({email: event.target.value});
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Employee</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                               value={this.state.firstName} onChange={this.changeFirstNameHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                               value={this.state.lastName} onChange={this.changeLastNameHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input placeholder="Email Address" name="emailAddress" className="form-control"
                                               value={this.state.email} onChange={this.changeEmailAddress}
                                        />
                                    </div>
                                    <button className="btn btn-success" style={{marginTop: "10px"}}
                                            onClick={this.updateEmployee}>Update
                                    </button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                            style={{marginLeft: "10px", marginTop: "10px"}}>Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateEmployeeComponent;