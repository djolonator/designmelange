import {Button,} from "@chakra-ui/react";
  import { useSelector } from "react-redux";
  import { useState } from "react";
  import { CostCalculations } from "../lib/types/models";
  import { callculateCost } from "../lib/utils/apiCalls";
  
  interface CalculationCostsProps {
    setCostIsCalculated: (value: boolean) => void;
  }
  
  const CalculationCosts: React.FC<CalculationCostsProps> = ({ setCostIsCalculated }) => {
    const recipient = useSelector((state: any) => state.recipient.recipient);
    const cartItems = useSelector((state: any) => state.cart.cartItems);
    const [costCalculations, setCostCalculations] = useState<CostCalculations>({
      shippingCost: 0,
      itemsCost: 0,
      totalCost: 0,
    });
    const [costIsCalculated, setCostIsCalculatedLocal] = useState<boolean>(false);
  
    const handleClick = async () => {
      const response = await callculateCost(recipient, cartItems);
  
      const responseData = await response.json();
  
      if (responseData.isSuccess) {
        setCostCalculations({
          shippingCost: responseData.value.shippingCost,
          itemsCost: responseData.value.itemsCost,
          totalCost: responseData.value.totalCost,
        });
        setCostIsCalculatedLocal(true);  
        setCostIsCalculated(true);      
      }
    };
  
    return (
      <>
        {!costIsCalculated ? (
          <Button onClick={handleClick}>Calculate shipping and total price</Button>
        ) : (
          <>
            <label>Items cost: {costCalculations.itemsCost}</label>
            <br />
            <label>Shipping cost: {costCalculations.shippingCost}</label>
            <br />
            <label>Total cost: {costCalculations.totalCost}</label>
          </>
        )}
      </>
    );
  };
  
  export default CalculationCosts;