import React from 'react';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin-right: 20px;
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #f0f0f0;
    font-weight: bold;
  }
  img {
    border-radius: 5px;
  }

  /* Đổi màu xen kẽ cho các hàng */
  .ant-table-tbody > tr:nth-child(odd) {
    background-color: #f9f9f9; /* Màu cho hàng lẻ */
  }
  
  .ant-table-tbody > tr:nth-child(even) {
    background-color: #ffffff; /* Màu cho hàng chẵn */
  }
`;

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Image',
    dataIndex: 'img',
    key: 'img',
    render: (text, record) => <img src={record.img} alt={record.title} width="50" />,
  },
  {
    title: 'Created At',
    dataIndex: 'createAt',
    key: 'createAt',
  },
  {
    title: 'Updated At',
    dataIndex: 'updateAt',
    key: 'updateAt',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button 
          icon={<EditOutlined />} 
          onClick={() => handleEdit(record.key)} 
          style={{ marginRight: 8 }} 
        />
        <Button 
          icon={<DeleteOutlined />} 
          onClick={() => handleDelete(record.key)} 
          danger 
        />
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    title: 'Title 1',
    description: 'This is the description for item 1',
    img: 'https://via.placeholder.com/50',
    createAt: '2024-10-05',
    updateAt: '2024-10-06',
  },
  {
    key: '2',
    title: 'Title 2',
    description: 'This is the description for item 2',
    img: 'https://via.placeholder.com/50',
    createAt: '2024-09-25',
    updateAt: '2024-09-26',
  },
  // Add more data here
];

const handleEdit = (key) => {
  console.log('Edit record:', key);
};

const handleDelete = (key) => {
  console.log('Delete record:', key);
};

const TableCourse = () => {
  return (
    <TableContainer>
      <StyledTable columns={columns} dataSource={data} />
    </TableContainer>
  );
};

export default TableCourse;
