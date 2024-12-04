import React, { useEffect, useState } from "react";
import { adminAPI } from "service/admin";
import { Form, Input, Select, Button, notification, Spin } from "antd";
import Editor from "components/textEditor/Editor";
import DefaultLayout from "/pages/admin/layout/DefaultLayout";
import styled from "styled-components";
import { useRouter } from "next/router";
import CloudinaryUpload from "../component/CloudinaryUpload";

const { Option } = Select;

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

const EditProblem = ({ problemId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState(null);
  const [difficulties, setDifficulties] = useState([]);
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [companies, setCompanies] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await adminAPI.getAllCourse();
        setCourses(result?.data);
      } catch (error) {
        notification.error({
          message: "Error fetching courses",
          description: "Unable to load course list. Please try again later.",
          placement: "bottomRight",
          duration: 2,
        });
      }
    };

    const fetchProblemDetails = async () => {
      setLoading(true);
      try {
        const [topicResult, companyResult, response, difficultyResult] =
          await Promise.all([
            adminAPI.getAllTopics(),
            adminAPI.getAllCompany(),
            adminAPI.detailProblem(problemId),
            adminAPI.getAllDifficulties(),
          ]);

        if (topicResult) setTopics(topicResult.data);
        if (companyResult) setCompanies(companyResult.data);
        if (difficultyResult) setDifficulties(difficultyResult.data);

        if (response?.statusCode === 200 || response?.statusCode === 201) {
          const topicIds = response?.data?.topics?.map((topic) => topic?.id);
          const companyIds = response?.data?.companies?.map(
            (company) => company?.id
          );

          setProblem(response?.data);
          form.setFieldsValue({
            title: response?.data?.title,
            description: response?.data?.description,
            difficultyId: response?.data?.difficultyId,
            courseId: response?.data?.courseId || "",
            topicId: topicIds,
            companyId: companyIds,
            accepted: response?.data?.accepted || 0,
            submissions: response?.data?.submissions || 0,
            likes: response?.data?.likes || 0,
            dislikes: response?.data?.dislikes || 0,
            rating: response?.data?.rating || 0,
            acceptance_rate: response?.data?.acceptance_rate || 0,
          });
        }
        if (difficultyResult.statusCode === 200) {
          setDifficulties(difficultyResult?.data);
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Unable to load problem details.",
          placement: "bottomRight",
        });
      } finally {
        setLoading(false);
      }
    };

    if (problemId) fetchProblemDetails(), fetchCourses();
  }, [problemId, form]);

  const handleSubmit = async (values) => {
    const dataToSend = {
      title: values.title,
      description: values.description,
      difficultyId: values.difficultyId,
      courseId: values.courseId || 0,
      topicIds: values.topicId || [],
      companyIds: values.companyId || [],
      likes: Number(values.likes) || 0,
      dislikes: Number(values.dislikes) || 0,
      rating: Number(values.rating) || 0,
      acceptance_rate: Number(values.acceptance_rate) || 0,
    };

    try {
      await adminAPI.updateProblem(problemId, dataToSend);
      notification.success({
        message: "Success",
        description: "Problem updated successfully!",
        placement: "bottomRight",
      });
      router.push("/admin/problem/");
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to update the problem.",
        placement: "bottomRight",
      });
    }
  };

  return (
    <DefaultLayout>
      <Container>
        <Title>Edit Problem</Title>
        {loading ? (
          <Spin style={{ display: "block", margin: "auto", padding: "50px" }} />
        ) : (
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Title" name="title">
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Editor
                value={form.getFieldValue("description") || ""}
                onChange={(content) =>
                  form.setFieldsValue({ description: content })
                }
                placeholder="Enter description..."
              />
            </Form.Item>

            <Form.Item label="Images" name="images">
              <CloudinaryUpload />
            </Form.Item>

            <Form.Item label="Difficulty" name="difficultyId">
              <Select>
                {difficulties.map((difficulty) => (
                  <Option key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Course" name="courseId">
              <Select>
                <Option value="" disabled>
                  Select course
                </Option>
                {courses.map((course) => (
                  <Option key={course.id} value={course.id}>
                    {course.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Topics" name="topicId">
              <Select mode="multiple">
                {topics?.map((topic) => (
                  <Option key={topic?.id} value={topic?.id}>
                    {topic?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Companies" name="companyId">
              <Select mode="multiple">
                {companies?.map((company) => (
                  <Option key={company?.id} value={company?.id}>
                    {company?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Accepted" name="accepted">
              <Input type="number" readOnly />
            </Form.Item>

            <Form.Item label="Submissions" name="submissions">
              <Input type="number" readOnly />
            </Form.Item>

            <Form.Item label="Likes" name="likes">
              <Input type="number" readOnly />
            </Form.Item>

            <Form.Item label="Dislikes" name="dislikes">
              <Input type="number" readOnly />
            </Form.Item>

            <Form.Item label="Rating" name="rating">
              <Input type="number" step="0.1" readOnly />
            </Form.Item>

            <Form.Item label="Acceptance Rate" name="acceptance_rate">
              <Input type="number" step="0.1" readOnly />
            </Form.Item>

            <Form.Item>
              <StyledButton type="primary" htmlType="submit">
                Save Changes
              </StyledButton>
            </Form.Item>
          </Form>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default EditProblem;
