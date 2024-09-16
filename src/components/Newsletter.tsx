import React from 'react';
import { Box, Flex, Text, Input, Button } from '@chakra-ui/react';

const Newsletter: React.FC = () => {
  return (
    <Box textAlign="center">
      <Text mb={2} fontWeight="bold">
        Newsletter
      </Text>
      <Flex
        direction={{ base: "column", sm: "row" }} // Stack vertically on small screens, inline on larger screens
        align="center"
        justify="center"
        gap={2} // Space between input and button
        wrap="wrap" // Ensure items wrap if there's not enough space
      >
        <Input
          placeholder="Enter your email"
          width={{ base: "100%", sm: "auto" }} // Full width on small screens, auto width on larger screens
        />
        <Button colorScheme="teal">Subscribe</Button>
      </Flex>
    </Box>
  );
};

export default Newsletter;