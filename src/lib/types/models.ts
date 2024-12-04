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

export type Checkout = {
  recipient: Recipient,
  cartItems: CartItem[]
}

export type Recipient = {
  phone: string,
  email: string,
  country: string,
  firstName: string,
  lastName: string,
  address: string,
  city: string,
  zip: string,
}

export type CostCalculations = {
  shippingCost: number;
  itemsCost: number;
  totalCost: number;
}

export type ErrorResponse = {
  type: string;
  title: string;
  status: number;
  errors: Record<string, string[]>;
}

export type LoginResponse = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export type RecipientValidation = {
  phoneIsValid: boolean,
  emailIsValid: boolean,
  countryIsValid: boolean,
  firstNameIsValid: boolean,
  lastNameIsValid: boolean,
  addressIsValid: boolean,
  cityIsValid: boolean,
  zipIsValid: boolean,
}
