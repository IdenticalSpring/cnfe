import React, { useState } from 'react';
import { Table, Button, Divider, Modal, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin-right: 20px;
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: var(--orange-color);
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
  img {
    border-radius: 5px;
  }

  .ant-table-tbody > tr > td {
    text-align: center;
  }

  .ant-table-tbody > tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
  
  .ant-table-tbody > tr:nth-child(even) {
    background-color: #ffffff;
  }
  
  .custom-iconEdit {
    color: green;
    }
    
  .custom-iconDelete {
    color: red;
    }
`;

const TableCourse = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [expandedKeys, setExpandedKeys] = useState(new Set());
  const [data, setData] = useState([
    {
      key: '1',
      title: 'Title 1',
      description: 'This is another example of a long description that will be truncated when necessaryThis is another example of a long description that will be truncated when necessaryThis is another example of a long description that will be truncated when necessary.',
      img: '/assets/img/logo-nobg.png',
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
    {
      key: '3',
      title: 'Title 3',
      description: 'This is the description for item 3',
      img: 'https://via.placeholder.com/50',
      createAt: '2024-08-15',
      updateAt: '2024-08-16',
    },
    {
      key: '4',
      title: 'Title 4',
      description: 'This is the description for item 4',
      img: 'https://via.placeholder.com/50',
      createAt: '2024-07-10',
      updateAt: '2024-07-11',
    },
    {
      key: '5',
      title: 'Title 5',
      description: 'This is the description for item 5',
      img: 'https://via.placeholder.com/50',
      createAt: '2024-06-05',
      updateAt: '2024-06-06',
    },
    {
      key: '6',
      title: 'Title 6',
      description: 'This is the description for item 6',
      img: 'https://via.placeholder.com/50',
      createAt: '2024-05-20',
      updateAt: '2024-05-21',
    },
    {
      key: '7',
      title: 'Title 7',
      description: 'This is the description for item 7',
      img: 'https://via.placeholder.com/50',
      createAt: '2024-04-12',
      updateAt: '2024-04-13',
    },
    {
      key: '8',
      title: 'Title 8',
      description: 'This is the description for item 8',
      img: 'https://via.placeholder.com/50',
      createAt: '2024-03-15',
      updateAt: '2024-03-16',
    },
    {
      key: '9',
      title: 'Title 9',
      description: 'This is the description for item 9',
      img: 'https://via.placeholder.com/50',
      createAt: '2024-02-10',
      updateAt: '2024-02-11',
    },
    {
      key: '10',
      title: 'Title 10',
      description: 'This is the description for item 10',
      img: 'https://via.placeholder.com/50',
      createAt: '2024-01-05',
      updateAt: '2024-01-06',
    },
  ]);

  const truncateDescription = (description) => {
    if (description.length <= 10) {
      return description;
    }
    
    let truncated = description.substring(0, 10);
    // Lùi lại đến khoảng trắng cuối cùng để không cắt giữa từ
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    return lastSpaceIndex !== -1 ? truncated.substring(0, lastSpaceIndex) + ' ...' : truncated + ' ...';
  };

  const toggleExpand = (key) => {
    const newExpandedKeys = new Set(expandedKeys);
    if (newExpandedKeys.has(key)) {
      newExpandedKeys.delete(key);
    } else {
      newExpandedKeys.add(key);
    }
    setExpandedKeys(newExpandedKeys);
  };
  
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 150,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => {
        const isExpanded = expandedKeys.has(record.key);
        const displayText = isExpanded ? text : truncateDescription(text);

        return (
          <span onClick={() => toggleExpand(record.key)} style={{ cursor: 'pointer', color: isExpanded ? 'blue' : 'black' }}>
            {displayText}
          </span>
        );
      },
      width: 500,
    },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      width: 150,
      render: (text, record) => <img src={record.img} alt={record.title} width="50" />,
    },
    {
      title: 'Created At',
      dataIndex: 'createAt',
      key: 'createAt',
      width: 150,
    },
    {
      title: 'Updated At',
      dataIndex: 'updateAt',
      key: 'updateAt',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (text, record) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined className='custom-iconEdit' />}
            onClick={() => handleEdit(record.key)}
          />
          <Divider type="vertical" />
          <Button
            type="link"
            icon={<DeleteOutlined className='custom-iconDelete' />}
            onClick={() => showDeleteModal(record.key)}
          />
        </span>
      ),
    },
  ];

  const handleEdit = (key) => {
    console.log('Edit record:', key);
  };

  const showDeleteModal = (key) => {
    setSelectedKey(key);
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    setData((prevData) => prevData.filter((item) => item.key !== selectedKey));
    setIsModalVisible(false);

    notification.success({
      message: 'Xóa thành công',
      description: 'Khóa học đã được xóa thành công.',
      placement: 'bottomRight',
      duration: 2,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <TableContainer>
      <StyledTable columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      <Modal
        title="Xác nhận xóa"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa tài khoản này?</p>
      </Modal>
    </TableContainer>
  );
};

export default TableCourse;
