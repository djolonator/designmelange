import React from "react";
import { Box, Flex, Text, Link, Stack, Input, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      bg="gray.800"
      color="white"
      height="auto" // Adjust height to auto to accommodate dynamic content
      width="100%"
      p={4}
    >
       <Flex
        direction={{ base: "column", md: "row" }} // Column layout on small screens, row layout on medium and large screens
        wrap="wrap"
        justify="space-between"
        align="start"
        maxW={{ base: "100%", md: "100%", lg: "100%", xl: "70%" }}  // Full width on medium and small screens, 70% on large screens
        mx="auto"
        p={4}
      >
        {/* First row for medium screens */}
        <Box
          flex={{ base: "1 1 100%", md: "1 1 20%" }} // Full width on small screens, 20% on medium and large screens
          p={2}
          textAlign="center"
        >
          <Text mb={2} fontWeight="bold">
            Help & Information
          </Text>
          <Stack spacing={2} align="center">
            <RouterLink to="/faq" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                FAQ
              </Link>
            </RouterLink>
            <RouterLink to="/shipping-info" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Shipping Info
              </Link>
            </RouterLink>
            <RouterLink to="/returns" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Returns
              </Link>
            </RouterLink>
            <RouterLink to="/contact" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Contact Us
              </Link>
            </RouterLink>
            <RouterLink to="/orders" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Track Order
              </Link>
            </RouterLink>
          </Stack>
        </Box>
        <Box
          flex={{ base: "1 1 100%", md: "1 1 20%" }} // Full width on small screens, 20% on medium and large screens
          p={2}
          textAlign="center"
        >
          <Text mb={2} fontWeight="bold">
            About Us
          </Text>
          <Stack spacing={2} align="center">
            <RouterLink to="/about-us" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Our Story
              </Link>
            </RouterLink>
            <RouterLink to="/careers" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Careers
              </Link>
            </RouterLink>
            <RouterLink to="/press" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Press
              </Link>
            </RouterLink>
            <RouterLink to="/values" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Our Values
              </Link>
            </RouterLink>
          </Stack>
        </Box>
        <Box
          flex={{ base: "1 1 100%", md: "1 1 20%" }} // Full width on small screens, 20% on medium and large screens
          p={2}
          textAlign="center"
        >
          <Text mb={2} fontWeight="bold">
            Resources
          </Text>
          <Stack spacing={2} align="center">
            <RouterLink to="/blog" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Blog
              </Link>
            </RouterLink>
            <RouterLink to="/guides" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Guides
              </Link>
            </RouterLink>
            <RouterLink to="/support" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Support
              </Link>
            </RouterLink>
            <RouterLink
              to="/affiliate-program"
              style={{ textDecoration: "none" }}
            >
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Affiliate Program
              </Link>
            </RouterLink>
            <RouterLink to="/events" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Events
              </Link>
            </RouterLink>
          </Stack>
        </Box>
        <Box
          flex={{ base: "1 1 100%", md: "1 1 20%" }} // Full width on small screens, 20% on medium and large screens
          p={2}
          textAlign="center"
        >
          <Text mb={2} fontWeight="bold">
            Social Media
          </Text>
          <Stack spacing={2} align="center">
            <RouterLink to="/facebook" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Facebook
              </Link>
            </RouterLink>
            <RouterLink to="/twitter" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Twitter
              </Link>
            </RouterLink>
            <RouterLink to="/instagram" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                Instagram
              </Link>
            </RouterLink>
            <RouterLink to="/linkedin" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                LinkedIn
              </Link>
            </RouterLink>
            <RouterLink to="/youtube" style={{ textDecoration: "none" }}>
              <Link color="white" _hover={{ textDecoration: "underline" }}>
                YouTube
              </Link>
            </RouterLink>
          </Stack>
        </Box>
        <Box
          flex={{ base: "1 1 100%", md: "1 1 20%" }} // Full width on small screens, 20% on medium and large screens
          p={2}
          textAlign="center"
        >
          <Text mb={2} fontWeight="bold">
            Newsletter
          </Text>
          <Flex
            direction={{ base: "column", md: "row" }} // Stack vertically on small screens, inline on medium and large screens
            align="center"
            justify="center"
            gap={2} // Spacing between items
          >
            <Input
              placeholder="Enter your email"
              w={{ base: "100%", md: "auto" }} // Full width on small screens, auto width on medium and large screens
            />
            <Button
              colorScheme="teal"
              w={{ base: "100%", md: "auto" }} // Full width on small screens, auto width on medium and large screens
            >
              Subscribe
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
