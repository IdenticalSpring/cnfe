import React, { useState } from "react";
import styled from "styled-components";
import DefaultLayout from "/pages/admin/layout/DefaultLayout";
import { adminAPI } from "service/admin";
import { notification, Spin } from "antd";
import { useRouter } from "next/router";
import Editor from "components/textEditor/Editor";

const Container = styled.div`
  margin: 0 auto;
  padding: 80px 20px 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #80bdff;
  }
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

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const result = await adminAPI.createCourse(formData);
      if (result?.statusCode === 200 || result?.statusCode === 201) {
        notification.success({
          message: "Course Created Successfully",
          description: "The course has been created successfully!",
          placement: "bottomRight",
          duration: 2,
        });
        router.push("/admin/courses");  
      }
    } catch (error) {
      notification.error({
        message: "Course Creation Failed",
        description: "An error occurred while creating the course. Please try again!",
        placement: "bottomRight",
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Container>
        <Title>Create Course</Title>
        <Form onSubmit={handleSubmit} noValidate>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Editor
            value={description}
            onChange={(content) => setDescription(content)}
            placeholder="Enter course description..."
          />

          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          <ButtonContainer>
            <Button type="submit" disabled={loading}>
              {loading ? <Spin size="small" /> : "Create"}
            </Button>
          </ButtonContainer>
        </Form>
      </Container>
    </DefaultLayout>
  );
};

export default CreateCourse;