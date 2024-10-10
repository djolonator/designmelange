import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Select, Grid, Text } from "@chakra-ui/react";
import { DesignItem } from '../../types/intefaces'; 

const PosterDetailPage: React.FC = () => {
  const { designId } = useParams<{ designId: string }>();
  const [design, setDesign] = useState<DesignItem | null>(null);

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_BASE_URL + "/design/" + designId
        );
        const data = await response.json();
        setDesign(data);
      } catch (error) {
      } finally {
      }
    };
    fetchDesign();
  }, [designId]);

  return (
    <Grid templateColumns="3fr 4fr" gap={4}>
    <Box bg="blue.500" p={4}>
      
    </Box>
    <Box bg="green.500" p={4}>
        <Text>{design?.designName}</Text>
        <Select placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Text>Description</Text>
        <Text>{design?.description}</Text>
    </Box>
  </Grid>
      
    
  );
};

export default PosterDetailPage;
