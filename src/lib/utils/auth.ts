export const isUserAuthenticated = () =>{
    const email = localStorage.getItem('userEmail');
    const pass = localStorage.getItem('userPassword');

    if (email && pass){
        return true;
    }
    else{
        return false;
    }
}

export const isUserAuthorized = () =>{
    const tokenExpiry = Number(localStorage.getItem('expiresAt'));
    const currentTime = new Date().getTime();
    
    if (tokenExpiry && tokenExpiry<currentTime){
        return true;
    }
    else{
        return false;
    }
}

//todo state