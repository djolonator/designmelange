


export const callLoginEndpoint = async () => {
    const response =  await fetch(
        process.env.REACT_APP_API_BASE_URL + "/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: '',
            password: '',
          }),
        }
      );

      if(response.ok){
        const json = await response.json();
      }
}