import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, InputNumber, notification } from "antd";
import DefaultLayoutadmin from "../layout/DefaultLayout";
import Editor from "components/textEditor/Editor";
import { adminAPI } from "service/admin";
import { useRouter } from "next/router";

const TableContainer = styled.div`
  margin: 0 20px;
`;

const Title_Head = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ff9900;
  margin-top: 0;
  display: block;
  visibility: visible;
`;

const ContentWrapper = styled.div`
  padding-top: 70px;
`;

const FormWrapper = styled(Form)`
  margin: 0 auto;

  .form-item {
    margin-bottom: 20px;
  }

  .submit-button {
    display: flex;
    justify-content: flex-end;
  }
`;

const CreateLesson = () => {
  const [content, setContent] = useState("");
  const router = useRouter();

  const onFinish = async (values) => {
    const lessonData = { ...values, content };
    try {
      const response = await adminAPI.createLesson(lessonData);
      console.log("Lesson created:", response);
      if (response?.statusCode === 200 || response?.statusCode === 201) {
        notification.success({
          message: "thành công",
          description: "Tạo lesson thành công!",
          placement: "bottomRight",
        });
        router.push("/admin/lessons");
      }
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Tạo không thành công. Vui lòng thử lại!!!",
        placement: "bottomRight",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
    notification.error({
      message: "Lỗi",
      description: "vui lòng check lại các field trong form!!!",
      placement: "bottomRight",
    });
  };

  return (
    <DefaultLayoutadmin>
      <TableContainer>
        <ContentWrapper>
          <Title_Head>Create Lesson</Title_Head>
          <FormWrapper
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Chapter ID"
              name="chapterId"
              className="form-item"
              rules={[
                { required: true, message: "Please input the Chapter ID!" },
              ]}
              placeholder="vui lòng nhập chapter ID"
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Title"
              name="title"
              className="form-item"
              rules={[{ required: true, message: "Please input the title!" }]}
              placeholder="vui lòng nhập Title"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Content"
              name="content"
              className="form-item"
              rules={[{ required: true, message: "Please input the content!" }]}
            >
              <Editor
                value={content}
                onChange={(newContent) => setContent(newContent)}
                placeholder="vui lòng nhập Content"
              />
            </Form.Item>

            <Form.Item
              label="Order"
              name="order"
              className="form-item"
              rules={[{ required: true, message: "Please input the order!" }]}
              placeholder="vui lòng nhập Order"
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item className="submit-button">
              <Button type="primary" htmlType="submit">
                Create Lesson
              </Button>
            </Form.Item>
          </FormWrapper>
        </ContentWrapper>
      </TableContainer>
    </DefaultLayoutadmin>
  );
};

export default CreateLesson;
