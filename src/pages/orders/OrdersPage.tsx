import React, { useEffect, useState } from "react";
import { orders } from "../../lib/utils/apiCalls";
import { Order } from '../../lib/types/models'; 

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

    return (<>Orders</>);
}

    
export default OrderPage;