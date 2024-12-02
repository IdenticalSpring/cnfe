import { useState, useEffect } from "react";
import DefaultLayout from "pages/admin/layout/DefaultLayout";
import { Input, Button, Form, notification, Spin } from "antd";
import { adminAPI } from "service/admin";
import styled from "styled-components";
import Editor from "components/textEditor/Editor";
import { useRouter } from "next/router";

const Container = styled.div`
  margin: 0 10px 10px 10px;
  padding-top: 60px;
  background-color: #ffffff;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 28px;
  text-align: center;
  margin-bottom: 24px;
  color: #333;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #1890ff;
  border: none;
  color: #fff;
  &:hover {
    background-color: #40a9ff;
  }
  &:focus {
    background-color: #40a9ff;
  }
`;

const EditLesson = ({ courseId, lessonId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchLessonData = async (courseId, lessonId) => {
      try {
        setLoading(true);
        const response = await adminAPI.detailLesson(courseId, lessonId);
        if (response?.statusCode === 200 || response?.statusCode === 201) {
          form.setFieldsValue(response?.data);
        } else {
          notification.error({
            message: "Error",
            description: "Failed to load lesson",
            placement: "bottomRight",
          });
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to load lesson!",
          placement: "bottomRight",
        });
      } finally {
        setLoading(false);
      }
    };
  
    if (lessonId && courseId) {
      fetchLessonData(courseId, lessonId);
    }
  }, [lessonId, courseId, form]);

  const handleSubmit = async (values) => {
    const dataToSend = {
      chapterId: Number(values.chapterId),
      title: values.title,
      content: values.content,
    };

    try {
      await adminAPI.updateLesson(lessonId, dataToSend);
      notification.success({
        message: "Succeeded to update lesson",
        description: "Update lesson successfully!",
        placement: "bottomRight",
      });
      router.push("/admin/lessons/");
    } catch (error) {
      notification.error({
        message: "Failed to update lesson",
        description: "Update lesson failed",
        placement: "bottomRight",
      });
    }
  };

  return (
    <DefaultLayout>
      <Container>
        <Title>Edit Lesson</Title>
        {loading ? (
          <Spin style={{ display: "block", margin: "auto", padding: "50px" }} />
        ) : (
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Title"
              name="title"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Chapter ID"
              name="chapterId"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Content"
              name="content"
            >
              <Editor />
            </Form.Item>

            <Form.Item
              label="Order"
              name="order"
            >
              <Input disabled />
            </Form.Item>

            <Form.Item>
              <StyledButton type="primary" htmlType="submit">
                Save changes
              </StyledButton>
            </Form.Item>
          </Form>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default EditLesson;
