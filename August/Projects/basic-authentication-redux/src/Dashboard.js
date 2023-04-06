import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { initialProductList } from "./reducers/productSlice";

const Dashboard = () => {

    const authentication = useSelector((state) => state.auth.authentication);
    const list = useSelector((state) => state.product.productList);
    const dispatch = useDispatch();
    const navigation = useNavigate();

    useEffect(() => {
        let result = authentication ? authentication : Boolean(sessionStorage.getItem('authentication'));
        if (!result) {
            navigation('/');
        }

    }, [authentication])

    useEffect(() => {
        axios.get('http://localhost:3000/productList').then((result) => {
            dispatch(initialProductList(result.data));
        })
    }, [])

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
                    {
                        list.map((obj, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{obj.name}</td>
                                    <td>{obj.price}</td>
                                    <td>{obj.price}</td>
                                    <td><button>Delete</button></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
        <div className="col-2"></div>
    </div>)
}
export default Dashboard;