import {Card, CardBody, Image, Text, Stack, CardFooter, Button, Heading } from "@chakra-ui/react";
import { CartItem } from '../lib/types/models'; 
import { useDispatch } from "react-redux";
import { removeQuantityFromItemInCart, addQuantityToItemInCart, removeItemFromCart } from "../lib/state/cartSlice";

interface CartItemCardProps {
  cartItem: CartItem
}

const CartItemCard: React.FC<CartItemCardProps> = ({cartItem}) => {

  const createPayload = () => ({
    designId: cartItem.designId,
    productId: cartItem.productId
  });
  const dispatch = useDispatch();

  const handleMinusClick = () => {
    dispatch(removeQuantityFromItemInCart(createPayload()))
  }

  const handlePlusClick = () => {
    dispatch(addQuantityToItemInCart(createPayload()))
  }

  const handleRemoveItem = () => {
  dispatch(removeItemFromCart(createPayload()));
};

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        src={cartItem.lowResImgUrl}
        alt=""
        boxSize='150px' 
      />
      <Stack>
        <CardBody>
          <Heading size="md">{cartItem.designName}</Heading>
          <Text py="2">{cartItem.description}</Text>
        </CardBody>
        <CardFooter>
        <Button onClick={handleRemoveItem} variant="solid" colorScheme="blue">
            Remove item
          </Button>
          <Button onClick={handleMinusClick} variant="solid" colorScheme="blue">
            -
          </Button>
          <Button onClick={handlePlusClick} variant="solid" colorScheme="blue">
            +
          </Button>
          {cartItem.quantity}
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default CartItemCard;
