import {Button,} from "@chakra-ui/react";
  import { useSelector } from "react-redux";
  import { useState } from "react";
  import { CostCalculations } from "../lib/types/models";
  
  interface CalculationCostsProps {
    costIsCalculated: boolean
    handleClick: () => Promise<void>;
    costCalculations?: CostCalculations;
  }
  
  const CalculationCosts: React.FC<CalculationCostsProps> = ({ costIsCalculated, handleClick, costCalculations }) => {
    const recipient = useSelector((state: any) => state.recipient.recipient);
    const cartItems = useSelector((state: any) => state.cart.cartItems);
  
    return (
      <>
        {!costIsCalculated ? (
          <Button onClick={handleClick}>Calculate shipping and total price</Button>
        ) : (
          <>
            <label>Items cost: {costCalculations!.itemsCost}</label>
            <br />
            <label>Shipping cost: {costCalculations!.shippingCost}</label>
            <br />
            <label>Total cost: {costCalculations!.totalCost}</label>
          </>
        )}
      </>
    );
  };
  
  export default CalculationCosts;