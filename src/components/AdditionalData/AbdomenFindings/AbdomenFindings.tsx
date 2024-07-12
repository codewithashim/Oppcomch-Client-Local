import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import useAdditionalData, { callApi } from 'hooks/useAdditionalData';

const AbdomenFindings = () => {
  const {    abdomenFindings,
    setAbdomenFindings, } = useAdditionalData();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [formData, setFormData] = useState({ value: '' });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setFormData({ value: '' });
    setCurrentRecord(null);
  };

  const handleAdd = async () => {
    try {
      const response = await callApi('abdomenFindings', 'post', {
        value: formData.value,
      });
      message.success('Added successfully');
      setAbdomenFindings([...abdomenFindings, response]);
      handleCancel();
    } catch (error) {
      message.error('Error adding');
      console.error('Error adding', error);
    }
  };

  const handleEdit = (record) => {
    setIsEditMode(true);
    setCurrentRecord(record);
    setFormData({ value: record.value });
    showModal();
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        id: currentRecord.id,
        data: { value: formData.value },
      };
      const response = await callApi(
        'abdomenFindings',
        'patch',
        updatedData,
      );
      message.success('Updated successfully');
      setAbdomenFindings(
        abdomenFindings?.map((item) =>
          item._id === currentRecord.id ? response : item,
        ),
      );
      handleCancel();
    } catch (error) {
      message.error('Error updating');
      console.error('Error updating', error);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title:
        'Are you sure you want to delete this abdomen findings?',
      content: 'This action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await callApi('abdomenFindings', 'delete', { id });
          message.success('Deleted successfully');
          setAbdomenFindings(
            abdomenFindings.filter((item) => item._id !== id),
          );
        } catch (error) {
          message.error('Error deleting');
          console.error('Error deleting', error);
        }
      },
    });
  };

  const tableData =
    (abdomenFindings &&
      abdomenFindings?.map((data, index) => ({
        ...data,
        key: index + 1,
        serial: index + 1,
        id: data?._id,
        value: data?.value,
      }))) ||
    [];

  const columns = [
    {
      title: 'Serial',
      dataIndex: 'serial',
      key: 'serial',
    },
    {
      title: 'Name',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
          Add Abdomen Findings
        </Button>
      </div>

      <Modal
        title={
          isEditMode
            ? 'Edit Abdomen Findings'
            : 'Add Abdomen Findings'
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={isEditMode ? handleUpdate : handleAdd}
          >
            {isEditMode ? 'Update' : 'Add'}
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              placeholder="Enter name"
              value={formData.value}
              onChange={(e) =>
                setFormData({ ...formData, value: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Modal>

      <Table dataSource={tableData} columns={columns} rowKey="id" />
    </div>
  );
};

export default AbdomenFindings;
