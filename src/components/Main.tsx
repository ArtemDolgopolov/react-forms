import React from 'react';
import { useSelector } from 'react-redux';
import Tile from './Tile';
import { selectUncontrolledFormData } from '../redux/sliceUncontrolled';
import { selectReactHookFormData } from '../redux/sliceReactHook';

const Main: React.FC = () => {
  const uncontrolledData = useSelector(selectUncontrolledFormData);
  const reactHookData = useSelector(selectReactHookFormData);

  return (
    <div>
      <h1>Main Page</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {uncontrolledData && <Tile formData={uncontrolledData} formType="Uncontrolled Form" />}
        {reactHookData && <Tile formData={reactHookData} formType="React Hook Form" />}
      </div>
    </div>
  );
};

export default Main;
