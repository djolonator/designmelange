import {Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure,Button,} from "@chakra-ui/react";
import CartItemCard from "./CartItemCard";
import { useSelector } from "react-redux";
import { CartItem } from '../lib/types/models'; 
import { useDispatch } from "react-redux";
import { clearCart } from "../lib/state/cartSlice";

const ShoppingCartDrawer: React.FC = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  const handleCLearCartClick = () => {
    dispatch(clearCart())
  }

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Cart
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your items</DrawerHeader>
          <DrawerBody>
          {cartItems.length > 0 ? (
              cartItems.map((item: CartItem) => (
                <CartItemCard key={item.designId+item.dimensionId} cartItem={item} />
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </DrawerBody>
          <DrawerFooter>
          <Button onClick={handleCLearCartClick} colorScheme="red">Clear cart</Button>
            <Button colorScheme="teal">Checkout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShoppingCartDrawer;
