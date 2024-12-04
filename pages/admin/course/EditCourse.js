import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Input, Button, notification, Skeleton, Upload } from "antd";
import { useRouter } from "next/router";
import { PlusOutlined } from "@ant-design/icons";
import DefaultLayout from "/pages/admin/layout/DefaultLayout";
import { adminAPI } from "service/admin";
import Editor from "components/textEditor/Editor";

// Styled components
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

const EditCourse = ({ courseId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) {
        notification.error({
          message: "Error",
          description: "Invalid course ID.",
          placement: "bottomRight",
        });
        setLoadingData(false);
        return;
      }

      try {
        const response = await adminAPI.detailCourse(courseId);
        const { data } = response;
        form.setFieldsValue({
          name: data.title,
        });
        setDescription(data.description);

        if (data.imageUrl) {
          setFileList([
            {
              uid: "-1",
              name: "Course image",
              status: "done",
              url: data.imageUrl,
            },
          ]);
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Unable to load course data.",
          placement: "bottomRight",
        });
      } finally {
        setLoadingData(false);
      }
    };

    fetchCourseData();
  }, [courseId, form]);

  const handleFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", values.name);
    formData.append("description", description);

    if (fileList.length > 0) {
      if (fileList[0].originFileObj) {
        const fileSize = fileList[0].originFileObj.size / 1024 / 1024;
        if (fileSize > 5) {
          notification.error({
            message: "Error",
            description: "Image is too large. Please select an image smaller than 5MB.",
            placement: "bottomRight",
          });
          setLoading(false);
          return;
        }

        const validFileTypes = ["image/jpeg", "image/png", "image/gif"];
        const fileType = fileList[0].originFileObj.type;
        if (!validFileTypes.includes(fileType)) {
          notification.error({
            message: "Error",
            description: "Please select a valid image (JPG, PNG, GIF).",
            placement: "bottomRight",
          });
          setLoading(false);
          return;
        }

        formData.append("image", fileList[0].originFileObj);
      } else if (fileList[0].url) {
        formData.append("imageUrl", fileList[0].url);
      }
    }

    try {
      await adminAPI.updateCourse(courseId, formData);
      notification.success({
        message: "Update successful",
        description: "Course information has been updated.",
        placement: "bottomRight",
      });

      router.push("/admin/courses");
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Unable to update course information.",
        placement: "bottomRight",
      });
      console.error("Error updating course:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = ({ fileList: newFileList }) => {
    const validFileList = newFileList?.filter((file) =>
      file?.type?.startsWith("image/")
    );
    setFileList(validFileList);
  };

  return (
    <DefaultLayout>
      <Container>
        <Title>Edit Course</Title>
        {loadingData ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : (
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
              label="Course Name"
              name="name"
              rules={[{ required: true, message: "Please enter the course name" }]}
              hasFeedback
            >
              <Input placeholder="Enter course name..." />
            </Form.Item>

            <Form.Item label="Description" hasFeedback>
              <Editor
                value={description}
                onChange={(newContent) => setDescription(newContent)}
                placeholder="Enter course description..."
              />
            </Form.Item>

            <Form.Item label="Image">
              <Upload
                listType="picture"
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={() => false}
                accept="image/*"
              >
                {fileList.length < 1 && (
                  <Button icon={<PlusOutlined />}>Select Image</Button>
                )}
              </Upload>
            </Form.Item>

            <Form.Item>
              <StyledButton type="primary" htmlType="submit" loading={loading}>
                Save changes
              </StyledButton>
            </Form.Item>
          </Form>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default EditCourse;