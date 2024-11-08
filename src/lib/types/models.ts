export type CategoryItem = {
    designCategoryId: number;
    designCategoryName: string;
    designCount: number;
  }

export type DesignItem = {
  designName: string;
  description: string;
  designId: number;
  designImgUrl: string;
  designMockUrl: string;
}

export type CartItem = {
  designName: string,
  description: string,
  designId: number;
  designImgUrl: string;
  productId: number;
  quantity: number;
}

export type Category = {
  designCategoryId: number;
  designCategoryName: string;
  designCount: number;
}