import React from 'react';
import PatientTable from '../PatientTable/PatientTable';
import usePatient from 'hooks/usePatient';

const PatientList = () => {
  const { patientData , confirmDelete, loading} = usePatient();

  return (
    <div>
      <PatientTable loading={loading}  handleDelete={confirmDelete} patientData={patientData?.data} />
    </div>
  );
};

export default PatientList;
