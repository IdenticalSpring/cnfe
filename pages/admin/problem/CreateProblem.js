import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DefaultLayout from "/pages/admin/layout/DefaultLayout";
import { adminAPI } from "service/admin";
import { notification, Spin, Select } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useRouter } from "next/router";

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

const EditorContainer = styled.div`
  height: 300px;
  overflow-y: auto;
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
  const [difficulty, setDifficulty] = useState(""); // Giá trị độ khó người dùng chọn
  const [difficultyId, setDifficultyId] = useState(""); // ID của độ khó
  const [courseId, setCourseId] = useState(""); // ID khóa học
  const [courseOptions, setCourseOptions] = useState([]); // Danh sách khóa học
  const [difficultyOptions, setDifficultyOptions] = useState([]); // Các độ khó
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [rating, setRating] = useState("");
  const [acceptanceRate, setAcceptanceRate] = useState("");
  const [loading, setLoading] = useState(false);
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

    fetchCourses();
    fetchDifficulties();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = {
      title,
      description,
      difficultyId: difficultyId,
      courseId: courseId,
      like: Number(likes),
      dislike: Number(dislikes),
      rating: Number(rating),
      acceptanceRate: Number(acceptanceRate),
    };

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
      console.log("🚀 ~ handleSubmit ~ error:", error);
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
          <EditorContainer>
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor) => setDescription(editor.getData())}
              config={{ placeholder: "Nhập mô tả cho bài tập..." }}
            />
          </EditorContainer>

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
            {difficultyOptions.map((difficulty) => (
              <Option key={difficulty.id} value={difficulty?.name}>
                {difficulty?.name}
              </Option>
            ))}
            <Option value="" disabled>
              Chọn độ khó
            </Option>
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

          <Label htmlFor="likes">Lượt thích</Label>
          <Input
            id="likes"
            type="number"
            placeholder="Lượt thích (Likes)"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
            required
          />

          <Label htmlFor="dislikes">Lượt không thích</Label>
          <Input
            id="dislikes"
            type="number"
            placeholder="Lượt không thích (Dislikes)"
            value={dislikes}
            onChange={(e) => setDislikes(e.target.value)}
            required
          />

          <Label htmlFor="rating">Xếp hạng</Label>
          <Input
            id="rating"
            type="number"
            placeholder="Xếp hạng (Rating)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />

          <Label htmlFor="acceptanceRate">Tỉ lệ chấp nhận</Label>
          <Input
            id="acceptanceRate"
            type="number"
            placeholder="Tỉ lệ chấp nhận (Acceptance Rate)"
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