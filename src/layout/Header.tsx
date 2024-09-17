import React from 'react';
import { Box, Flex, HStack, IconButton, Stack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
import { useDisclosure } from '@chakra-ui/react';

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.800" px={4} width="100%">
      <Box  maxW={{ base: "100%", md: "100%", lg: "70%" }} mx="auto">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box color="white">Logo</Box>

          <HStack spacing={8} alignItems="center">
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              <RouterLink to="/posters" style={{ textDecoration: 'none' }}>
                <Box px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.700' }} color="white">Posters</Box>
              </RouterLink>
              <RouterLink to="/" style={{ textDecoration: 'none' }}>
                <Box px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.700' }} color="white">Home</Box>
              </RouterLink>
              <RouterLink to="/about" style={{ textDecoration: 'none' }}>
                <Box px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.700' }} color="white">About</Box>
              </RouterLink>
              <RouterLink to="/contact" style={{ textDecoration: 'none' }}>
                <Box px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.700' }} color="white">Contact</Box>
              </RouterLink>
            </HStack>

            <IconButton
              size="md"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label="Open Menu"
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
          </HStack>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              <RouterLink to="/posters" style={{ textDecoration: 'none' }}>
                <Box color="white">Posters</Box>
              </RouterLink>
              <RouterLink to="/" style={{ textDecoration: 'none' }}>
                <Box color="white">Home</Box>
              </RouterLink>
              <RouterLink to="/about" style={{ textDecoration: 'none' }}>
                <Box color="white">About</Box>
              </RouterLink>
              <RouterLink to="/contact" style={{ textDecoration: 'none' }}>
                <Box color="white">Contact</Box>
              </RouterLink>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;