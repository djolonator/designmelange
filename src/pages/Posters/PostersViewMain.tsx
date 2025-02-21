import React, { useEffect, useState } from 'react';
import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import DesignCard from '../../components/DesignCard';
import { CategoryItem } from '../../lib/types/models'; 
import {designsByCategory} from '../../lib/utils/apiCalls'
import { DesignItem } from '../../lib/types/models'; 

interface PostersViewProps {
  selectedCategory: CategoryItem | undefined;
}

const PostersViewMain: React.FC<PostersViewProps> = ({selectedCategory}) =>{

  const [designs, setDesigns] = useState<DesignItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
 
  const handleLoadMoreDesignsClick =() => {
    setPage(page+1);
  }

  useEffect(() => {
    setDesigns([]);
    setPage(0); 
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory && selectedCategory.designCategoryId !== 0) {
      const fetchDesigns = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await designsByCategory(selectedCategory.designCategoryId, page);
          const data = await response.json();
          setDesigns(prevDesigns => page === 0 ? data : [...prevDesigns, ...data]); 
        } catch (error) {
          setError('Failed to fetch designs');
        } finally {
          setLoading(false);
        }
      };
      if (selectedCategory.designCount - designs.length > 0){
        fetchDesigns();
      }
    }
    else{
      
    }
  }, [selectedCategory, page]);

  if (loading) return <div>Loading designs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box>
      <SimpleGrid columns={[2, null, 3]} spacing='20px'>
        {designs.length > 0 ? (
          designs.map(design => <DesignCard key={design.designId} design={design} />)
        ) : (
          <div>No designs available</div>
        )}
      </SimpleGrid>
      {selectedCategory && (
        <Button onClick={handleLoadMoreDesignsClick}>
          Load more designs: {selectedCategory.designCount - designs.length}
        </Button>
      )}
    </Box>
  );
};

export default PostersViewMain;