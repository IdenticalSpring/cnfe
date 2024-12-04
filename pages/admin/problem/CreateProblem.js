import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DefaultLayout from "/pages/admin/layout/DefaultLayout";
import { adminAPI } from "service/admin";
import { notification, Spin, Select } from "antd";
import { useRouter } from "next/router";
import Editor from "components/textEditor/Editor";
import CloudinaryUpload from "../component/CloudinaryUpload";

const { Option } = Select;

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
  border: 1px solid
    ${({ hasError, isValid }) =>
      hasError ? "red" : isValid ? "green" : "#ccc"};
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ hasError, isValid }) =>
      hasError ? "red" : isValid ? "green" : "#80bdff"};
  }
`;

const Label = styled.label`
  font-weight: bold;
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

const CreateProblem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [difficultyId, setDifficultyId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);
  const [difficultyOptions, setDifficultyOptions] = useState([]);
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [rating, setRating] = useState("");
  const [acceptanceRate, setAcceptanceRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState([]);
  const [topicOptions, setTopicOptions] = useState([]);
  const [company, setCompany] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await adminAPI.getAllCourse();
        setCourseOptions(result?.data);
      } catch (error) {
        notification.error({
          message: "Error fetching courses",
          description: "Unable to load courses. Please try again later!",
          placement: "bottomRight",
          duration: 2,
        });
      }
    };

    const fetchDifficulties = async () => {
      try {
        const result = await adminAPI.getAllDifficulties();
        setDifficultyOptions(result?.data);
      } catch (error) {
        notification.error({
          message: "Error fetching difficulties",
          description: "Unable to load difficulties. Please try again later!",
          placement: "bottomRight",
          duration: 2,
        });
      }
    };

    const fetchTopicCompany = async () => {
      try {
        const result = await adminAPI.getAllTopics();
        setTopicOptions(result?.data);
        const response = await adminAPI.getAllCompany();
        setCompanyOptions(response?.data);
      } catch (error) {
        notification.error({
          message: "Error fetching data",
          description: "Unable to load options. Please try again later!",
          placement: "bottomRight",
          duration: 2,
        });
      }
    };

    fetchTopicCompany();
    fetchCourses();
    fetchDifficulties();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = {
      title,
      description,
      difficultyId,
      courseId,
      likes: Number(likes),
      dislikes: Number(dislikes),
      rating: Number(rating),
      acceptance_rate: Number(acceptanceRate),
      companyIds: company?.filter((id) => id),
      topicIds: topic?.filter((id) => id),
    };

    try {
      const result = await adminAPI.createProblem(formData);
      if (result?.statusCode === 200 || result?.statusCode === 201) {
        notification.success({
          message: "Problem created successfully",
          description: "The problem has been created successfully!",
          placement: "bottomRight",
          duration: 2,
        });
        router.push("/admin/problem");
      }
    } catch (error) {
      notification.error({
        message: "Problem creation failed",
        description: "An error occurred while creating the problem. Please try again!",
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
        <Title>Create Problem</Title>
        <Form onSubmit={handleSubmit} noValidate>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Label htmlFor="description">Description</Label>
          <Editor
            value={description}
            onChange={setDescription}
            placeholder="Enter problem description"
          />
          <Label htmlFor="upload">Upload Image</Label>
          <CloudinaryUpload />

          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            id="difficulty"
            placeholder="Select difficulty"
            value={difficulty}
            onChange={(value) => {
              setDifficulty(value);
              const selectedDifficulty = difficultyOptions.find(
                (item) => item.name === value
              );
              setDifficultyId(selectedDifficulty?.id);
            }}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            required
          >
            <Option value="" disabled>
              Select difficulty
            </Option>
            {difficultyOptions.map((difficulty) => (
              <Option key={difficulty.id} value={difficulty?.name}>
                {difficulty?.name}
              </Option>
            ))}
          </Select>

          <Label htmlFor="courseId">Course</Label>
          <Select
            id="course"
            placeholder="Select course"
            value={courseId}
            onChange={(value) => setCourseId(value)}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            required
          >
            <Option value="" disabled>
              Select course
            </Option>
            {courseOptions.map((course) => (
              <Option key={course.id} value={course.id}>
                {course?.title}
              </Option>
            ))}
          </Select>

          <Label htmlFor="topic">Topic</Label>
          <Select
            id="topic"
            mode="multiple"
            placeholder="Select topics"
            value={topic}
            onChange={(value) => setTopic(value)}
            required
          >
            {topicOptions.map((opt) => (
              <Option key={opt.id} value={opt.id}>
                {opt.name}
              </Option>
            ))}
          </Select>

          <Label htmlFor="Company">Company</Label>
          <Select
            id="Company"
            mode="multiple"
            placeholder="Select companies"
            value={company}
            onChange={(value) => setCompany(value)}
            required
          >
            {companyOptions?.map((opt) => (
              <Option key={opt.id} value={opt.id}>
                {opt.name}
              </Option>
            ))}
          </Select>

          <Label htmlFor="likes">Likes</Label>
          <Input
            id="likes"
            type="number"
            placeholder="Likes"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
            required
          />

          <Label htmlFor="dislikes">Dislikes</Label>
          <Input
            id="dislikes"
            type="number"
            placeholder="Dislikes"
            value={dislikes}
            onChange={(e) => setDislikes(e.target.value)}
            required
          />

          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            type="number"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />

          <Label htmlFor="acceptanceRate">Acceptance Rate</Label>
          <Input
            id="acceptanceRate"
            type="number"
            placeholder="Acceptance Rate"
            value={acceptanceRate}
            onChange={(e) => setAcceptanceRate(e.target.value)}
            required
          />

          <ButtonContainer>
            <Button type="submit" disabled={loading}>
              {loading && <Spin size="small" />}
              {loading ? "Creating..." : "Create"}
            </Button>
          </ButtonContainer>
        </Form>
      </Container>
    </DefaultLayout>
  );
};

export default CreateProblem;
