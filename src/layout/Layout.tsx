import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import {isUserAuthenticated} from '../lib/utils/auth';
import { useNavigate } from "react-router";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const navigate = useNavigate();
  if (!isUserAuthenticated()){
    navigate('/login');
  }

  return (
    <Box>
      <Header />
      <Box 
        maxW={{ base: "100%", md: "100%", lg: "100%", xl: "70%" }} 
        mx="auto" 
        p={10}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;