import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReactHookFormData {
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

interface ReactHookFormState {
  data: ReactHookFormData | null;
}

const initialState: ReactHookFormState = {
  data: null,
};

const reactHookFormSlice = createSlice({
  name: 'reactHookFormData',
  initialState,
  reducers: {
    setReactHookData: (state, action: PayloadAction<ReactHookFormData>) => {
      state.data = action.payload;
    },
  },
});

export const { setReactHookData } = reactHookFormSlice.actions;
export const selectReactHookFormData = (state: { reactHookFormData: ReactHookFormState }) =>
  state.reactHookFormData.data;

export default reactHookFormSlice.reducer;
