import React from "react";
import { Modal, Button, Input, Form, notification } from "antd";
import { userAPI } from "service/user";

const PostDiscussion = ({ visible, onClose, userId }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
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
        });
        onClose(); // Đóng modal sau khi đăng bài thành công
        form.resetFields();
      } else {
        notification.error({
          message: "Error Occurred!",
          description: "Unable to post the discussion. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error posting discussion:", error);
      notification.error({
        message: "Error Occurred!",
        description:
          error?.response?.data?.message ||
          "Unable to post the discussion. Please try again.",
      });
    }
  };

  return (
    <Modal
      title="Post Discussion"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Title cannot be empty" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: "Content cannot be empty" }]}
        >
          <Input.TextArea rows={4} placeholder="Content" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Post
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PostDiscussion;
