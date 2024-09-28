import React, { useEffect, useState } from 'react';
import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import DesignCard from '../../components/DesignCard';

interface PostersViewProps {
    designCategoryId:number;
}

const PostersViewMain: React.FC<PostersViewProps> = ({designCategoryId}) =>{

  const [designs, setDesigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);


  const handleLoadMoreDesignsClick =() => {
    setPage(page+1);
  }

  useEffect(() => {
    setPage(0);
}, [designCategoryId]);

  useEffect(() => {

    if (designCategoryId === 0) return; 

    const fetchDesigns = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(process.env.REACT_APP_API_BASE_URL + '/designsByCategory/'+ designCategoryId + '?page=' + page); 
        const data = await response.json();
        setDesigns(data);
      } catch (error) {
        setError('Failed to fetch designs');
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, [designCategoryId, page]);

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
      <Button onClick={handleLoadMoreDesignsClick}>Load more designs</Button>
    </Box>
    
  );
};

export default PostersViewMain;