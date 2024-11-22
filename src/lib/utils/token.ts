import {login} from './apiCalls'


const isTokenExpired = (expiryTime:number) => {
    return Date.now() > expiryTime;
  }

const getToken =() =>{
    
}

export const token = () => {

    let accessToken = localStorage.getItem("accessToken");
    const expiresAt = localStorage.getItem("expiresAt");
    const refreshToken = localStorage.getItem("refreshToken");

    localStorage.setItem("accessToken", "");
   // localStorage.setItem("expiresAt", Date.now() + data.expiresIn * 1000);
    localStorage.setItem("refreshToken", "");


    if (expiresAt){
        if(isTokenExpired(Number(expiresAt))){

        }
    }
    else{
       // const loginResponse = login();
    }
    return accessToken;
  
};
