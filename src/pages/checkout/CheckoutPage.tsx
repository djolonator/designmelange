import React from "react";
import { FormControl, FormLabel, Input, Select, Grid, Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipient } from "../../lib/state/recipientSlice";
import { countryRecipientSelect } from "../../lib/constants/constants";
import CalculationCosts from '../../components/CalculationCosts';
import Payment from "../../components/Payment";
import {useState, useEffect} from "react";
import { isUserAuthenticated } from "../../lib/utils/auth";
import { useNavigate } from "react-router-dom"; 
import { CostCalculations } from "../../lib/types/models";
import { callculateCost } from "../../lib/utils/apiCalls";
import { toast} from 'react-toastify';
import { RootState } from '../../lib/state/store';


const CheckoutPage: React.FC = () => {
  const recipient = useSelector((state: RootState) => state.recipient.recipient);
  const dispatch = useDispatch();
  const [costIsCalculated, setCostIsCalculated] = useState<boolean>(false);
  const navigate = useNavigate(); 
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  useEffect(() => {
    if (!isUserAuthenticated()) {
      navigate('/login');  // Redirect to login if user is not authenticated
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(
      updateRecipient({
        ...recipient,
        [name]: value,
      })
    );
  };

  const handleClick = async () => {

    if (cartItems.length === 0){
      toast("You must add items to cart.");
    }else if (!recipient.address || !recipient.city || !recipient.country || !recipient.email || !recipient.firstName || !recipient.lastName || !recipient.phone || !recipient.zip){
      toast("You must fill all fields");
    }else{
      const response = await callculateCost(recipient, cartItems);

      const responseData = await response.json();
  
      if (responseData.isSuccess) {
        setCostCalculations({
          shippingCost: responseData.value.shippingCost,
          itemsCost: responseData.value.itemsCost,
          totalCost: responseData.value.totalCost,
        });
        setCostIsCalculated(true);      
      }
    }
  };

  const [costCalculations, setCostCalculations] = useState<CostCalculations>({
    shippingCost: 0,
    itemsCost: 0,
    totalCost: 0,
  });

  return (
    <>
      <Box>
        <Grid templateColumns="1fr 1fr">
          <FormControl>
          <h1>Recipient</h1>
            <FormLabel>Email address</FormLabel>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              value={recipient.email}
              onChange={handleChange}
            />
            <FormLabel>Phone number</FormLabel>
            <Input
              name="phone"
              placeholder="Phone number"
              type="phone"
              value={recipient.phone}
              onChange={handleChange}
            />
            <FormLabel>Country</FormLabel>
            <Select
              name="country"
              placeholder="Select country"
              value={recipient.country}
              onChange={handleChange}
            >
              {countryRecipientSelect.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <Grid templateColumns="1fr 1fr">
              <Box>
                <FormLabel>First name</FormLabel>
                <Input
                  name="firstName"
                  placeholder="First name"
                  value={recipient.firstName}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <FormLabel>Last name</FormLabel>
                <Input
                  name="lastName"
                  placeholder="Last name"
                  value={recipient.lastName}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              placeholder="Address"
              value={recipient.address}
              onChange={handleChange}
            />
            <Grid templateColumns="1fr 1fr">
              <Box>
                <FormLabel>City</FormLabel>
                <Input
                  name="city"
                  placeholder="City"
                  value={recipient.city}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <FormLabel>ZIP/Postal code</FormLabel>
                <Input
                  name="zip"
                  placeholder="ZIP/Postal code"
                  value={recipient.zip}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
          </FormControl>
          <Box>cart items-editor</Box>
        </Grid>
      </Box>
      <Box>
        <CalculationCosts 
          costIsCalculated={costIsCalculated} 
          handleClick={handleClick}
          costCalculations={costCalculations}
        />
        {costIsCalculated && <Payment />}
      </Box>
    </>
  );
};

export default CheckoutPage;