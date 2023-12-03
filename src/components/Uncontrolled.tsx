import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUncontrolledData } from '../redux/sliceUncontrolled';
import countryList from '../utils/allCountries';
import * as yup from 'yup';
import './Uncontrolled.css';

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

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().matches(/^[A-Z].*/, 'Must begin with an uppercase letter!'),
  age: yup
    .number()
    .required('Required field!')
    .typeError('Must be a number!')
    .min(0, 'Must be a positive number!')
    .required('Age is a required field'),
  email: yup
    .string()
    .required('Required field!')
    .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, 'Incorrect email! (e.g. example@gmail.com)'),
  password: yup
    .string()
    .required('Required field!')
    .matches(/(?=.*[a-z])/, 'Must contain at least one lowercase letter!')
    .matches(/(?=.*[A-Z])/, 'Must contain at least one uppercase letter!')
    .matches(/\d/, 'Must contain at least one digit!')
    .matches(/(?=.*?[#?!@$%^&*-])/, 'Must contain at least 1 special character!')
    .min(8, 'Must be at least 8 characters long!'),
  confirmPassword: yup
    .string()
    .required('Retype your password!')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  gender: yup.string(),
  picture: yup
    .mixed<FileList>()
    .test('required', 'Required field!', (files) => files && files.length > 0),
  country: yup.string().required('Required field!'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept it')
    .test('required', 'Required field!', (value) => value === true),
});

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pictureInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: UncontrolledFormData = {
      name: (event.currentTarget.elements.namedItem('name') as HTMLInputElement)?.value || '',
      age: Number((event.currentTarget.elements.namedItem('age') as HTMLInputElement)?.value) || 0,
      email: (event.currentTarget.elements.namedItem('email') as HTMLInputElement)?.value || '',
      password:
        (event.currentTarget.elements.namedItem('password') as HTMLInputElement)?.value || '',
      confirmPassword:
        (event.currentTarget.elements.namedItem('confirmPassword') as HTMLInputElement)?.value ||
        '',
      gender: (event.currentTarget.elements.namedItem('gender') as HTMLInputElement)?.value || '',
      acceptTerms: Boolean(
        (event.currentTarget.elements.namedItem('acceptTerms') as HTMLInputElement)?.checked
      ),
      picture: previewImage || '',
      country: (event.currentTarget.elements.namedItem('country') as HTMLInputElement)?.value || '',
    };

    try {
      await VALIDATION_SCHEMA.validate(formData, { abortEarly: false });
      dispatch(setUncontrolledData(formData));
      navigate('/');
    } catch (validationError: unknown) {
      if (validationError instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        validationError.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setPreviewImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="form-container">
      <div className="form-input">
        <label className="form-label">
          Name:
          <input type="text" name="name" required />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </label>
      </div>
      <div className="form-input">
        <label className="form-label">
          Age:
          <input type="number" name="age" required style={{ marginLeft: '5px' }} />
          {errors.age && <p className="error-message">{errors.age}</p>}
        </label>
      </div>
      <div className="form-input">
        <label className="form-label">
          Email:
          <input type="email" name="email" required style={{ marginLeft: '5px' }} />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </label>
      </div>
      <div className="form-input">
        <label className="form-label">
          Password:
          <input type="password" name="password" required style={{ marginLeft: '5px' }} />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </label>
      </div>
      <div className="form-input">
        <label className="form-label">
          Confirm Password:
          <input type="password" name="confirmPassword" required style={{ marginLeft: '5px' }} />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </label>
      </div>
      <div className="form-input">
        <label className="form-label">
          Gender:
          <select name="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="error-message">{errors.gender}</p>}
        </label>
      </div>
      <div className="form-input">
        <label className="form-label">
          Accept Terms:
          <input type="checkbox" name="acceptTerms" required />
          {errors.acceptTerms && <p className="error-message">{errors.acceptTerms}</p>}
        </label>
      </div>
      <div className="form-input">
        <label className="form-label">
          Upload Picture:
          <input
            type="file"
            ref={pictureInputRef}
            accept=".png, .jpeg, .jpg"
            onChange={handlePictureChange}
          />
          {errors.picture && <p className="error-message">{errors.picture}</p>}
          {previewImage && <img src={previewImage} alt="Preview" className="preview-image" />}
        </label>
      </div>
      <div className="form-input">
        <label className="form-label">
          Country:
          <input type="text" name="country" list="countries" autoComplete="off" />
          {errors.country && <p className="error-message">{errors.country}</p>}
          <datalist id="countries">
            {countryList.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </label>
      </div>
      <br />
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
