import React, { useEffect, useState } from "react";
import {
  Modal,
  useDisclosure,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Link,
  Flex,
  Box,
  Spacer,
  Divider,
  Text 
} from "@chakra-ui/react";
import { getOrderDetails } from "../../src/lib/utils/ApiCalls";
import { OrderDetailsModel } from "../lib/types/models";

interface OrderDetailModalProps {
  orderId: number;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ orderId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderDetails, setOrderDetails] = useState<OrderDetailsModel>();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderDetails(orderId);
        const data: OrderDetailsModel = await response.json();
        setOrderDetails(data);
      } catch (error) {
      } finally {
      }
    };

    if (isOpen) fetchOrderDetails();
  }, [orderId, isOpen]);
  return (
    <>
      <Button onClick={onOpen}>View order details</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={10}>
              <Box >
                <Text>Shipping</Text >
                <Text>Shipping service name</Text>
                <Text>Status</Text>
              </Box>
              <Spacer />
              <Box >
                <Text>{orderDetails?.shipping}</Text>
                <Text>{orderDetails?.shippingServiceName}</Text>
                <Text>{orderDetails?.status}</Text>
              </Box>
            </Flex>
            <Divider size='5' px='1' orientation='horizontal' />
            {orderDetails &&
              orderDetails.trackingUrls.map((item) => (
                <Link href={item} isExternal>
                  Track order
                </Link>
              ))}
          </ModalBody>
          
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderDetailModal;
