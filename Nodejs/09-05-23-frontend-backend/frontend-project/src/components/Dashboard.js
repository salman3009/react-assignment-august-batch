import { useEffect, useState } from "react"
import axios from 'axios';


export default function Dashboard({history}){

    const [getUser,setUser] = useState(null);
    useEffect(()=>{
        profileDetails();
    },[])

    const profileDetails= async ()=>{
        try{
          let result = await axios.get("http://localhost:5001/api/user/profile");
          console.log(result);
          setUser(result.data);
        }catch(err){
           console.log(err);
           history.push('/login');
           
        }
     
    }

    return (<div>
        {!getUser?<div>Loading....</div>:<div>{getUser.name}</div>}
    </div>)
}
