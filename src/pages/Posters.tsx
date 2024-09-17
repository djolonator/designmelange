import React from 'react';
import { Box, Text, Grid, GridItem } from '@chakra-ui/react';

const Posters: React.FC = () => {
  return (
    <Box w="100%">
      <Grid
        templateAreas={{
          base: `"header" 
                 "nav" 
                 "main" 
                 "footer"`, // for small screens (base)
          md: `"header header"
               "nav main"
               "footer footer"` // for medium screens and up (md)
        }}
        gridTemplateRows={{
          base: 'repeat(4, auto)', // each item gets its own row
          md: '50px 1fr 30px' // larger screens
        }}
        gridTemplateColumns={{
          base: '1fr', // one column for small screens
          md: '150px 1fr' // two columns for medium and larger screens
        }}
        gap={1}
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' bg='orange.300' area={'header'}>
          Header
        </GridItem>
        <GridItem pl='2' bg='pink.300' area={'nav'}>
          Nav
        </GridItem>
        <GridItem pl='2' bg='green.300' area={'main'}>
          Main
        </GridItem>
        <GridItem pl='2' bg='blue.300' area={'footer'}>
          Footer
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Posters;