import React, { useState } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import PostersViewMain from './PostersViewMain';
import CategoryViewNav from './CategoryViewNav';

const Posters: React.FC = () => {

  
  const [categoryId, setCategoryId] = useState<number>(0);  // Manage categoryId here

  const handleCategoryClick = (id: number) => {
    setCategoryId(id);  // Update selected categoryId
  };

  return (
    <Box w="100%">
      <Grid
        templateAreas={{
          base: `"header" 
                 "nav" 
                 "main" 
                 "footer"`,
          md: `"header header"
               "nav main"
               "footer footer"`
        }}
        gridTemplateRows={{
          base: 'repeat(4, auto)',
          md: '50px 1fr 30px'
        }}
        gridTemplateColumns={{
          base: '1fr',
          md: '230px 1fr'
        }}
        gap={1}
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' bg='orange.300' area={'header'}>
          Header
        </GridItem>
        <GridItem pl='2' bg='pink.300' area={'nav'}>
        <CategoryViewNav onCategoryClick={handleCategoryClick} />
        </GridItem>
        <GridItem pl='2' bg='green.300' area={'main'}>
          <PostersViewMain designCategoryId={categoryId}></PostersViewMain>
        </GridItem>
        <GridItem pl='2' bg='blue.300' area={'footer'}>
          Footer
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Posters;