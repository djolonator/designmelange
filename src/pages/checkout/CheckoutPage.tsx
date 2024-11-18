import React from "react";
import { FormControl, FormLabel, Input, Select, Grid, Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipient } from "../../lib/state/recipientSlice";
import { countryRecipientSelect } from "../../lib/constants/constants";
import Payment from "../../components/Payment";

const CheckoutPage: React.FC = () => {
  const recipient = useSelector((state: any) => state.recipient.recipient);
  const dispatch = useDispatch();
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(
      updateRecipient({
        ...recipient,
        [name]: value,
      })
    );
    console.log('change', name + ' ' + value);
  };

  return (
    <>
      <Box>
        <Grid templateColumns="1fr 1fr">
          <FormControl>
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
        <Payment />
      </Box>
    </>
  );
};

export default CheckoutPage;