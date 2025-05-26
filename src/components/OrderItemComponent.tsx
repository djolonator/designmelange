import {
  Avatar,
  HStack,
  Button,
  Card,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { Order } from "../lib/types/models";
import OrderDetailModal from './OrderDetailModal'

interface OrderItemPropsProps {
  order: Order;
}

const OrderItemComponent: React.FC<OrderItemPropsProps> = ({ order }) => {
  return (
    <>
      <Card flexDirection="row">
        <HStack>
          {order.orderItems.map((item) => (
            <Avatar
              size="lg"
              borderRadius="0"
              src={item.design.lowResImgUrl}
            />
          ))}
        </HStack>
        <Stat>
          <StatLabel>Total Cost</StatLabel>
          <StatNumber>${order.totalCost}</StatNumber>
        </Stat>
        <OrderDetailModal></OrderDetailModal>
      </Card>
    </>
  );
};

export default OrderItemComponent;
