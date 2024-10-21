import { FormControl, FormLabel, Input, Select, Grid, Box } from "@chakra-ui/react";

const CheckoutPage: React.FC = () => {
    return (
        <Grid templateColumns="1fr 1fr">
            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input placeholder="Email" type="email" />
                <FormLabel>Country</FormLabel>
                <Select placeholder="Select country">
                    <option>USA</option>
                    <option>Serbia</option>
                </Select>
                <Grid templateColumns="1fr 1fr">
                    <Box>
                        <FormLabel>First name</FormLabel>
                        <Input placeholder="First name" />
                    </Box>
                    <Box>
                        <FormLabel>Last name</FormLabel>
                        <Input placeholder="Last name" />
                    </Box>
                </Grid>
                <FormLabel>Address</FormLabel>
                <Input placeholder="Address" />
                <Grid templateColumns="1fr 1fr">
                    <Box>
                        <FormLabel>City</FormLabel>
                        <Input placeholder="City" />
                    </Box>
                    <Box>
                        <FormLabel>ZIP/Postal code</FormLabel>
                        <Input placeholder="ZIP/Postal code" />
                    </Box>
                </Grid>
            </FormControl>
            <Box>
                cart editor
            </Box>
        </Grid>



    );
};

export default CheckoutPage;
