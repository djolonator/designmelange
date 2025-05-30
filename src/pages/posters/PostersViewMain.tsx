import React, { useState } from 'react';
import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import DesignCard from '../../components/DesignCard';
import { DesignItem } from '../../lib/types/models'; 

interface PostersViewProps {
  designs: DesignItem[];
  handleLoadMoreDesignsClick: () => void                           //'categories' | 'search' | 'bestSellers'    //make constant
}

const PostersViewMain: React.FC<PostersViewProps> = ({designs, handleLoadMoreDesignsClick}) =>{

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
 
  if (loading) return <div>Loading designs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box>
      <SimpleGrid columns={[1, 2, 3]} spacing='10px'>
        {designs.length > 0 ? (
          designs.map(design => <DesignCard key={design.designId} design={design} />)
        ) : (
          <div>No designs available</div>
        )}
      </SimpleGrid>
      
        <Button onClick={handleLoadMoreDesignsClick}>
          Load more designs:
        </Button>
      
    </Box>
  );
};

export default PostersViewMain;