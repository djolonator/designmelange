import React, { useEffect, useState } from "react";
import { orders } from "../../lib/utils/ApiCalls";
import { Order } from '../../lib/types/models'; 
import {Flex} from "@chakra-ui/react";
import  OrderItemComponent  from "../../components/OrderItemComponent"

const OrderPage: React.FC = () => {
    
    const [userOrders, setUserOrders] = useState<Order[] | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
              try {
                const response = await orders();
                const data: Order[] = await response.json();
                setUserOrders(data);
              } catch (error) {
              } finally {
              }
            };
            fetchOrders();
      }, []);

    return ( <Flex gap="4" direction="column">
      {userOrders && userOrders.length > 0 ? (
              userOrders.map((item: Order) => (
                <OrderItemComponent order={item} />
              ))
            ) : (
              <p>No orders</p>
            )}
    </Flex>
    );
}
    
export default OrderPage;