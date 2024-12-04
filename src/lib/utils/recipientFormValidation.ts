import { Recipient, RecipientValidation  } from "../types/models";

export const validateRecipientForm = (recipient: Recipient): RecipientValidation  => {
  return {
    phoneIsValid: !!recipient.phone,
    emailIsValid: !!recipient.email,
    countryIsValid: !!recipient.country,
    firstNameIsValid: !!recipient.firstName,
    lastNameIsValid: !!recipient.lastName,
    addressIsValid: !!recipient.address,
    cityIsValid: !!recipient.city,
    zipIsValid: !!recipient.zip,
  };
};
