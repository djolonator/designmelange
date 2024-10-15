import {Card, CardBody, Image, Text, Stack, CardFooter, Button, Heading } from "@chakra-ui/react";
import { CartItem } from '../lib/types/models'; 

interface CartItemCardProps {
  cartItem: CartItem
}

const CartItemCard: React.FC<CartItemCardProps> = ({cartItem}) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
        boxSize='150px'
      />
      <Stack>
        <CardBody>
          <Heading size="md">The perfect latte</Heading>
          <Text py="2">
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text>
        </CardBody>
        <CardFooter>
        <Button variant="solid" colorScheme="blue">
            Remove item
          </Button>
          <Button variant="solid" colorScheme="blue">
            -
          </Button>
          <Button variant="solid" colorScheme="blue">
            +
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default CartItemCard;
