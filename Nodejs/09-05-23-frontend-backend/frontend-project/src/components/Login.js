import axios from 'axios';
import {authenticate} from '../utils/helper';

export default function Login({history}) {

    const handleSubmit= async (event)=>{
        try{
            event.preventDefault();
            const email = event.target.email.value;
            const password = event.target.password.value;

           let result =  await axios.post('http://localhost:5001/api/auth/login',{email,password});
           console.log(result);
            authenticate(result);
            history.push('/dashboard');
        }catch(e){
            console.log("error",e);
            history.push('/');
        }   

    }
    return (<div className="container">
        <div className="col-4">

        </div>
        <div className="col-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name="email" required/>
                        
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
        <div className="col-4">

        </div>

    </div>)
}