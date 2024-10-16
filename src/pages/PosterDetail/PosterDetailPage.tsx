import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Select, Grid, Text, Image, Button } from "@chakra-ui/react";
import { DesignItem } from "../../lib/types/models";
import { productVariantsSelect } from "../../lib/constants/constants";
import { addItemToCart } from "../../lib/state/cartSlice";
import { useDispatch } from "react-redux";

const PosterDetailPage: React.FC = () => {
  const { designId } = useParams<{ designId: string }>();
  const [design, setDesign] = useState<DesignItem | null>(null);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(event.target.value));
  };
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (design && selectedOption !== 0) {
      const cartItem = {
        designName: design.designName,
        description: design.description,
        designId: design.designId,
        designImgUrl: design.designImgUrl, 
        dimensionId: selectedOption,
        quantity: 1 
      };
      dispatch(addItemToCart(cartItem));
    }else{
      //poruka da se mora izabrati velicina postera;
    }
  };

  
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
        <Select placeholder="Select an option" onChange={handleChange}>
          {productVariantsSelect.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Button colorScheme="teal" onClick={handleAddToCart}>Add to cart</Button>
        <Text>Description</Text>
        <Text>{design?.description}</Text>
      </Box>
    </Grid>
  );
};

export default PosterDetailPage;
