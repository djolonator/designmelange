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

//todo state