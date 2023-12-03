import React from 'react';

interface TileProps {
  formData: {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    acceptTerms: boolean;
    picture: string | FileList;
    country: string;
  };
  formType: string;
}

const Tile: React.FC<TileProps> = ({ formData, formType }) => {
  if (!formData) return null;

  const displayPicture = () => {
    if (typeof formData.picture === 'string') {
      return (
        <img src={formData.picture} alt="User" style={{ maxWidth: '100px', maxHeight: '100px' }} />
      );
    } else {
      return <p>Invalid image format</p>;
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      <h3>{formType}</h3>
      {displayPicture()}
      <h4>Name: {formData.name}</h4>
      <p>Age: {formData.age}</p>
      <p>Email: {formData.email}</p>
      <p>Password: {formData.password}</p>
      <p>Gender: {formData.gender}</p>
      <p>Accepted?: {formData.acceptTerms.toString()}</p>
      <p>Country: {formData.country}</p>
    </div>
  );
};

export default Tile;
