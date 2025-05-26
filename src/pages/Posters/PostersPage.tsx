import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, GridItem, Input } from '@chakra-ui/react';
import PostersViewMain from './PostersViewMain';
import CategoryViewNav from './CategoryViewNav';
import { CategoryItem } from '../../lib/types/models'; 
import { DesignItem } from '../../lib/types/models'; 
import {designsByCategory, bestsellersDesigns, designsSearch, designs} from '../../lib/utils/apiCalls'

const PostersPage: React.FC = () => {

  const [selectedCategory, setSelectedCategory] = useState<CategoryItem>({designCategoryId:0, designCategoryName:'', designCount:0});

  const [designsState, setDesignsState] = useState<DesignItem[]>([]);


  const [query, setQuery] = useState('');

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const [whatToDisplay, setWhatToDisplay] = useState(2);  //enum 2 bestsellers, 3 search, 1 category

  const [page, setPage] = useState(0);
  let debounceTimer: NodeJS.Timeout | null = null;

  const handleCategoryClick = (category: CategoryItem) => {
    if (category.designCategoryId !== selectedCategory.designCategoryId){
      setQuery('');
      setDebouncedQuery('');
      setDesignsState([]);
      setPage(0); 
      setWhatToDisplay(1);
    }
    setSelectedCategory(category);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // setSelectedCategory({designCategoryId:0,
    //   designCategoryName:'',
    //   designCount:0
    // });
    let term = e.target.value.toString();
    if (term.length == 0){
      setWhatToDisplay(2);
    }
    else{
      setWhatToDisplay(3);
    }
    setQuery(term);
    setPage(0);
    
    
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      setSelectedCategory({designCategoryId:0,
      designCategoryName:'',
      designCount:0
    });
      setDebouncedQuery(e.target.value); 
    }, 500); 
  };

  const handleLoadMoreDesignsClick =() => {
    setPage(page+1);
  };

  const fetchDesigns = async () => {
    
    let response;
    let data: DesignItem[];
    switch (whatToDisplay) {
      case 1:
        response = await designsByCategory(selectedCategory!.designCategoryId, page);
        data = await response.json();
        break;
      case 2:
        response = await designs(page);
        data = await response.json();
        break;
      case 3:
        response = await designsSearch(page, debouncedQuery);
        data = await response.json();
        
        break;
      default:
        console.log("Value is unknown");
        break;
    }

    setDesignsState(prevDesigns => page === 0 ? data : [...prevDesigns, ...data]);
  };

  useEffect(() => {
    fetchDesigns();
    }, [page, selectedCategory, debouncedQuery]);

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
        <GridItem p='2' bg='green.300' area={'main'}>
          <PostersViewMain designs={designsState} handleLoadMoreDesignsClick={handleLoadMoreDesignsClick}></PostersViewMain>
        </GridItem>
        <GridItem p='2' bg='blue.300' area={'footer'}>
          Footer
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PostersPage;