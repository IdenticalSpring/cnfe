import React, { useState } from "react";
import styled from "styled-components";
import DefaultLayout from "/pages/admin/layout/DefaultLayout";
import { adminAPI } from "service/admin";
import { notification, Spin } from "antd";
import { useRouter } from "next/router";
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

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
  border: 1px solid ${({ hasError, isValid }) => (hasError ? "red" : isValid ? "green" : "#ccc")};
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ hasError, isValid }) => (hasError ? "red" : isValid ? "green" : "#80bdff")};
  }
`;

const ErrorMessage = styled.span`
  color: ${({ isValid }) => (isValid ? "green" : "red")}; // Thay đổi màu sắc ở đây
  font-size: 0.875rem;
  margin-top: -10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid ${({ hasError, isValid }) => (hasError ? "red" : isValid ? "green" : "#ccc")};
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ hasError, isValid }) => (hasError ? "red" : isValid ? "green" : "#80bdff")};
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

  &.submit {
    background-color: var(--success-color);
    color: white;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ title: "", description: "" });
  const [isValid, setIsValid] = useState({ title: false, description: false });
  const router = useRouter();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const validateFields = () => {
    let tempErrors = { title: "", description: "" };
    let isValid = true;

    if (!title) {
      tempErrors.title = "Vui lòng nhập tiêu đề.";
      isValid = false;
      setIsValid((prev) => ({ ...prev, title: false }));
    } else {
      setIsValid((prev) => ({ ...prev, title: true }));
    }

    if (!description) {
      tempErrors.description = "Vui lòng nhập mô tả.";
      isValid = false;
      setIsValid((prev) => ({ ...prev, description: false }));
    } else {
      setIsValid((prev) => ({ ...prev, description: true }));
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateFields()) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const result = await adminAPI.createCourse(formData);
      if (result?.statusCode === 200 || result?.statusCode === 201) {
        notification.success({
          message: "Tạo khóa học thành công",
          description: "Khóa học đã được tạo thành công!",
          placement: "bottomRight",
          duration: 2,
        });
        router.push("/admin/courses");
      }
    } catch (error) {
      notification.error({
        message: "Tạo khóa học thất bại",
        description: "Đã có lỗi xảy ra khi tạo khóa học. Vui lòng thử lại!",
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
        <Title>Tạo khóa học</Title>
        <Form onSubmit={handleSubmit} noValidate>
          <Input
            type="text"
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={validateFields}
            required
            hasError={!!errors.title}
            isValid={isValid.title}
          />
          {errors.title && (
            <ErrorMessage isValid={false}>
              <CloseCircleOutlined style={{ marginRight: 8 }} />
              {errors.title}
            </ErrorMessage>
          )}
          {isValid.title && (
            <ErrorMessage isValid={true}>
              <CheckCircleOutlined style={{ marginRight: 8, color: "green" }} />
              {"Tiêu đề hợp lệ."}
            </ErrorMessage>
          )}

          <TextArea
            placeholder="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={validateFields}
            required
            rows="4"
            hasError={!!errors.description}
            isValid={isValid.description}
          />
          {errors.description && (
            <ErrorMessage isValid={false}>
              <CloseCircleOutlined style={{ marginRight: 8 }} />
              {errors.description}
            </ErrorMessage>
          )}
          {isValid.description && (
            <ErrorMessage isValid={true}>
              <CheckCircleOutlined style={{ marginRight: 8, color: "green" }} />
              {"Mô tả hợp lệ."}
            </ErrorMessage>
          )}

          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          <ButtonContainer>
            <Button type="submit" className="submit" disabled={loading}>
              {loading && <Spin size="small" />}
              Tạo
            </Button>
          </ButtonContainer>
        </Form>
      </Container>
    </DefaultLayout>
  );
};

export default CreateCourse;