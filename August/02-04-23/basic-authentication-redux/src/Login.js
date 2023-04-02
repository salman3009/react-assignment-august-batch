import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {login} from './reducers/authSlice';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [getForm,setForm] = useState({
        email:'',
        password:''
    });
    const {email,password} = useSelector((state)=>state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeHandler=(event)=>{
        setForm({...getForm,[event.target.name]:event.target.value})
    }

    const onSubmitHandler=(event)=>{
         event.preventDefault();
         if(email === getForm.email && password === getForm.password){
            dispatch(login());
            navigate('dashboard');
         }
         else{
            alert("email and password no match");
         }
        
    }


    return (<div className="row">
        <div className="col-4"></div>
        <div className="col-4">
            <form>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control"  name="email" onChange={onChangeHandler}/>
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