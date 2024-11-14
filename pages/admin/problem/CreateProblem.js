import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DefaultLayout from "/pages/admin/layout/DefaultLayout";
import { adminAPI } from "service/admin";
import { notification, Spin, Select } from "antd";
import { useRouter } from "next/router";
import Editor from "components/textEditor/Editor";

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
  const [topic, setTopic] = useState("");
  const [topicOptions, setTopicOptions] = useState([]);
  const [company, setCompany] = useState("");
  const [companyOptions, setCompanyOptions] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await adminAPI.getAllCourse();
        setCourseOptions(result?.data);
      } catch (error) {
        notification.error({
          message: "Lỗi khi lấy danh sách khóa học",
          description:
            "Không thể tải danh sách khóa học. Vui lòng thử lại sau!",
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
          message: "Lỗi khi lấy danh sách độ khó",
          description: "Không thể tải danh sách độ khó. Vui lòng thử lại sau!",
          placement: "bottomRight",
          duration: 2,
        });
      }
    };

    const fetchTopicCompany = async () => {
      try {
        const result = await adminAPI.getAllTopics();
        setTopicOptions(result?.data);
        const response = await adminAPI.getAllCompanies();
        setCompanyOptions(response?.data);
      } catch (error) {
        notification.error({
          message: "Lỗi khi lấy dữ liệu",
          description:
            "Không thể tải dữ liệu các tùy chọn. Vui lòng thử lại sau!",
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
      companyIds: company.filter(id => id),
      topicIds: topic.filter(id => id),
    };
    console.log("🚀 ~ handleSubmit ~ formData:", formData)

    try {
      const result = await adminAPI.createProblem(formData);
      if (result?.statusCode === 200 || result?.statusCode === 201) {
        notification.success({
          message: "Tạo bài tập thành công",
          description: "Bài tập đã được tạo thành công!",
          placement: "bottomRight",
          duration: 2,
        });
        router.push("/admin/problem");
      }
    } catch (error) {
      notification.error({
        message: "Tạo bài tập thất bại",
        description: "Đã có lỗi xảy ra khi tạo bài tập. Vui lòng thử lại!",
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
        <Title>Tạo bài tập</Title>
        <Form onSubmit={handleSubmit} noValidate>
          <Label htmlFor="title">Tiêu đề</Label>
          <Input
            id="title"
            type="text"
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Label htmlFor="description">Mô tả</Label>
          <Editor
            value={description}
            onChange={setDescription}
            placeholder="Nhập mô tả bài tập"
          />

          <Label htmlFor="difficulty">Độ khó</Label>
          <Select
            id="difficulty"
            placeholder="Chọn độ khó"
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
              Chọn độ khó
            </Option>
            {difficultyOptions.map((difficulty) => (
              <Option key={difficulty.id} value={difficulty?.name}>
                {difficulty?.name}
              </Option>
            ))}
          </Select>

          <Label htmlFor="courseId">Khóa học</Label>
          <Select
            id="course"
            placeholder="Chọn khóa học"
            value={courseId}
            onChange={(value) => setCourseId(value)}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            required
          >
            <Option value="" disabled>
              Chọn khóa học
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
            placeholder="Chọn topic"
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
            placeholder="Chọn Company"
            value={company}
            onChange={(value) => setCompany(value)}
            required
          >
            {companyOptions.map((opt) => (
              <Option key={opt.id} value={opt.id}>
                {opt.name}
              </Option>
            ))}
          </Select>

          <Label htmlFor="likes">Lượt thích</Label>
          <Input
            id="likes"
            type="number"
            placeholder="Likes"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
            required
          />

          <Label htmlFor="dislikes">Lượt không thích</Label>
          <Input
            id="dislikes"
            type="number"
            placeholder="Dislikes"
            value={dislikes}
            onChange={(e) => setDislikes(e.target.value)}
            required
          />

          <Label htmlFor="rating">Xếp hạng</Label>
          <Input
            id="rating"
            type="number"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />

          <Label htmlFor="acceptanceRate">Tỉ lệ chấp nhận</Label>
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
              {loading ? <Spin /> : "Tạo bài tập"}
            </Button>
          </ButtonContainer>
        </Form>
      </Container>
    </DefaultLayout>
  );
};

export default CreateProblem;
