import React, { useState } from "react";
import { FormControl, FormLabel, Input, Select, Grid, Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Payment from "../../components/Payment";
import { countryRecipientSelect } from "../../lib/constants/constants";
import { Checkout } from "../../lib/types/models";


const CheckoutPage: React.FC = () => {

    const cartItems = useSelector((state: any) => state.cart.items);
    const [checkoutData, setCheckoutData] = useState<Checkout>({
        recipient: {
            phone:'',
            email: '',
            country: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            zip: '',
        },
        cartItems: cartItems
      });

    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCheckoutData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
   
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('checkout object', checkoutData);
    };

    return (
        <>
            <Box>
                <form onSubmit={handleSubmit}>
                    <Grid templateColumns="1fr 1fr">
                        <FormControl>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={checkoutData.recipient.email}
                                onChange={handleChange}
                            />
                            <FormLabel>Phone number</FormLabel>
                            <Input
                                name="phone"
                                placeholder="Phone number"
                                type="phone"
                                value={checkoutData.recipient.phone}
                                onChange={handleChange}
                            />
                            <FormLabel>Country</FormLabel>
                            <Select placeholder="Select country" onChange={handleChange}>
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
                                        value={checkoutData.recipient.firstName}
                                        onChange={handleChange}
                                    />
                                </Box>
                                <Box>
                                    <FormLabel>Last name</FormLabel>
                                    <Input
                                        name="lastName"
                                        placeholder="Last name"
                                        value={checkoutData.recipient.lastName}
                                        onChange={handleChange}
                                    />
                                </Box>
                            </Grid>
                            <FormLabel>Address</FormLabel>
                            <Input
                                name="address"
                                placeholder="Address"
                                value={checkoutData.recipient.address}
                                onChange={handleChange}
                            />
                            <Grid templateColumns="1fr 1fr">
                                <Box>
                                    <FormLabel>City</FormLabel>
                                    <Input
                                        name="city"
                                        placeholder="City"
                                        value={checkoutData.recipient.city}
                                        onChange={handleChange}
                                    />
                                </Box>
                                <Box>
                                    <FormLabel>ZIP/Postal code</FormLabel>
                                    <Input
                                        name="zip"
                                        placeholder="ZIP/Postal code"
                                        value={checkoutData.recipient.zip}
                                        onChange={handleChange}
                                    />
                                </Box>
                            </Grid>
                            <Button type="submit">Submit</Button>
                        </FormControl>
                        <Box>
                            cart items-editor
                        </Box>
                    </Grid>
                </form>
            </Box>
            <Payment checkout={checkoutData}></Payment>
        </>
    );
};

export default CheckoutPage;