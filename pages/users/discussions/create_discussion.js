import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Form, notification } from "antd";
import { userAPI } from "service/user";

const PostDiscussion = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUserIdFromSession = () => {
    const userId = sessionStorage.getItem("userId");
    return userId || null;
  };

  useEffect(() => {
    const userId = getUserIdFromSession();
    setUserId(userId);
    setIsLoggedIn(!!userId);
  }, []);

  const checkIfLoggedIn = () => {
    if (!userId || !isLoggedIn) {
      notification.warning({
        message: "You are not logged in",
        description: "Please log in to post a discussion.",
        placement: "bottomRight",
        duration: 3,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (values) => {
    if (!checkIfLoggedIn()) return;

    try {
      const { title, content } = values;
      const response = await userAPI.createDiscussion(userId, {
        title,
        content,
      });

      if (response && response.data) {
        notification.success({
          message: "Post Successful!",
          description: "Your discussion has been posted successfully.",
          placement: "bottomRight",
        });
        onClose();
        form.resetFields();
      } else {
        notification.error({
          message: "Error Occurred!",
          description: "Unable to post the discussion. Please try again.",
          placement: "bottomRight",
        });
      }
    } catch (error) {
      console.error("Error posting discussion:", error);
      notification.error({
        message: "Error Occurred!",
        description:
          error?.response?.data?.message ||
          "Unable to post the discussion. Please try again.",
        placement: "bottomRight",
      });
    }
  };

  return (
    <Modal
      title="Post Discussion"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      style={{ borderRadius: "8px" }}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ marginRight: "30px" }}
      >
        <Form.Item
          name="title"
          label="Title : "
          rules={[{ required: true, message: "Title cannot be empty" }]}
        >
          <Input
            style={{
              marginRight: "20px",
              marginLeft: "20px",
            }}
            placeholder="Enter the title here"
          />
        </Form.Item>

        <Form.Item
          name="content"
          label="Content :"
          rules={[{ required: true, message: "Content cannot be empty" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter the content of the discussion here"
            style={{
              margin: "0 20px",
            }}
          />
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
              fontSize: "16px",
              height: "40px",
              width: "60px",
            }}
          >
            Post
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default PostDiscussion;
