import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../state/categoriesSlice';
import { RootState, AppDispatch } from '../../state/store';
import CategoryItem from '../../components/CategoryListItem'

interface CategoryViewNavProps {
    onCategoryClick: (id: number) => void;
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
        <CategoryItem
          key={category.designCategoryId}
          category={category}
          onCategoryClick={() => onCategoryClick(category.designCategoryId)} 
        />
      ))}
    </>
  );
};


export default CategoryViewNav;