import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../state/categoriesSlice';
import { Box, Text, Grid, GridItem } from '@chakra-ui/react';
import { RootState, AppDispatch } from '../../state/store';
import CategoryItem from '../../components/CategoryListItem'


const Posters: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.categories);

  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (id: number) => {
    console.log(`Category ID: ${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
          {items.map(category => (
            <CategoryItem key={category.designCategoryId}
              category={category}
              onCategoryClick={handleCategoryClick}
            />
          ))}
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