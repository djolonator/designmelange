import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipient } from '../types/models';

interface RecipientState {
    recipient: Recipient;
}

const initialState: RecipientState = {
    recipient:{
        phone: '',
        email: '',
        country: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
    },
};

const recipientSlice = createSlice({
  name: 'recipient',
  initialState,
  reducers: {
    updateRecipient: (state, action: PayloadAction<Recipient>) => {
      state.recipient = action.payload;
    },
  },
});

export const { updateRecipient} = recipientSlice.actions;
export default recipientSlice.reducer;
