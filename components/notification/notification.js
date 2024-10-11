import React from 'react';
import { Button, notification, Space } from 'antd';

const NotificationComponent = ({ message, description, pauseOnHover }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: message || 'Default Title',
      description: description || 'This is the default content of the notification.',
      pauseOnHover: pauseOnHover,
    });
  };

  return (
    <>
      {contextHolder}
      <Space>
        <Button type="primary" onClick={openNotification}>
          Open Notification
        </Button>
      </Space>
    </>
  );
};

export default NotificationComponent;