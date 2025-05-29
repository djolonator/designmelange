export type CategoryItem = {
  designCategoryId: number;
  designCategoryName: string;
  designCount: number;
}

export type DesignItem = {
  designName: string;
  description: string;
  designId: number;
  mockImgUrl: string;
  printImgUrl: string;
  lowResImgUrl: string;
  bfImgUrl: string;
}

export type CartItem = {
  designName: string,
  description: string,
  designId: number;
  printImgUrl: string;
  lowResImgUrl: string;
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

export type Order = {
  orderId: number,
  printfullOrderId: number,
  totalCost: number,
  orderItems: OrderItem[]
}

export type OrderItem = {
  quantity: number,
  design: Design
}

export type Design = {
  designName: string,
  lowResImgUrl: string
}

export type OrderDetailsModel = {
  status: string,
  shipping: string,
  shippingServiceName: string,
  recipient: Recipient,
  trackingUrls: string[],
}


