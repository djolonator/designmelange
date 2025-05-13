import React, {useEffect} from 'react';
import { Box, Container } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import {isUserAuthenticated} from '../lib/utils/auth';
import { useNavigate } from "react-router";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  if (!isUserAuthenticated()) {
    return null; // dunno if this needed; prevent rendering while redirecting
  }

  return (
    <Box>
      <Header />
      <Container
        maxW={{ base: "100%", md: "100%", lg: "100%", xl: "70%"}} 
        mx="auto" 
        p={10}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;