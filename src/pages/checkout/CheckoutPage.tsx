import React from "react";
import { FormControl, FormLabel, Input, Select, Grid, Box, FormHelperText, FormErrorMessage } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipient } from "../../lib/state/recipientSlice";
import { countryRecipientSelect } from "../../lib/constants/constants";
import CalculationCosts from '../../components/CalculationCosts';
import Payment from "../../components/Payment";
import { useState, useEffect } from "react";
import { isUserAuthenticated } from "../../lib/utils/auth";
import { validateRecipientForm } from "../../lib/utils/recipientFormValidation"; 
import { useNavigate } from "react-router-dom";
import { CostCalculations, RecipientValidation } from "../../lib/types/models";
import { callculateCost } from "../../lib/utils/ApiCalls";
import { showToast } from "../../lib/utils/toaster";
import { RootState } from '../../lib/state/store';


const CheckoutPage: React.FC = () => {
  const recipient = useSelector((state: RootState) => state.recipient.recipient);
  const dispatch = useDispatch();
  const [costIsCalculated, setCostIsCalculated] = useState<boolean>(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const [recipientValidation, setRecipientValidation] = useState<RecipientValidation>({
    phoneIsValid: true,
    emailIsValid: true,
    countryIsValid: true,
    firstNameIsValid: true,
    lastNameIsValid: true,
    addressIsValid: true,
    cityIsValid: true,
    zipIsValid: true,
  });

  useEffect(() => {
    if (!isUserAuthenticated()) {
      navigate('/login'); 
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
    // maybe update recipientValidation here, but have problem
    setCostIsCalculated(false);
  };

  const handleClick = async () => {

    if (cartItems.length === 0) {
      showToast("You must add items to cart.", false);
    } else if (!recipient.address || !recipient.city || !recipient.country || !recipient.email || !recipient.firstName || !recipient.lastName || !recipient.phone || !recipient.zip) {
      setRecipientValidation(validateRecipientForm(recipient));
    } else {
      const response = await callculateCost(recipient, cartItems);
      const responseData = await response.json();
      if (response.ok){
        setCostCalculations({
          shippingCost: responseData.shippingCost,
          itemsCost: responseData.itemsCost,
          totalCost: responseData.totalCost,
        });
        setCostIsCalculated(true);
      }else if (response.status === 422){
        //connect with recipient form
      }else if(response.status === 400){
        showToast(responseData.message, false);
      }else{
        showToast("Something went wrong", false);
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
          <Box>
            <h1>Recipient</h1>
            <FormControl isRequired isInvalid={!recipientValidation.emailIsValid}>
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                placeholder="Email"
                type="email"
                value={recipient.email}
                onChange={handleChange}
              />
              {recipientValidation.emailIsValid ? (
                <></>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!recipientValidation.phoneIsValid}>
              <FormLabel>Phone number</FormLabel>
              <Input
                name="phone"
                placeholder="Phone number"
                type="phone"
                value={recipient.phone}
                onChange={handleChange}
              />
              {recipientValidation.phoneIsValid ? (
                <FormHelperText>
                  Phone is for delivery purpuses only
                </FormHelperText>
              ) : (
                <FormErrorMessage>Phone is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!recipientValidation.countryIsValid}>
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
              {recipientValidation.countryIsValid ? (
                <></>
              ) : (
                <FormErrorMessage>Country is required.</FormErrorMessage>
              )}
            </FormControl>
            <Grid templateColumns="1fr 1fr">
              <FormControl isRequired isInvalid={!recipientValidation.firstNameIsValid}>
                <FormLabel>First name</FormLabel>
                <Input
                  name="firstName"
                  placeholder="First name"
                  value={recipient.firstName}
                  onChange={handleChange}
                />
                {!recipientValidation.firstNameIsValid ? (
                  <></>
                ) : (
                  <FormErrorMessage>First name is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={!recipientValidation.lastNameIsValid}>
                <FormLabel>Last name</FormLabel>
                <Input
                  name="lastName"
                  placeholder="Last name"
                  value={recipient.lastName}
                  onChange={handleChange}
                />
                {recipientValidation.lastNameIsValid ? (
                  <></>
                ) : (
                  <FormErrorMessage>Last name is required.</FormErrorMessage>
                )}
              </FormControl>
            </Grid>
            <FormControl isRequired isInvalid={!recipientValidation.addressIsValid}>
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                placeholder="Address"
                value={recipient.address}
                onChange={handleChange}
              />
              {recipientValidation.addressIsValid ? (
              <></>
              ) : (
                <FormErrorMessage>Address is required.</FormErrorMessage>
              )}
            </FormControl>
            <Grid templateColumns="1fr 1fr">
              <FormControl isRequired isInvalid={!recipientValidation.cityIsValid}>
                <FormLabel>City</FormLabel>
                <Input
                  name="city"
                  placeholder="City"
                  value={recipient.city}
                  onChange={handleChange}
                />
                {recipientValidation.cityIsValid ? (
                  <></>
                ) : (
                  <FormErrorMessage>City is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={!recipientValidation.zipIsValid}>
                <FormLabel>ZIP/Postal code</FormLabel>
                <Input
                  name="zip"
                  placeholder="ZIP/Postal code"
                  value={recipient.zip}
                  onChange={handleChange}
                />
                {recipientValidation.zipIsValid ? (
                 <></>
                ) : (
                  <FormErrorMessage>Zip code is required.</FormErrorMessage>
                )}
              </FormControl>
            </Grid>
          </Box>
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




