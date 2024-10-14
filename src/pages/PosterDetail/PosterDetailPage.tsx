import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Select, Grid, Text, Image, Button } from "@chakra-ui/react";
import { DesignItem } from "../../lib/types/models";
import { productVariantsSelect } from "../../lib/constants/constants";
import ShoppingCartDrawer from "../../components/ShoppingCartDrawer";

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
    <Grid templateColumns="1fr 1fr" gap={4}>
      <Box bg="blue.500" p={4}>
        <Grid templateColumns="2fr 9fr" gap={1}>
          <Box>
            <Image src="https://i.ibb.co/vBmRCwb/Moscow.jpg"></Image>
            <Image src="https://i.ibb.co/vBmRCwb/Moscow.jpg"></Image>
          </Box>
          <Box>
            <Image src="https://i.ibb.co/vBmRCwb/Moscow.jpg"></Image>
          </Box>
        </Grid>
      </Box>
      <Box bg="green.500" p={4}>
        <Text>{design?.designName}</Text>
        <Select placeholder="Select an option">
          {productVariantsSelect.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
       <ShoppingCartDrawer></ShoppingCartDrawer>
        <Text>Description</Text>
        <Text>{design?.description}</Text>
      </Box>
    </Grid>
  );
};

export default PosterDetailPage;
