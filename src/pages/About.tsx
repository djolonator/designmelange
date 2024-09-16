import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const About: React.FC = () => {
  return (
    <Box>
      <Text fontSize="2xl">About Us</Text>
      <Box bg="gray.100" height="200px" rounded="md" mt={4}>
        About Page Content
      </Box>
    </Box>
  );
};

export default About;