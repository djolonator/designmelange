import React from 'react';
import { Link, Text } from '@chakra-ui/react';
import { CategoryItem } from '../types/intefaces'; 

interface CategoryLinkProps {
  category: CategoryItem;
  onCategoryClick: (id: number) => void; 
}

const CategoryListItem: React.FC<CategoryLinkProps> = ({ category, onCategoryClick }) => {
  const handleClick = () => {
    onCategoryClick(category.designCategoryId); 
  };

  return (
    <Link onClick={handleClick} color="blue.500" textDecoration="underline" cursor="pointer">
      <Text>
        {category.designCategoryName} ({category.designCount})
      </Text>
    </Link>
  );
};

export default CategoryListItem;