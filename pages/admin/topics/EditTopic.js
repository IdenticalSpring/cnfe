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

const EditTopic = ({ topicId }) => {
  const [topicName, setTopicName] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getTopicDetails = async () => {
      setLoading(true);

      try {
        const response = await adminAPI.detailTopic(topicId);
        if (response?.data) {
          setTopicName(response?.data?.name);
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to load topic details. Please try again later.",
          placement: "bottomRight",
          duration: 2,
        });
      } finally {
        setLoading(false);
      }
    };

    if (topicId) {
      getTopicDetails();
    }
  }, [topicId]);

  const handleEditTopic = async () => {
    if (!topicName.trim()) {
      notification.warning({
        message: "Warning",
        description: "Topic name cannot be empty.",
        placement: "bottomRight",
        duration: 2,
      });
      return;
    }

    try {
      const response = await adminAPI.updateTopic(topicId, { name: topicName });
      if (response?.statusCode === 200 || response?.statusCode === 201) {
        notification.success({
          message: "Success",
          description: "Topic has been updated successfully.",
          placement: "bottomRight",
          duration: 2,
        });
        router.push("/admin/topics/");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to update topic. Please try again later.",
        placement: "bottomRight",
        duration: 2,
      });
    }
  };

  return (
    <DefaultLayout>
      <Container>
        <Title>Edit Topic</Title>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Input
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              placeholder="Enter topic name"
              style={{ width: "100%" }}
            />
            <Button
              type="primary"
              onClick={handleEditTopic}
              style={{ marginTop: "20px" }}
            >
              Save Changes
            </Button>
          </>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default EditTopic;
