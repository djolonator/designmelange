import {login} from './apiCalls'
import {refresh} from './apiCalls'

//todo set state
const isTokenExpired = (expiryTime:number) => {
    return Date.now() > expiryTime;
  }

const getToken = async ()  =>{
    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('userPassword');         //this is set, todo

    const loginReposnse = await login(userEmail!, userPassword!);
    const loginReposnseJson = await loginReposnse.json();
    
    setToken(loginReposnseJson.accessToken, loginReposnseJson.expiresIn, loginReposnseJson.refreshToken);

}

const getRefreshToken = async() =>{
    const refreshToken = localStorage.getItem("refreshToken");      //this is set, todo

    const refreshResponse = await refresh(refreshToken!);
    const refreshResponseJson = await refreshResponse.json();

    setToken(refreshResponseJson.accessToken, refreshResponseJson.expiresIn, refreshResponseJson.refreshToken);
}

const setToken = (accessToken:string,expiresIn:number, refreshToken:string ) => {
    localStorage.setItem("accessToken",accessToken);
    const expiresInString = Date.now() + (expiresIn - 60) * 1000;       //removed 60 sec 
    localStorage.setItem("expiresAt", expiresIn.toString());
    localStorage.setItem("refreshToken", refreshToken);
}



export const token = async () => {

    const expiresAt = localStorage.getItem("expiresAt");

    if (expiresAt){
        if(isTokenExpired(Number(expiresAt))){
            await getRefreshToken();
        }
    }
    else{
       await getToken();
    }
    return localStorage.getItem("accessToken");
  
};
