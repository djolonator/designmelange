import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Container,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import ErrorMessagesForRegister from '../components/ErrorMessagesForRegister';
import {ErrorResponse} from '../lib/types/models';
import {register} from '../lib/utils/apiCalls'

const Register: React.FC = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [responseErrorMessage, setResponseErrorMessage] = useState<ErrorResponse|null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await register(userCredentials.email, userCredentials.password);
      if (response.ok) {
        setResponseMessage("Registered successfully");
        setResponseErrorMessage(null);
      } else {
        const responseData = await response.json();
        if (responseData.errors){
          setResponseMessage('');
          setResponseErrorMessage(responseData);
        }
      }
    } catch (error) {
      setResponseMessage("Something went wrong");
      setResponseErrorMessage(null);
    }
  };

  return (
    <Container>
      <h1>Register</h1>
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
        <Button onClick={handleRegister}>Register</Button>
      </FormControl>
      <Box>
        <p style={{ display: "inline" }}>Allready have account?</p>
        <RouterLink to="/login" style={{ textDecoration: "none" }}>
          <p style={{ display: "inline" }}> Login</p>
        </RouterLink>
      </Box>
      <p>{responseMessage}</p>
      <ErrorMessagesForRegister errorResponse={responseErrorMessage}></ErrorMessagesForRegister>
    </Container>
  );
};

export default Register;
