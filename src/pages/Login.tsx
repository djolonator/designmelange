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
const Login: React.FC = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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
    </Container>
  );
};

export default Login;
