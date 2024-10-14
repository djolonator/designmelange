import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart, addItem } from "../lib/state/cartSlice";


const ShoppingCartDrawer: React.FC = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const items = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

 
  const handleRemoveItem = (designId: number, dimensionId: number) => {
    dispatch(removeItem({ designId, dimensionId }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Add to cart
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your items</DrawerHeader>

          <DrawerBody>
            <CartItemCard></CartItemCard>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="blue">Checkout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShoppingCartDrawer;
