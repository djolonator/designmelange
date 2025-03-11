import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import PostersViewMain from './PostersViewMain';
import CategoryViewNav from './CategoryViewNav';
import { CategoryItem } from '../../lib/types/models'; 
import { DesignItem } from '../../lib/types/models'; 
import {designsByCategory} from '../../lib/utils/apiCalls'

const PostersPage: React.FC = () => {

  const [selectedCategory, setSelectedCategory] = useState<CategoryItem>();

  const [designs, setDesigns] = useState<DesignItem[]>([]);

  const [whatToDisplay, setWhatToDisplay] = useState('bestSellers');

  const [page, setPage] = useState(0);

  const handleCategoryClick = (category: CategoryItem) => {
    if (category.designCategoryId !== selectedCategory?.designCategoryId){
      setDesigns([]);
      setPage(0); 
      setSelectedCategory(category);
    }
  };

  const handleLoadMoreDesignsClick =() => {
    setPage(page+1);
    console.log(page);
  }

  useEffect(() => {
      if (selectedCategory && selectedCategory.designCategoryId !== 0) {
        const fetchDesigns = async () => {
          try {
            const response = await designsByCategory(selectedCategory.designCategoryId, page);
            const data = await response.json();
            setDesigns(prevDesigns => page === 0 ? data : [...prevDesigns, ...data]); 
          } catch (error) {
            
          } finally {
            
          }
        };
        if (selectedCategory.designCount - designs.length > 0){
          fetchDesigns();
        }
      }
      else{
        
      }
    }, [page, selectedCategory]);

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
          <PostersViewMain designs={designs} whatToDisplay={whatToDisplay} handleLoadMoreDesignsClick={handleLoadMoreDesignsClick}></PostersViewMain>
        </GridItem>
        <GridItem pl='2' bg='blue.300' area={'footer'}>
          Footer
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PostersPage;