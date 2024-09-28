import { configureStore } from '@reduxjs/toolkit';
import uncontrolledFormReducer from './sliceUncontrolled';
import reactHookFormReducer from './sliceReactHook';

const store = configureStore({
  reducer: {
    uncontrolledFormData: uncontrolledFormReducer,
    reactHookFormData: reactHookFormReducer,
  },
});

export default store;
