

export const authenticate=(response)=>{
 sessionStorage.setItem('auth_token',response.data.auth_token);
}