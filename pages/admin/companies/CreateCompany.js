import styled from "styled-components";
import DefaultLayout from "../layout/DefaultLayout";
import { Spin, notification } from "antd";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { adminAPI } from "service/admin";

const Container = styled.div`
  margin: 0 auto;
  padding: 80px 20px 20px;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const CreateCompany = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const dataToSend = { name };

    try {
      const response = await adminAPI.createCompany(dataToSend);
      if (response?.statusCode === 201 ||  response?.statusCode === 201) {
        notification.success({
          message: "Success",
          description: "Company created successfully",
          placement: "bottomRight",
          duration: 2,
        });
        router.push("/admin/companies");
      } else {
        notification.error({
          message: "Error",
          description: "Failed to create company",
          placement: "bottomRight",
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "An error occurred",
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
        <Title>Create New Company</Title>
        <Form onSubmit={handleSubmit} noValidate>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Enter company name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ButtonContainer>
            <Button type="submit" disabled={loading}>
              {loading ? <Spin /> : "Create"}
            </Button>
          </ButtonContainer>
        </Form>
      </Container>
    </DefaultLayout>
  );
};

export default CreateCompany;
