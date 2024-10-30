import React, { useState } from "react";
import { FormControl, FormLabel, Input, Select, Grid, Box, Button } from "@chakra-ui/react";

const CheckoutPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        country: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zip: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid templateColumns="1fr 1fr">
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <FormLabel>Country</FormLabel>
                    <Select
                        name="country"
                        placeholder="Select country"
                        value={formData.country}
                        onChange={handleChange}
                    >
                        <option value="USA">USA</option>
                        <option value="Serbia">Serbia</option>
                    </Select>
                    <Grid templateColumns="1fr 1fr">
                        <Box>
                            <FormLabel>First name</FormLabel>
                            <Input
                                name="firstName"
                                placeholder="First name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Last name</FormLabel>
                            <Input
                                name="lastName"
                                placeholder="Last name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid>
                    <FormLabel>Address</FormLabel>
                    <Input
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <Grid templateColumns="1fr 1fr">
                        <Box>
                            <FormLabel>City</FormLabel>
                            <Input
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </Box>
                        <Box>
                            <FormLabel>ZIP/Postal code</FormLabel>
                            <Input
                                name="zip"
                                placeholder="ZIP/Postal code"
                                value={formData.zip}
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid>
                    <Button type="submit">Submit</Button>
                </FormControl>
                <Box>
                    cart editor
                </Box>
            </Grid>
        </form>
    );
};

export default CheckoutPage;