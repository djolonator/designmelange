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
              src="https://i.ibb.co/vBmRCwb/Moscow.jpg"
            />
          ))}
        </HStack>
        <Stat>
          <StatLabel>Total Cost</StatLabel>
          <StatNumber>${order.totalCost}</StatNumber>
        </Stat>
        <Button variant="outline">View details</Button>         probaj axios za api call
      </Card>
    </>
  );
};

export default OrderItemComponent;
