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
          message: "Lỗi khi lấy danh sách khóa học",
          description:
            "Không thể tải danh sách khóa học. Vui lòng thử lại sau!",
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
            adminAPI.getAllCompanies(),
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
          message: "Lỗi",
          description: "Không thể tải chi tiết bài toán.",
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
        message: "Thành công",
        description: "Đã cập nhật bài toán thành công!",
        placement: "bottomRight",
      });
      router.push("/admin/problem/");
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Cập nhật bài toán không thành công.",
        placement: "bottomRight",
      });
    }
  };

  return (
    <DefaultLayout>
      <Container>
        <Title>Chỉnh sửa Problem</Title>
        {loading ? (
          <Spin style={{ display: "block", margin: "auto", padding: "50px" }} />
        ) : (
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <Editor
                value={form.getFieldValue("description") || ""}
                onChange={(content) =>
                  form.setFieldsValue({ description: content })
                }
                placeholder="Nhập nội dung mô tả..."
              />
            </Form.Item>

            <Form.Item label="images" name="images">
              <CloudinaryUpload />
            </Form.Item>

            <Form.Item
              label="Độ khó"
              name="difficultyId"
              rules={[{ required: true, message: "Vui lòng chọn độ khó" }]}
            >
              <Select>
                {difficulties.map((difficulty) => (
                  <Option key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Khóa học"
              name="courseId"
              rules={[{ required: true, message: "Vui lòng chọn khóa học" }]}
            >
              <Select>
                {courses.map((course) => (
                  <Option key={course.id} value={course.id}>
                    {course.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Chủ đề"
              name="topicId"
              rules={[{ required: true, message: "Vui lòng chọn chủ đề" }]}
            >
              <Select mode="multiple">
                {topics?.map((topic) => (
                  <Option key={topic?.id} value={topic?.id}>
                    {topic?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Công ty"
              name="companyId"
              rules={[{ required: true, message: "Vui lòng chọn công ty" }]}
            >
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
              <Input type="number" />
            </Form.Item>

            <Form.Item label="Dislikes" name="dislikes">
              <Input type="number" />
            </Form.Item>

            <Form.Item label="Đánh giá" name="rating">
              <Input type="number" step="0.1" />
            </Form.Item>

            <Form.Item label="Tỉ lệ chấp nhận" name="acceptance_rate">
              <Input type="number" step="0.1" />
            </Form.Item>

            <Form.Item>
              <StyledButton type="primary" htmlType="submit">
                Lưu thay đổi
              </StyledButton>
            </Form.Item>
          </Form>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default EditProblem;
