import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../lib/state/categoriesSlice';
import { RootState, AppDispatch } from '../../lib/state/store';
import CategoryListItem from '../../components/CategoryListItem';
import { CategoryItem } from '../../lib/types/models'; 

interface CategoryViewNavProps {
    onCategoryClick: (category: CategoryItem) => void;
  }

const CategoryViewNav: React.FC<CategoryViewNavProps> = ({ onCategoryClick }) => {

  const dispatch: AppDispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {items.map(category => (
        <CategoryListItem
          key={category.designCategoryId}
          category={category}
          onCategoryClick={() => onCategoryClick(category)} 
        />
      ))}
    </>
  );
};


export default CategoryViewNav;