import {Card, CardBody, Image, Text, Stack, Divider, CardFooter, ButtonGroup, Button, Heading } from "@chakra-ui/react";
import { DesignItem } from '../lib/types/models'; 
import { useNavigate} from 'react-router-dom';

interface DesignCardProps {
    design: DesignItem
}


const DesignCard: React.FC<DesignCardProps> = ({design}) => {

  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate(`/posters/${design.designId}`);
  }

  return (
    <Card maxW='sm'>
      <CardBody>
        <Image
          src={design.lowResImgUrl}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="2" spacing="3">
          <Heading size="md">{design.designName}</Heading>
          <Text color="blue.600" fontSize="2xl">
            $10
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
          <Button onClick={handleBuyClick} variant="ghost" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Wishlist-like
          </Button>
      </CardFooter>
    </Card>
  );
};

export default DesignCard;