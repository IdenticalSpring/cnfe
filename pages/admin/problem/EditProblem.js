import React, { useEffect, useState } from "react";
import { adminAPI } from "service/admin";
import { Form, Input, Select, Button, notification, Spin } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DefaultLayout from "/pages/admin/layout/DefaultLayout";
import styled from "styled-components";

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

const CKEditorContainer = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 10px;
  min-height: 200px;
  background-color: #f9f9f9;

  .ck-editor__editable {
    min-height: 200px;
  }

  .ck-toolbar {
    background-color: #e6f7ff;
  }
`;

const EditProblem = ({ problemId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState(null);
  const [difficulties, setDifficulties] = useState([]);

  useEffect(() => {
    const fetchProblemDetails = async () => {
      setLoading(true);
      try {
        const response = await adminAPI.detailProblem(problemId);
        const result = await adminAPI.getAllDifficulties();

        if (response?.statusCode === 200 || response?.statusCode === 201) {
          setProblem(response?.data);
          form.setFieldsValue({
            title: response?.data?.title,
            description: response?.data?.description,
            difficultyId: response?.data?.difficultyId,
            courseId: response?.data?.courseId || "",
            accepted: response?.data?.accepted || 0,
            status: response?.data?.status || "",
            submissions: response?.data?.submissions || "",
            likes: response?.data?.likes || 0,
            dislikes: response?.data?.dislikes || 0,
            rating: response?.data?.rating || 0,
            acceptance_rate: response?.data?.acceptance_rate || 0,
          });
        }
        if (result.statusCode === 200) {
          setDifficulties(result?.data);
        }
      } catch (error) {
        notification.error({
          message: "Lỗi",
          description: "Không thể tải chi tiết bài toán.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (problemId) fetchProblemDetails();
  }, [problemId, form]);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        formData.append(key, values[key]);
      }
    }
    try {
      await adminAPI.updateProblem(problemId, values);
      notification.success({
        message: "Thành công",
        description: "Đã cập nhật bài toán thành công!",
      });
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Cập nhật bài toán không thành công.",
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
              <CKEditorContainer>
                <CKEditor
                  editor={ClassicEditor}
                  data={problem?.description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    form.setFieldsValue({ description: data });
                  }}
                  onBlur={(event, editor) => {
                    const data = editor.getData();
                    form.setFieldsValue({ description: data });
                  }}
                />
              </CKEditorContainer>
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

            <Form.Item label="Accepted" name="accepted">
              <Input type="number" />
            </Form.Item>

            <Form.Item label="Submissions" name="submissions">
              <Input type="number" />
            </Form.Item>

            <Form.Item label="Trạng thái" name="status">
              <Input />
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