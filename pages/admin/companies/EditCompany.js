import { useEffect, useState } from "react";
import styled from "styled-components";
import DefaultLayout from "../layout/DefaultLayout";
import { Input, Button, notification, Spin } from "antd";
import { adminAPI } from "service/admin";
import { useRouter } from "next/router";

const Container = styled.div`
  margin: 0 auto;
  padding: 80px 20px 20px;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EditCompany = ({ companyId }) => {
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getCompanyDetails = async () => {
      setLoading(true);

      try {
        const response = await adminAPI.detailTopic(companyId);
        if (response?.data) {
          setCompanyName(response?.data?.name);
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description:
            "Failed to load company details. Please try again later.",
          placement: "bottomRight",
          duration: 2,
        });
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      getCompanyDetails();
    }
  }, [companyId]);

  const handleEditCompany = async () => {
    if (!companyName.trim()) {
      notification.warning({
        message: "Warning",
        description: "Company name cannot be empty.",
        placement: "bottomRight",
        duration: 2,
      });
      return;
    }

    try {
      const response = await adminAPI.updateCompany(companyId, {
        name: companyName,
      });
      if (response?.statusCode === 200 || response?.statusCode === 201) {
        notification.success({
          message: "Success",
          description: "Company has been updated successfully.",
          placement: "bottomRight",
          duration: 2,
        });
        router.push("/admin/companies/");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to update company. Please try again later.",
        placement: "bottomRight",
        duration: 2,
      });
    }
  };

  return (
    <DefaultLayout>
      <Container>
        <Title>Edit Company</Title>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              style={{ width: "100%" }}
            />
            <ButtonContainer>
              <Button
                type="primary"
                onClick={handleEditCompany}
                style={{ marginTop: "20px" }}
              >
                Save Changes
              </Button>
            </ButtonContainer>
          </>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default EditCompany;
