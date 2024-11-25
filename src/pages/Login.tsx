import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Container,
} from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom'; 
import {login} from '../lib/utils/apiCalls';

const Login: React.FC = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });                                                                                 //handle login global state
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginReposnse = await login(userCredentials.email, userCredentials.password);

    if (loginReposnse.ok){
      const loginReposnseJson = await loginReposnse.json();
      setMessage('Successfully logged in');
      localStorage.setItem("accessToken", loginReposnseJson.accessToken);
      const expiresIn = Date.now() + loginReposnseJson.expiresIn * 1000;
      localStorage.setItem("expiresAt", expiresIn.toString());
      localStorage.setItem("refreshToken", loginReposnseJson.refreshToken);

      localStorage.setItem("userEmail", userCredentials.email);
      localStorage.setItem("userPassword", userCredentials.password);
    }
    else{
      setMessage('Failed to login');  //read error object, just as in register
    }

  };

  return (
    <Container>
      <h1>Login</h1>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={userCredentials.email}
          onChange={handleInputChange}
        />
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          placeholder="Password"
          type="phone"
          value={userCredentials.password}
          onChange={handleInputChange}
        />
        <Button onClick={handleLogin}>Login</Button>
      </FormControl>
      <Box>
        <p style={{display:'inline'}}>Dont have account?</p>
        <RouterLink to="/register" style={{ textDecoration: "none" }}>
          <p style={{display:'inline'}}> Register</p>
        </RouterLink>
      </Box>
      <p>{message}</p>
    </Container>
  );
};

export default Login;
