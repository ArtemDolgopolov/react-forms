import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

interface UncontrolledFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: string;
  country: string;
}

interface UncontrolledFormState {
  data: UncontrolledFormData | null;
}

const initialState: UncontrolledFormState = {
  data: null,
};

const uncontrolledFormSlice: Slice<UncontrolledFormState> = createSlice({
  name: 'uncontrolledFormData',
  initialState,
  reducers: {
    setUncontrolledData: (state, action: PayloadAction<UncontrolledFormData>) => {
      state.data = action.payload;
    },
  },
});

export const { setUncontrolledData } = uncontrolledFormSlice.actions;
export const selectUncontrolledFormData = (state: {
  uncontrolledFormData: UncontrolledFormState;
}) => state.uncontrolledFormData.data;

export default uncontrolledFormSlice.reducer;
