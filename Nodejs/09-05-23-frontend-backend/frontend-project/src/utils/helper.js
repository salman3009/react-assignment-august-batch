

export const authenticate=(response,next)=>{
 sessionStorage.setItem('auth-token',response.data.auth_token);
 next();
}