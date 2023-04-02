
import { useState } from "react";
import { useDispatch } from "react-redux";
import {register} from './reducers/authSlice';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [getForm,setForm] = useState({
        userName:'',
        email:'',
        password:''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeHandler=(event)=>{
        setForm({...getForm,[event.target.name]:event.target.value})
    }

    const onSubmitHandler=(event)=>{
         event.preventDefault();
         dispatch(register(getForm));
         navigate('login');
    }


    return (<div className="row">
        <div className="col-4"></div>
        <div className="col-4">
            <form>
                <div className="form-group">
                    <label>User Name</label>
                    <input type="text" className="form-control" name="userName" onChange={onChangeHandler} />

                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control"  name="email" onChange={onChangeHandler} />
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
export default Register;