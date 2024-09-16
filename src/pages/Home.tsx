import { SimpleGrid, Box } from "@chakra-ui/react";



const Home: React.FC = () =>{

    return (
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
      <Box bg="gray.100" height="200px" rounded="md">
        Content Block 1
      </Box>
      <Box bg="gray.100" height="200px" rounded="md">
        Content Block 2
      </Box>
      <Box bg="gray.100" height="200px" rounded="md">
        Content Block 3
      </Box>
      <Box bg="gray.100" height="200px" rounded="md">
        Content Block 4
      </Box>
      <Box bg="gray.100" height="200px" rounded="md">
        Content Block 4
      </Box>
      <Box bg="gray.100" height="200px" rounded="md">
        Content Block 4
      </Box>
      <Box bg="gray.100" height="200px" rounded="md">
        Content Block 4
      </Box>
    </SimpleGrid>
    )
}


export default Home;