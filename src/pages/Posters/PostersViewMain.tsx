import React, { useEffect, useState } from 'react';
import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import DesignCard from '../../components/DesignCard';
import { CategoryItem } from '../../types/intefaces'; 

interface PostersViewProps {
  selectedCategory: CategoryItem | undefined;
}

const PostersViewMain: React.FC<PostersViewProps> = ({selectedCategory}) =>{

  const [designs, setDesigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
 
  const handleLoadMoreDesignsClick =() => {
    setPage(page+1);
  }

  useEffect(() => {
    setDesigns([]); // Clear designs when category changes
    setPage(0); // Reset page to 0
  }, [selectedCategory]);

  // Effect to fetch designs when selectedCategory or page changes
  useEffect(() => {
    if (selectedCategory && selectedCategory.designCategoryId !== 0) {
      const fetchDesigns = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(process.env.REACT_APP_API_BASE_URL + '/designsByCategory/' + selectedCategory.designCategoryId + '?page=' + page); 
          const data = await response.json();
          setDesigns(prevDesigns => page === 0 ? data : [...prevDesigns, ...data]); // Reset designs or append based on page
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
  }, [selectedCategory, page]);

  if (loading) return <div>Loading designs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box>
      <SimpleGrid columns={[2, null, 3]} spacing='20px'>
        {designs.length > 0 ? (
          designs.map(design => <DesignCard key={design.id} design={design} />)
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