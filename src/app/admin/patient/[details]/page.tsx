'use client'
import PatientDetails from 'components/Patient/PatientDetails/PatientDetails';
import usePatient from 'hooks/usePatient';
import { Spin } from 'antd';
import { useState, useEffect } from 'react';

const PatientDetailsPage = ({ params }) => {
  const { fetchPatientById } = usePatient();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let patientId = params?.details;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPatientById(patientId);
        setPatientData(data?.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchPatientById, patientId]);

  return (
     <section>
      {loading ? (
        <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }} />
      ) : (
        <PatientDetails patientData={patientData} />
      )}
    </section>
  );
};

export default PatientDetailsPage;
