import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Input } from '@chakra-ui/react';
import PostersViewMain from './PostersViewMain';
import CategoryViewNav from './CategoryViewNav';
import { CategoryItem } from '../../lib/types/models'; 
import { DesignItem } from '../../lib/types/models'; 
import {designsByCategory, bestsellersDesigns, designsSearch} from '../../lib/utils/apiCalls'

const PostersPage: React.FC = () => {

  const [selectedCategory, setSelectedCategory] = useState<CategoryItem>();

  const [designs, setDesigns] = useState<DesignItem[]>([]);


  const [query, setQuery] = useState(''); // Store search query

  const [whatToDisplay, setWhatToDisplay] = useState('bestSellers');

  const [page, setPage] = useState(0);

  const handleCategoryClick = (category: CategoryItem) => {
    if (category.designCategoryId !== selectedCategory?.designCategoryId){
      setQuery('');
      setDesigns([]);
      setPage(0); 
      setSelectedCategory(category);
    }
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setQuery(e.target.value);
    setPage(0); 
    setSelectedCategory({designCategoryId:0,
      designCategoryName:'',
      designCount:0
    });
  };

  const handleLoadMoreDesignsClick =() => {
    setPage(page+1);
  }

  useEffect(() => {
      if (selectedCategory && selectedCategory.designCategoryId !== 0) {
        const fetchDesignsByCategory = async () => {
          try {
            const designsByCategoryResponse = await designsByCategory(selectedCategory.designCategoryId, page);
            const designsByCategoryData = await designsByCategoryResponse.json();
            setDesigns(prevDesigns => page === 0 ? designsByCategoryData : [...prevDesigns, ...designsByCategoryData]); 
          } catch (error) {
            
          } finally {
            
          }
        };
        if (selectedCategory.designCount - designs.length > 0){
          //setQuery('');
          fetchDesignsByCategory();
        }
      }
      else if (query !== ''){
        const fetchData = async () => {
          try {
            const searchDesignsByTermResponse = await designsSearch(page, query);
            const searchDesignsByTermDesignsData = await searchDesignsByTermResponse.json();
            setDesigns(prevDesigns => page === 0 ? searchDesignsByTermDesignsData : [...prevDesigns, ...searchDesignsByTermDesignsData]); 
          } catch (error) {
           
          } finally {
         ;
          }
        };
        const debounceTimeout = setTimeout(fetchData, 500);
        clearTimeout(debounceTimeout);
        
      }
      else{
        const fetchBestsellersDesigns = async () => {
          try {
            const bestsellersDesignsResponse = await bestsellersDesigns(page);
            const bestsellersDesignsData = await bestsellersDesignsResponse.json();
            setDesigns(prevDesigns => page === 0 ? bestsellersDesignsData : [...prevDesigns, ...bestsellersDesignsData]); 
          } catch (error) {
            
          } finally {
            
          }
        }; 
        fetchBestsellersDesigns();
      }
    }, [page, selectedCategory, query]);

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
          <Input type='text' value={query} placeholder='Search...' onChange={handleSearchChange}>
          </Input>

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