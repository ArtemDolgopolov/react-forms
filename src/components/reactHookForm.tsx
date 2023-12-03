import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setReactHookData } from '../redux/sliceReactHook';
import { useNavigate } from 'react-router-dom';
import countryList from '../utils/allCountries';
import './ReactHookForm.css';

const VALIDATION_MESSAGES = {
  message_uppercase: 'Must begin with an uppercase letter!',
  message_required: 'Required field!',
  message_min: 'Must be at least 1 character!',
  message_number: 'Must be a number!',
  message_positive: 'Must be a positive number!',
};

export const EMAIL_VALIDATION = {
  rules: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
  message: 'Incorrect email! (e.g. example@gmail.com)',
};

const schema = yup.object().shape({
  name: yup.string().matches(/^[A-Z].*/, VALIDATION_MESSAGES.message_uppercase),
  age: yup
    .number()
    .required(VALIDATION_MESSAGES.message_required)
    .typeError(VALIDATION_MESSAGES.message_number)
    .min(0, VALIDATION_MESSAGES.message_positive),
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .email(EMAIL_VALIDATION.message)
    .matches(EMAIL_VALIDATION.rules, EMAIL_VALIDATION.message),
  password: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/,
      'Password must meet the criteria'
    ),
  confirmPassword: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .oneOf([yup.ref('password')], 'Passwords must match' as const),
  gender: yup.string().required(VALIDATION_MESSAGES.message_required),
  acceptTerms: yup.boolean().oneOf([true], VALIDATION_MESSAGES.message_required),
  picture: yup.string().nullable().required(VALIDATION_MESSAGES.message_required),
  country: yup.string().required(VALIDATION_MESSAGES.message_required),
});

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

const ReactHookForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<ReactHookFormData>({
    resolver: yupResolver(schema) as Resolver<ReactHookFormData>,
    shouldUnregister: true,
  });

  const onSubmit: SubmitHandler<ReactHookFormData> = (data) => {
    const picture = previewImage || '';
    dispatch(setReactHookData({ ...data, picture }));
    navigate('/');
  };

  const handlePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setPreviewImage(base64Image);
        setValue('picture', base64Image);
        trigger('picture');
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setValue('picture', previewImage);
    trigger('picture');
  }, [previewImage, setValue, trigger]);

  const handleInputChange =
    (fieldName: keyof ReactHookFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(fieldName, e.target.value);
      trigger(fieldName);
    };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label className="label">
        Name:
        <input
          className="input"
          type="text"
          {...register('name')}
          onChange={handleInputChange('name')}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </label>

      <label className="label">
        Age:
        <input
          className="input"
          type="number"
          {...register('age')}
          onChange={handleInputChange('age')}
        />
        {errors.age && <p className="error">{errors.age.message}</p>}
      </label>

      <label className="label">
        Email:
        <input
          className="input"
          type="text"
          {...register('email')}
          onChange={handleInputChange('email')}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </label>

      <label className="label">
        Password:
        <input
          className="input"
          type="password"
          {...register('password')}
          onChange={handleInputChange('password')}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </label>

      <label className="label">
        Confirm Password:
        <input
          className="input"
          type="password"
          {...register('confirmPassword')}
          onChange={handleInputChange('confirmPassword')}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
      </label>

      <label className="label">
        Gender:
        <select className="input" {...register('gender')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="error">{errors.gender.message}</p>}
      </label>

      <label className="label">
        Accept Terms:
        <input
          className="input"
          type="checkbox"
          {...register('acceptTerms', { required: true })}
          onChange={(e) => setValue('acceptTerms', e.target.checked)}
        />
        {errors.acceptTerms && <p className="error">{errors.acceptTerms.message}</p>}
      </label>

      <label className="label">
        Upload Picture:
        <input
          className="input"
          type="file"
          {...register('picture')}
          onChange={handlePictureChange}
        />
        {previewImage && <img className="previewImage" src={previewImage} alt="Preview" />}
        {errors.picture && <p className="error">{errors.picture.message}</p>}
      </label>

      <label className="label">
        Country:
        <input
          className="input"
          type="text"
          {...register('country')}
          list="countries"
          autoComplete="on"
          onChange={handleInputChange('country')}
        />
        <datalist id="countries">
          {countryList.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && <p className="error">{errors.country.message}</p>}
      </label>
      <br />
      <button className="input" type="submit" disabled={Object.keys(errors).length > 0}>
        Submit
      </button>
    </form>
  );
};

export default ReactHookForm;
