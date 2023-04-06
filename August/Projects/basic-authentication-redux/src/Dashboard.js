import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Dashboard = () => {

    const authentication = useSelector((state)=>state.auth.authentication);
    const navigation = useNavigate();

    useEffect(()=>{
        let result = authentication?authentication:Boolean(sessionStorage.getItem('authentication'));
        if(!result){
          navigation('/');
        }

    },[authentication])

    useEffect(()=>{

    })

    return (<div className="row">
        <div className="col-2"></div>
        <div className="col-8">
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">CreatedBy</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                   
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="col-2"></div>
    </div>)
}
export default Dashboard;