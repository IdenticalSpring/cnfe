import { useEffect, useState } from "react";
import styled from "styled-components";
import DefaultLayout from "../layout/DefaultLayout";
import { Input, Button, notification, Spin, Form, Select } from "antd";
import { adminAPI } from "service/admin";
import { useRouter } from "next/router";
import Editor from "components/textEditor/Editor";

const Container = styled.div`
  margin: 0 auto;
  padding: 80px 20px 20px;
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

const EditChapter = ({ chapterId }) => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const [form] = Form.useForm();
  const router = useRouter();

  const fetchCourses = async () => {
    try {
      const response = await adminAPI.getAllCourse();
      if (response?.statusCode === 200 && response?.data) {
        setCourses(response.data);
      } else {
        notification.error({
          message: "Error",
          description: "Failed to load courses.",
          placement: "bottomRight",
        });
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      notification.error({
        message: "Error",
        description: "There was an error loading courses.",
        placement: "bottomRight",
      });
    }
  };

  const loadChapterData =
    (async (id) => {
      setLoading(true);
      try {
        const response = await adminAPI.detailChapter(id);
        if (response?.statusCode === 200 || response?.statusCode === 201) {
          form.setFieldsValue({
            courseId: response?.data?.courseId || "",
            title: response?.data?.title || "",
            description: response?.data?.description || "",
            order: Number(response?.data?.order) || "",
          });
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to load chapter data. Please try again later.",
          placement: "bottomRight",
        });
      } finally {
        setLoading(false);
      }
    },
    [form]);

  const handleSave = async (values) => {
    setLoading(true);
    try {
      const response = await adminAPI.updateChapter(chapterId, values);
      if (response?.statusCode === 200 || response?.statusCode === 201) {
        notification.success({
          message: "Success",
          description: "Chapter updated successfully.",
          placement: "bottomRight",
        });
        router.push("/admin/chapters/");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to update chapter. Please try again later.",
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chapterId) {
      loadChapterData(chapterId);
    }
    fetchCourses();
  }, [chapterId, loadChapterData]);

  return (
    <DefaultLayout>
      <Container>
        <Title>Edit Chapter</Title>
        {loading ? (
          <Spin size="large" style={{ display: "block", margin: "0 auto" }} />
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => {
              const formattedValues = {
                ...values,
                order: Number(values.order),
              };
              delete formattedValues.courseId;
              handleSave(formattedValues);
            }}
          >
            <Form.Item label="Course" name="courseId">
              <Select placeholder="Select a course" disabled>
                {courses.map((course) => (
                  <Select.Option key={course.id} value={course.id}>
                    {course?.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Title" name="title">
              <Input placeholder="Enter Title" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Editor placeholder="Enter Description" />
            </Form.Item>
            <Form.Item label="Order" name="order">
              <Input type="number" placeholder="Enter Order" />
            </Form.Item>
            <ButtonContainer>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </ButtonContainer>
          </Form>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default EditChapter;
