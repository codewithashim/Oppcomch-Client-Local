import React, { useRef, useState } from 'react';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { InputRef, Spin, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, Form, Select, message } from 'antd';
import Highlighter from 'react-highlight-words';
import Link from 'next/link';
import UpdatePatient from 'components/Modal/UpdatePatient/UpdatePatient';
import { useAuthStore } from 'store/authStore';

const { Option } = Select;

const PatientTable = ({ patientData, handleDelete, loading }: any) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [sortBy, setSortBy] = useState('');
  const [hospitalStayFilter, setHospitalStayFilter] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { user, isLogin} = useAuthStore();

  const tableData =
    patientData?.map((data, index) => ({
      ...data,
      key: index + 1,
      serial: index + 1,
      id: data?._id,
      name: data?.patientInformation?.name,
      age: data?.patientInformation?.age,
      hospitalStay: data?.patientInformation?.hospitalStay,
      registrationNo: data?.patientInformation?.registrationNo,
      phoneNumber: data?.patientInformation?.phoneNumber,
    })) || [];

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleHospitalStayFilterChange = (value: string) => {
    setHospitalStayFilter(value);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const showEditModal = (patient: any) => {
    setEditingPatient(patient);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Handle edit logic here
    setIsModalVisible(false);
    message.success('Patient edited successfully');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getColumnSearchProps = (dataIndex: string): TableColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0] as string}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys[0] as string)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys[0] as string)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0] as string);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      if (typeof value === 'string') {
        const data = record[dataIndex];
        if (typeof data === 'string') {
          return data.toLowerCase().includes(value.toLowerCase());
        }
      }
      return false;
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const hospitalStayFilters = [
    { text: '1-10 days', value: '1-10' },
    { text: '10-15 days', value: '10-15' },
    { text: '15-20 days', value: '15-20' },
    { text: '20-30 days', value: '20-30' },
  ];

  const applyHospitalStayFilter = (data: any[], filter: string) => {
    switch (filter) {
      case '1-10':
        return data.filter(
          (item) => item.hospitalStay >= 1 && item.hospitalStay <= 10,
        );
      case '10-15':
        return data.filter(
          (item) => item.hospitalStay >= 10 && item.hospitalStay <= 15,
        );
      case '15-20':
        return data.filter(
          (item) => item.hospitalStay >= 15 && item.hospitalStay <= 20,
        );
      case '20-30':
        return data.filter(
          (item) => item.hospitalStay >= 20 && item.hospitalStay <= 30,
        );
      default:
        return data;
    }
  };

  const columns: TableColumnsType<any> = [
    {
      title: 'S. No',
      dataIndex: 'serial',
      key: 'serial',
      width: '10%',
      sorter: (a, b) => a?.serial - b?.serial,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name?.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => (
        <Link href={`/admin/patient/${record?.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '10%',
      ...getColumnSearchProps('age'),
      sorter: (a, b) => a.age?.localeCompare(b.age),
      sortDirections: ['descend', 'ascend'],
      render: (text) => `${text || 0} years`,
    },
    {
      title: 'Hospital Stay',
      dataIndex: 'hospitalStay',
      key: 'hospitalStay',
      width: '15%',
      filters: hospitalStayFilters,
      onFilter: (value, record) =>
        applyHospitalStayFilter([record], value as string).length > 0,
      sorter: (a, b) => a.hospitalStay - b.hospitalStay,
      render: (text) => `${text || 0} days`,
    },
    {
      title: 'Registration No',
      dataIndex: 'registrationNo',
      key: 'registrationNo',
      ...getColumnSearchProps('registrationNo'),
      sorter: (a, b) => a.registrationNo?.localeCompare(b.registrationNo),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      ...getColumnSearchProps('phoneNumber'),
      sorter: (a, b) => a.phoneNumber?.localeCompare(b.phoneNumber),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          {
            user?.role === 'admin' && (
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record?.id)}
          >
            Delete
          </Button>
            )
          }
        </Space>
      ),
    },
  ];

  const filteredData = applyHospitalStayFilter(tableData, hospitalStayFilter);
  let sortedData = filteredData
    .sort((a, b) => {
      if (!sortBy) return 0;
      if (sortBy === 'name') return a.name?.localeCompare(b.name);
      if (sortBy === 'hospitalStay') return a.hospitalStay - b.hospitalStay;
      if (sortBy === 'registrationNo')
        return a.registrationNo?.localeCompare(b.registrationNo);
      if (sortBy === 'phoneNumber')
        return a.phoneNumber?.localeCompare(b.phoneNumber);
      return 0;
    })
    ?.filter((item) =>
      item?.name?.toLowerCase()?.includes(searchText?.toLowerCase()),
    );

  const handleGlobalSearch = (searchTerm: any) => {
    sortedData = patientData?.filter((item) => {
      const patientInfoMatch = item?.patientInformation
        ? Object.values(item.patientInformation).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
          )
        : false;

      const diagnosisMatch = item?.diagnosis
        ? item.diagnosis.some((diagnosis) =>
            Object.values(diagnosis).some((value) =>
              value
                ?.toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
            ),
          )
        : false;

      const investigationsMatch = item?.investigations
        ? Object.values(item.investigations).some((investigationCategory) => {
            if (Array.isArray(investigationCategory)) {
              return investigationCategory.some((investigation) =>
                Object.values(investigation).some((value) =>
                  value
                    ?.toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
                ),
              );
            }
            return false;
          })
        : false;

      return patientInfoMatch || diagnosisMatch || investigationsMatch;
    });
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <>
      <Form layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item>
          <div className="flex flex-col flex-wrap gap-2 lg:flex-row">
            <Form.Item className="w-full lg:w-[55%]">
              <Input.Search
                allowClear
                placeholder="Search"
                onSearch={handleGlobalSearch}
                className="w-full"
                enterButton={
                  <Button type="primary" size="large">
                    Search
                  </Button>
                }
              />
            </Form.Item>
            <Form.Item className="w-full px-2 lg:w-[50%]">
              <Select
                defaultValue=""
                className="w-full shadow-sm outline-none focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                onChange={handleSortChange}
                size="large"
              >
                <Option value="">Sort By</Option>
                <Option value="name">Name</Option>
                <Option value="hospitalStay">Hospital Stay</Option>
                <Option value="registrationNo">Registration No</Option>
                <Option value="phoneNumber">Phone Number</Option>
              </Select>
            </Form.Item>
            <Form.Item className="w-full px-2 lg:w-[40%]">
              <Select
                defaultValue=""
                className="w-full shadow-sm outline-none focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                onChange={handleHospitalStayFilterChange}
                size="large"
              >
                <Option value="">Filter by Hospital Stay</Option>
                {hospitalStayFilters.map((filter) => (
                  <Option key={filter.value} value={filter.value}>
                    {filter.text}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form.Item>
      </Form>
      <Spin spinning={loading} size="large">
        <Table
          columns={columns}
          dataSource={sortedData}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            pageSizeOptions: ['10', '25', '50', '100'],
            showSizeChanger: true,
            onChange: handleTableChange,
          }}
        />
      </Spin>

      <UpdatePatient
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        editingPatient={editingPatient}
      />
    </>
  );
};

export default PatientTable;
