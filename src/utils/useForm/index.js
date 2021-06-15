import { useState } from 'react';

export const useForm = (initValue) => {
  const [values, setValues] = useState(initValue);
  return [
    values,
    (formType, formValues) => {
      if (formType === 'reset') {
        return setValues(initValue);
      }
      return setValues({ ...values, [formType]: formValues });
    }];
};
