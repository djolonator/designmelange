import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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