import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from './reducers/authSlice';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {

    const [getForm, setForm] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setForm({ ...getForm, [event.target.name]: event.target.value })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:3000/registration?email=${getForm.email}&password=${getForm.password}`).
            then((result) => {
                if (result.data && result.data.length > 0) {
                    dispatch(login(result.data[0]));
                    navigate('/dashboard');
                }
                else{
                    alert("invalid email and password");
                }
            })

    }


    return (<div className="row">
        <div className="col-4"></div>
        <div className="col-4">
            <form>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" name="email" onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChangeHandler} />
                </div>
                <button onClick={onSubmitHandler} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        <div className="col-4"></div>
    </div>)
}
export default Login;