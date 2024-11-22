


export const login = async (email:string, password: string) => {
    const response =  await fetch(
        process.env.REACT_APP_API_BASE_URL + "/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      return response;
}

export const register = async (email:string, password: string) => {
  const response =  await fetch(
      process.env.REACT_APP_API_BASE_URL + "/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    return response;
}