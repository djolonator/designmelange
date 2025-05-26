import { Recipient } from "../types/models";
import { token } from "./token";
import { CartItem } from "../types/models";

export const login = async (email: string, password: string) => {
  const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  return response;
};

export const register = async (email: string, password: string) => {
  const response = await fetch(
    process.env.REACT_APP_API_BASE_URL + "/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }
  );

  return response;
};

export const refresh = async (refreshToken: string) => {
  const response = await fetch(
    process.env.REACT_APP_API_BASE_URL + "/refresh",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    }
  );

  return response;
};

export const callculateCost = async (
  recipient: Recipient,
  cartItems: CartItem[]
) => {
  const response = await fetch(
    process.env.REACT_APP_API_BASE_URL + "/estimateTotalCost",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await token()}`,
      },
      body: JSON.stringify({
        recipient: {
          phone: recipient.phone,
          email: recipient.email,
          firstName: recipient.firstName,
          lastName: recipient.lastName,
          address: recipient.address,
          country: recipient.country,
          city: recipient.city,
          zip: recipient.zip,
        },
        cartItems: cartItems,
      }),
    }
  );

  return response;
};

export const getDesign = async (designId: string) => {
  const response = await fetch(
    process.env.REACT_APP_API_BASE_URL + "/design/" + designId,
    {
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    }
  );
  return response;
};

export const initiatePaypallOrder = async () => {
  const response = await fetch(
    process.env.REACT_APP_API_BASE_URL + "/initiatePaypallOrder",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await token()}`,
      },
    }
  );
  return response;
};

export const capturePaypallOrder = async (orderID: string) => {
  const response = await fetch(
    process.env.REACT_APP_API_BASE_URL + `/capturePaypallOrder/${orderID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await token()}`,
      },
    }
  );
  return response;
};

export const designsByCategory = async (
  designCategoryId: number,
  page: number
) => {
  const response = await fetch(
    process.env.REACT_APP_API_BASE_URL +
      "/designsByCategory/" +
      designCategoryId +
      "?page=" +
      page,
    {
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    }
  );
  return response;
};

export const bestsellersDesigns = async (
  page: number
) => {
  const response = await fetch(
    process.env.REACT_APP_API_BASE_URL +
      "/bestsellingDesigns/" +
      "?page=" +
      page,
    {
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    }
  );
  return response;
};

export const designsSearch = async (
  page: number,
  term: string
) => {
  const response = await fetch(
    process.env.REACT_APP_API_BASE_URL +
      "/designsSearch/" +
      "?page=" +
      page +
      "&term=" +
      term,
    {
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    }
  );
  return response;
};

export const orders = async () => {
  const response = await fetch(
    process.env.REACT_APP_API_BASE_URL + "/orders",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await token()}`,
      },
    }
  );
  return response;
};

export const designs = async (
  page: number
) => {
  const response = await fetch(
    process.env.REACT_APP_API_BASE_URL + "/designs" +
     "?page=" +
      page,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await token()}`,
      },
    }
  );
  return response;
};
