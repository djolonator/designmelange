import { Recipient } from '../types/models';
import {token} from './token';
import { CartItem } from '../types/models';

export const login = async (email:string, password: string) => {
    const response =  await fetch(
        process.env.REACT_APP_API_BASE_URL + "/login",
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
}

export const register = async (email:string, password: string) => {
  const response =  await fetch(
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
}

export const refresh = async (refreshToken: string) => {
  const response =  await fetch(
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
}

export const callculateCost = async (recipient: Recipient, cartItems:CartItem[] ) => {
  const response = await fetch(
    process.env.REACT_APP_API_BASE_URL + "/calculateCost",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${await token()}`
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
  )

    return response;
}

export const getDesign = async (designId: string ) => {
  const response = await fetch(
    process.env.REACT_APP_API_BASE_URL + "/design/" + designId,
    {
      headers: {
        'Authorization': `Bearer ${await token()}`
      },
    }
  )
    return response;
}
