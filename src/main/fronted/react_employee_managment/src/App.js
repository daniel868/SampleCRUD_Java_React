import './App.css';
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import UpdateEmployeeComponent from "./components/UpdateEmployeeComponent";
import EmployeeDetailsComponent from "./components/EmployeeDetailsComponent";

function App() {
    return (
        <div>
            <Router>
                <div className="container">
                    <HeaderComponent/>
                    <div className="container">
                        <Switch>
                            <Route path='/' exact component={ListEmployeeComponent}/>
                            <Route path='/employees' component={ListEmployeeComponent}/>
                            <Route path='/add-employee' component={CreateEmployeeComponent}/>
                            <Route path='/update-employee/:id' component={UpdateEmployeeComponent}/>
                            <Route path='/view-employee/:id' component={EmployeeDetailsComponent}/>
                        </Switch>
                    </div>
                    <FooterComponent/>
                </div>
            </Router>
        </div>
    );
}

export default App;
