import { BrowserRouter, Switch } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PublicRoute path="/" exact component={Register} />
                <PublicRoute path="/login" exact component={Login}/>
        <PrivateRoute path="/dashboard" exact component={Dashboard}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;