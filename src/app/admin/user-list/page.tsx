'use client';
import useUser from 'hooks/useUser';
import React from 'react';
import { Table, Space, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAuthStore } from 'store/authStore';

const UserList = () => {
  const { userData, confirmDelete } = useUser();
  const { user } = useAuthStore();

  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          {user?.role === 'admin' && (
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => confirmDelete(record?.id)}
            >
              Delete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <section style={{ padding: '20px' }}>
      <h2>User List</h2>
      <Table
        columns={columns}
        dataSource={userData}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 'max-content' }}
      />
    </section>
  );
};

export default UserList;