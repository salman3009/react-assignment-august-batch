import axios from 'axios';

export const authenticate=(response,next)=>{
    sessionStorage.setItem('status',"Y");
 sessionStorage.setItem('auth-token',response.data.auth_token);
 sessionStorage.setItem('refresh-token',response.data.refresh_token);
 next();
}

export const refreshTokens = async()=>{
    try{
        await axios.get("http://localhost:5001/api/auth/refresh").then((response)=>{
            sessionStorage.setItem('auth-token',response.data.auth_token);
            sessionStorage.setItem('status',"Y");
        })

    }catch(err){
        console.log("refreshtoken error",err);
    }
}
