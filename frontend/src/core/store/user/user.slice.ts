import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from 'features/login/types/user.types';

const initialState: { value: UserProfile | null } = {
  value: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile | null>) => {
      return { value: action.payload };
    }
  }
});

export const { setUser } = userSlice.actions;
