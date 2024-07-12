import { useState, useEffect } from 'react';
import axios from 'axios';
import { GET_USER_URL, DELETE_USER_URL } from 'utils/urls/auth';
import { message, Modal } from 'antd';

const fetchUserData = async () => {
  try {
    const response = await axios.get(GET_USER_URL);
    return response.data; 
  } catch (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
};

const useUser = () => {
  const [userData, setUserData] = useState<any[]>([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        if (Array.isArray(data)) {
          setUserData(data);
        } else if (data?.data && Array.isArray(data.data)) {
          setUserData(data.data);
        } else {
          throw new Error("Unexpected data format");
        }
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const confirmDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'This action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(DELETE_USER_URL(id));
      if (response.status === 200) {
        message.success('User deleted successfully');
        const newData = await fetchUserData();
        if (Array.isArray(newData)) {
          setUserData(newData);
        } else if (newData?.data && Array.isArray(newData.data)) {
          setUserData(newData.data);
        } else {
          throw new Error("Unexpected data format");
        }
      } else {
        message.error('Failed to delete user');
      }
    } catch (error) {
      message.error('An error occurred while deleting the user');
    }
  };

  return {
    userData,
    confirmDelete
  };
};

export default useUser;