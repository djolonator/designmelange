import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Contact: React.FC = () => {
  return (
    <Box>
      <Text fontSize="2xl">Contact Us</Text>
      <Box bg="gray.100" height="200px" rounded="md" mt={4}>
        Contact Page Content
      </Box>
    </Box>
  );
};

export default Contact;