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
import {login} from '../lib/utils/ApiCalls';
import { useNavigate } from "react-router-dom";
import { showToast } from "../lib/utils/toaster";

const Login: React.FC = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
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
      localStorage.setItem("accessToken", loginReposnseJson.accessToken);
      const expiresIn = Date.now() + loginReposnseJson.expiresIn * 1000;
      localStorage.setItem("expiresAt", expiresIn.toString());
      localStorage.setItem("refreshToken", loginReposnseJson.refreshToken);
      localStorage.setItem("userEmail", userCredentials.email);
      localStorage.setItem("userPassword", userCredentials.password);
      navigate('/');
      showToast('Successfully logged in', true); 
    }
    else{
      showToast('Failed to login', false);  //read error object, just as in register
    }
  };

  const handleGoHomeButton = () => {
    navigate('/');
  }

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
        <Button onClick={handleGoHomeButton}>Back to home</Button>
      </FormControl>
      <Box>
        <p style={{display:'inline'}}>Dont have account?</p>
        <RouterLink to="/register" style={{ textDecoration: "none" }}>
          <p style={{display:'inline'}}> Register</p>
        </RouterLink>
      </Box>
    </Container>
  );
};

export default Login;
