import React, { useState } from "react";
import { Modal, Button, Input, Form, notification } from "antd";
import { userAPI } from "service/user"; // Thay thế đường dẫn đúng

const PostDiscussion = ({ userId }) => {
  // Thêm userId vào để sử dụng khi gửi bài viết
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Mở modal khi bấm nút
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Gửi bài post lên API
  const handleSubmit = async (values) => {
    try {
      const { title, content } = values;
      // Gửi yêu cầu tạo bài viết cùng với userId và dữ liệu bài viết
      const response = await userAPI.createDiscussion(userId, {
        title,
        content,
      });

      // Kiểm tra nếu phản hồi từ API hợp lệ
      if (response && response.data) {
        notification.success({
          message: "Bài viết thành công!",
          description: "Bài viết của bạn đã được đăng lên.",
        });
        setIsModalVisible(false);
        form.resetFields(); // Reset form sau khi gửi
      } else {
        notification.error({
          message: "Có lỗi xảy ra!",
          description: "Không thể đăng bài viết. Vui lòng thử lại.",
        });
      }
    } catch (error) {
      console.error("Error posting discussion:", error);
      notification.error({
        message: "Có lỗi xảy ra!",
        description:
          error?.response?.data?.message ||
          "Không thể đăng bài viết. Vui lòng thử lại.",
      });
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        New +
      </Button>

      <Modal
        title="Post Discussion"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Title không được để trống" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Content không được để trống" }]}
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
    </div>
  );
};

export default PostDiscussion;
