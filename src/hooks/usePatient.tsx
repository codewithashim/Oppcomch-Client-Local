import { useState, useEffect } from 'react';
import axios from 'axios';
import { DeletePatientByIdUrl, GetPatientByIdUrl, GetPatientUrl, UpdatePatientByIdUrl } from 'utils/urls/patient';
import { message, Modal } from 'antd';

const fetchPatientData = async () => {
  try {
    const response = await axios.get(GetPatientUrl);
    return response.data; 
  } catch (error) {
    throw new Error(`Error fetching patient data: ${error.message}`);
  }
};

const fetchPatientById = async (id:any) => {
  try {
    const response = await axios.get(GetPatientByIdUrl(id));
    return response.data; 
  } catch (error) {
    throw new Error(`Error fetching patient data: ${error.message}`);
  }
};

const usePatient = () => {
  const [patientData, setPatientData] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPatientData();
        setPatientData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  const confirmDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this patient?',
      content: 'This action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(DeletePatientByIdUrl(id));
      if (response.status === 200) {
        message.success('Patient deleted successfully');
        const newData = await fetchPatientData();
        setPatientData(newData);
      } else {
        message.error('Failed to delete patient');
      }
    } catch (error) {
      message.error('An error occurred while deleting the patient');
    }
  };

  const handelUpdatePatinet = async (id , data) =>{
    try {
      const response = await axios.patch(UpdatePatientByIdUrl(id), data);
      if (response.status === 200) {
        message.success('Patient update successfully');
        const newData = await fetchPatientData();
        setPatientData(newData);
      } else {
        message.error('Failed to update patient');
      }
    } catch (error) {
      message.error('An error occurred while  the patient');
    }
  }
  
  return {
    patientData,
    confirmDelete,
    fetchPatientById,
    loading,
    error,
    handelUpdatePatinet
  };
};

export default usePatient;
