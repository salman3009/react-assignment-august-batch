import axios from 'axios';

export default function Register() {

    const handleSubmit= async (event)=>{
        try{
            event.preventDefault();
            const name = event.target.name.value;
            const email = event.target.email.value;
            const password = event.target.password.value;

           let result =  await axios.post('http://localhost:5001/api/auth/register',{name,email,password});
           console.log(result);
        }catch(e){
            console.log("error",e);
        }   

    }
    return (<div className="container">
        <div className="col-4">

        </div>
        <div className="col-4">
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" required/>         
                </div>
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