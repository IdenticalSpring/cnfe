import React, { useState, useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import styled from "styled-components";
import { Input, Form, notification, Spin, Select } from "antd";
import { adminAPI } from "service/admin";
import { useRouter } from "next/router";
import Editor from "components/textEditor/Editor";

const Container = styled.div`
  margin: 0 auto;
  padding: 80px 20px 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const FormContainer = styled(Form)`
  max-width: 100%;
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px;
  min-width: 100px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: var(--success-color);
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

const CreateChapter = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await adminAPI.getAllCourse();
        if (response?.statusCode === 200 && response?.data) {
          setCourses(response.data);
        } else {
          notification.error({
            message: "Error",
            description: "Failed to load courses.",
            placement: "bottomRight",
          });
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        notification.error({
          message: "Error",
          description: "There was an error loading courses.",
          placement: "bottomRight",
        });
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (values) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    const formattedValues = {
      ...values,
      order: Number(values.order),
    };
    setLoading(true);
    try {
      const response = await adminAPI.createChapter(formattedValues);
      console.log("API response:", response);
      if (response?.statusCode === 200 || response?.statusCode === 201) {
        notification.success({
          message: "Success",
          description: "Chapter created successfully!",
          placement: "bottomRight",
        });
        router.push("/admin/chapters");
      }
    } catch (error) {
      console.error("Error creating chapter:", error);
      notification.error({
        message: "Error",
        description: "There was an error creating the chapter.",
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Container>
        <Title>Create a New Chapter</Title>
        <FormContainer
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <FormItem label="Course" name="courseId">
            <Select placeholder="Select a course" style={{ width: "100%" }}>
              {courses.map((course) => (
                <Select.Option key={course.id} value={course.id}>
                  {course?.title}
                </Select.Option>
              ))}
            </Select>
          </FormItem>

          <FormItem label="Title" name="title">
            <Input placeholder="Enter title" />
          </FormItem>

          <FormItem label="Description" name="description">
            <Editor
              value={form.getFieldValue("description")}
              onChange={(newContent) =>
                form.setFieldsValue({ description: newContent })
              }
              placeholder="Enter description"
            />
          </FormItem>

          <FormItem label="Order" name="order">
            <Input type="number" placeholder="Enter order" />
          </FormItem>

          <ButtonContainer>
            <Button type="submit" disabled={loading}>
              {loading ? <Spin /> : "Create"}
            </Button>
          </ButtonContainer>
        </FormContainer>
      </Container>
    </DefaultLayout>
  );
};

export default CreateChapter;
