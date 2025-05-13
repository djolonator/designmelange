import {login} from './apiCalls'
import {refresh} from './apiCalls'

//todo set state
const isTokenExpired = (expiryTime:number) => {
    return Date.now() > expiryTime;
  }

const getToken = async ()  =>{
    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('userPassword');         

    const loginReposnse = await login(userEmail!, userPassword!);
    const loginReposnseJson = await loginReposnse.json();
    
    setToken(loginReposnseJson.accessToken, loginReposnseJson.expiresIn, loginReposnseJson.refreshToken);

}

const getRefreshToken = async() =>{
    const refreshToken = localStorage.getItem("refreshToken");     

    const refreshResponse = await refresh(refreshToken!);
    const refreshResponseJson = await refreshResponse.json();

    setToken(refreshResponseJson.accessToken, refreshResponseJson.expiresIn, refreshResponseJson.refreshToken);
}

const setToken = (accessToken:string,expiresIn:number, refreshToken:string ) => {
    localStorage.setItem("accessToken",accessToken);
    const expiresInString = Date.now() + (expiresIn - 60) * 1000;      
    localStorage.setItem("expiresAt", expiresIn.toString());
    localStorage.setItem("refreshToken", refreshToken);
}

export const token = async () => {

    const expiresAt = localStorage.getItem("expiresAt");
    console.log("expiresAt", expiresAt);
    console.log("isTokenExpired", isTokenExpired(Number(expiresAt)));
    if (expiresAt && isTokenExpired(Number(expiresAt))){

        const refreshToken = localStorage.getItem("refreshToken"); 
        const refreshResponse = await refresh(refreshToken!);

        if (refreshResponse.status === 200){
            const refreshResponseJson = await refreshResponse.json();
            setToken(refreshResponseJson.accessToken, refreshResponseJson.expiresIn, refreshResponseJson.refreshToken);
        }else{
            await getToken();
        }
        
    }
    return localStorage.getItem("accessToken");
  
};
